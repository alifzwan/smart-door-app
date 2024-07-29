const express = require('express')
const cors = require('cors') // Cross-Origin Resource Sharing - allows AJAX requests to skip the Same-origin policy and access resources from remote hosts
const logger = require('./utils/logger')
const config = require('./utils/config')


const { SerialPort } = require('serialport'); 
const { ReadlineParser } = require('@serialport/parser-readline') //want to parse data received from arduino

const app = express()
app.use(express.json())
app.use(cors())

let roomStatus = { status: 'unknown', timestamp: null} // room status is unknown until we receive data from arduino

// Establish connection with arduino
const arduinoPort = new SerialPort({ 
    path: '/dev/ttyUSB0',  // path to the port
    baudRate: 9600         // baud rate - speed which data is transmitted over serial port
})

// Connect the arduinoPort to the ReadlineParser
const parser = arduinoPort.pipe(new ReadlineParser({ 
    delimiter: '\n'  // delimiter to split the data
}));

// Listen for data from the arduino to know roomStatus
parser.on('data', data => {
    logger.info('Received data from Arduino:', data)
    if(data.includes('locked')) { // if the data is locked
        roomStatus = { status: 'locked', timestamp: new Date() } // update the room status
    } else if(data.includes('unlocked')) { // if the data contains unlocked
        roomStatus = { status: 'unlocked', timestamp: new Date() }  // update the room status
    }
})


// lock the room
app.post('/lock', (request, respond) => {
    arduinoPort.write('lock\n', (error) => { // write to the arduino
        if (error) {
            logger.error('Error writing to Arduino:', error)
            respond.status(500).send('Error writing to Arduino')
        } else {
            logger.info('Sent lock command to Arduino')
            roomStatus = { status: 'locked', timestamp: new Date() } // update the room status
            respond.status(200).send(roomStatus) // send the room status back to the client
        }
    })
})

// unlock the room
app.post('/unlock', (request, respond) => {
    arduinoPort.write('unlock\n', (error) => {
        if (error) {
            logger.error('Error writing to Arduino:', error)
            respond.status(500).send('Error writing to Arduino')
        } else {
            logger.info('Sent unlock command to Arduino')
            roomStatus = { status: 'unlocked', timestamp: new Date() } // update the room status
            respond.status(200).send(roomStatus) // send the room status back to the client
        }
    })
})

// get the status of the room
app.get('/status', (request, respond) => {
    respond.status(200).json(roomStatus)
})

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})