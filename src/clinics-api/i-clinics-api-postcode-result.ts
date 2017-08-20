'use strict'

import { IClinicsAPIResult } from './i-clinics-api-result'

export interface IClinicsAPIPostcodeItemResult {
  organisation_id: string
  name: string
}

export interface IClinicsAPIPostcodeResult extends IClinicsAPIResult {
  results: Array<IClinicsAPIPostcodeItemResult>
}
