'use strict'

import { IClinicsAPICityResult } from './i-clinic-api-city-result'
import { IClinicsAPIPostcodeResult } from './i-clinics-api-postcode-result'
import { IHealthAPI } from '../health-api/i-health-api'

export interface IClinicsAPI {
  getByCityName: (healthAPI: IHealthAPI, name: string) => IClinicsAPICityResult
  getByPostcode: (healthAPI: IHealthAPI, postcode: string) => IClinicsAPIPostcodeResult
}
