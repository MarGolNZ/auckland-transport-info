const path = require('path')
const express = require('express')
require('dotenv').config()
const request = require('superagent')

const server = express()
server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.get('/api/v1/works', (req, res) => {
    request
        .get(`https://api.at.govt.nz/v2/locations/scheduledworks?key=${process.env.REACT_APP_API_KEY}`)
        .then(response => res.json(response.body))
        .catch(e => console.log(e))
})

server.get('/api/v1/ferrypositions', (req, res) => {
    request
        .get(`https://api.at.govt.nz/realtime/legacy/ferrypositions?key=${process.env.REACT_APP_API_KEY}`)
        .then(response => res.json(response.body))
        .catch(e => console.log(e))
})

server.get('/api/v1/calendardates', (req, res) => {
    request
        .get(`https://api.at.govt.nz/v2/gtfs/calendarDate?key=${process.env.REACT_APP_API_KEY}`)
        .then(response => res.json(response.body))
        .catch(e => console.log(e))
})

module.exports = server
