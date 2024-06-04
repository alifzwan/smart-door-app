const express = require('express')
const logger = require('./utils/logger')
const config = require('./utils/config')
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')

const app = express()

const arduinoPort = new SerialPort('/dev/ttyACM0', { baudRate: 9600 })
const parser = arduinoPort.pipe(new Readline({ delimiter: '\n' }))

arduinoPort.on('open', () => {
    logger.info('Serial port is open')
})

parser.on('data', data => {
    logger.info('Received data from Arduino:', data)
})

app.use(express.json())

app.post('/lock', (request, respond) => {
    arduinoPort.write('lock\n', (error) => {
        if (error) {
            logger.error('Error writing to Arduino:', error)
            respond.status(500).send('Error writing to Arduino')
        } else {
            logger.info('Sent lock command to Arduino')
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
            respond.status(200).send('Unlock command sent to Arduino')
        }
    })
})

app.get('/status', (request, respond) => {
    arduinoPort.write('status\n', (error) => {
        if (error) {
            logger.error('Error writing to Arduino:', error)
            respond.status(500).send('Error writing to Arduino')
        } else {
            logger.info('Sent status command to Arduino')
            respond.status(200).send('Status command sent to Arduino')
        }
    })
    parser.once('data', data => {
        respond.status(200).send(data)
    })
})

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})