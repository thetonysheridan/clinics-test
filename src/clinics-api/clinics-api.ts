'use strict'

import { IClinicsAPI } from './i-clinics-api'
import { IClinicsAPICityResult } from './i-clinic-api-city-result'
import { IClinicsAPIPostcodeResult, IClinicsAPIPostcodeItemResult } from './i-clinics-api-postcode-result'
import { IHealthAPI } from '../health-api/i-health-api'

function getByCityName(healthAPI: IHealthAPI, name: string): IClinicsAPICityResult {
  let errors: string
  let success: boolean = false
  let results: any = {}

  if (name) {
    let data: any = healthAPI.getClinicsByCity(name)

    if (data.success) {
      if (data.result.length > 0) {
        data.result.forEach((item: any) => {
          let partial: string = item.partial_postcode

          if (results[partial]) {
            results[partial]++
          }
          else {
            results[partial] = 1
          }
        })

        success = true
      }
      else {
        errors = 'No matching items found.'
      }
    }
    else {
      errors = 'Failed to retrieve data from health api.'
    }
  }
  else {
    errors = 'No city name provided.'
  }

  return { success, errors, results }
}

function getByPostcode(healthAPI: IHealthAPI, postcode: string): IClinicsAPIPostcodeResult {
  let errors: string
  let success: boolean = false
  let results: Array<IClinicsAPIPostcodeItemResult> = []

  if (postcode) {
    postcode = postcode.toUpperCase()

    let partial = postcode.substr(0, postcode.indexOf(' '))
    let data: any = healthAPI.getClinicsByPartialPostcode(partial)

    if (data.success) {
      data.result = data.result.filter((item: any) => {
        return item.postcode === postcode
      })

      if (data.result.length > 0) {
        data.result.forEach((item: any) => {
          results.push({ organisation_id: <string>item.organisation_id, name: <string>item.name })
        })

        success = true
      }
      else {
        errors = 'No matching items found.'
      }
    }
    else {
      errors = 'Failed to retrieve data from health api.'
    }
  }
  else {
    errors = 'No postcode provided.'
  }

  return { success, errors, results }
}

export const clinicsAPI: IClinicsAPI = {
  getByCityName,
  getByPostcode
}
