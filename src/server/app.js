'use strict'

const path = require('path')
const fs = require('fs')
const http = require('http')
const config = require('./config/env')
const cors = require('cors')
const logger = require('morgan')
const multer = require('multer')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

//The port to listen to
const port = process.env.PORT || 3000

const app = express()
const server = http.Server(app)

/**
 * Middlewares
 */
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser(config.cookieParser.secret))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

/**
 * Routes
 */
for (let controller of fs.readdirSync(path.resolve('routes'))) {
    let file = path.resolve('routes', controller)
    if (/\-router.js$/.test(file) && fs.statSync(file).isFile()) {
        try {
            app.use(require(file))
        } catch (e) {
            console.error(e)
        }
    }
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found')
    err.status = 404
    next(err)
})

// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 400)
        if (err.message.includes('ValidationError')) {
            err.code = 1001
        } else if (err.message.includes('Database')) {
            err.code = 1002
        } else if (err.message.includes('authoriz')) {
            err.code = 3001
        } else if (err.message.includes('Not Found')) {
            err.code = 404
            err.message = 'This is not page you were looking for'
        } else {
            err.code = 666
            err.message = 'Something went wrong'
        }
        res.json({ message: err.message, code: err.code })
    })
}


app.listen(port, () => {
    console.log('App is running at http://localhost:%d in %s mode', port, app.get('env'))
})

//Catch errors
process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err)
})

process.on('unhandledRejection', function (e) {
    console.log('unhandled Rejection', e.message, e.stack)
})

module.exports = app
