'use strict'

import * as bodyParser from 'body-parser'
import * as express from 'express'

import { router as clinicsAPIRouter } from '../clinics-api/clinics-api-router'

export const app: express.Application = express()
export const port: any = process.env.PORT || 3000

app.set('port', port)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api', clinicsAPIRouter)
app.use('/', renderIndex)

function renderIndex(req: express.Request, res: express.Response) {
  let html = `
    <h1>Civil Service Clinics Test</h1>
    <h2>The following endpoints are defined:</h2>
    <h3>http://localhost:${port}/api/clinics/v1/city/:name</h3>
    <h3>http://localhost:${port}/api/clinics/v1/postcode/:postcode</h3>
  `

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(html);
  res.end();
}
