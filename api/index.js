const config = require('./config')
const database = require('./database')
const express = require('./express')
const middlewares = require('./middlewares')
const apps = require('./apps')
const socket = require('./socket')
const Api = require('./api')

const api = new Api(config, express, database, middlewares, socket)

api.install(apps)
api.start()