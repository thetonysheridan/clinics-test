'use strict'

import * as http from 'http'

import { app, port } from './express'

const server = http.createServer(app)

server.on('error', onError)
server.on('listening', onListening)
server.listen(port)

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') {
    throw error
  }

  switch (error.code) {
    case 'EACCES':
      console.error(`${port} requires elevated privileges.`)
      process.exit(1)
      break

    case 'EADDRINUSE':
      console.error(`${port} is already in use.`)
      process.exit(1)
      break

    default:
      throw error
  }
}

function onListening(): void {
  console.log(`Listening on ${port}\nPress ctrl-c to terminate...`)
}
