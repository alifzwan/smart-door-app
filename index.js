const express = require('express')
const cors = require('cors')
const logger = require('./utils/logger')
const config = require('./utils/config')


const { SerialPort } = require('serialport'); 
const { ReadlineParser } = require('@serialport/parser-readline') //want to parse data received from arduino

const app = express()

app.use(cors())

let roomStatus = 'unknown' // room status is unknown until we receive data from arduino

// Establish connection with arduino
const arduinoPort = new SerialPort({ 
    path: '/dev/ttyUSB0',  // path to the port
    baudRate: 9600         // baud rate - speed which data is transmitted over serial port
})

// Connect the arduinoPort to the ReadlineParser
const parser = arduinoPort.pipe(new ReadlineParser({ 
    delimiter: '\n' 
}));

// Listen for data from the arduino to know roomStatus
parser.on('data', data => {
    logger.info('Received data from Arduino:', data)
    if(data.includes('locked')) {
        roomStatus = 'locked'
    } else if(data.includes('unlocked')) {
        roomStatus = 'unlocked'   
    }
})

app.use(express.json())

app.post('/lock', (request, respond) => {
    arduinoPort.write('lock\n', (error) => {
        if (error) {
            logger.error('Error writing to Arduino:', error)
            respond.status(500).send('Error writing to Arduino')
        } else {
            logger.info('Sent lock command to Arduino')
            roomStatus = 'locked'
            respond.status(200).send('Lock command sent to Arduino')
        }
    })
})

app.post('/unlock', (request, respond) => {
    arduinoPort.write('unlock\n', (error) => {
        if (error) {
            logger.error('Error writing to Arduino:', error)
            respond.status(500).send('Error writing to Arduino')
        } else {
            logger.info('Sent unlock command to Arduino')
            roomStatus = 'unlocked'
            respond.status(200).send('Unlock command sent to Arduino')
        }
    })
})

app.get('/status', (request, respond) => {
    respond.status(200).json({ status: roomStatus })
})

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})