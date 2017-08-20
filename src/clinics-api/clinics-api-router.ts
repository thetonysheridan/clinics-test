'use strict'

import * as express from 'express'

import { clinicsAPI } from './clinics-api'
import { healthAPI } from '../health-api/health-api'

export const router: express.Router = express.Router()

router.get('/clinics/v1/city/:name', (req: express.Request, res: express.Response) => {
  res.status(200).send(clinicsAPI.getByCityName(healthAPI, req.params.name))
})

router.get('/clinics/v1/postcode/:postcode', (req: express.Request, res: express.Response) => {
  res.status(200).send(clinicsAPI.getByPostcode(healthAPI, req.params.postcode))
})
