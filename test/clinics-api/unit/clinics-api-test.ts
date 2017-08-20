'use strict'

import * as chai from 'chai'
import * as mocha from 'mocha'

import { clinicsAPI } from '../../../src/clinics-api/clinics-api'
import { IClinicsAPICityResult } from '../../../src/clinics-api/i-clinic-api-city-result'
import { IClinicsAPIPostcodeResult } from '../../../src/clinics-api/i-clinics-api-postcode-result'
import { healthAPIStub } from './stubs/health-api-stub'

const expect = chai.expect

describe('clinics-api', () => {
  describe('getByPostcode', () => {
    it('returns failure if no city provided', () => {
      let result: IClinicsAPICityResult = clinicsAPI.getByCityName(healthAPIStub, undefined)
      expect(result.success).to.eq(false)
      expect(result.errors).to.eq('No city name provided.')
    })

    it('returns failure if city not found', () => {
      let result: IClinicsAPICityResult = clinicsAPI.getByCityName(healthAPIStub, 'Nowhere')
      expect(result.success).to.eq(false)
      expect(result.errors).to.eq('No matching items found.')
    })

    it('returns correct data for Croydon', () => {
      let result: IClinicsAPICityResult = clinicsAPI.getByCityName(healthAPIStub, 'Croydon')
      expect(result.success).to.eq(true)
      expect(result.results['CR0']).to.eq(8)
      expect(result.results['CR9']).to.eq(2)
    })
  })

  describe('getByPostcode', () => {
    it('returns failure if no postcode provided', () => {
      let result: IClinicsAPIPostcodeResult = clinicsAPI.getByPostcode(healthAPIStub, undefined)
      expect(result.success).to.eq(false)
      expect(result.errors).to.eq('No postcode provided.')
    })

    it('returns failure if postcode not found', () => {
      let result: IClinicsAPIPostcodeResult = clinicsAPI.getByPostcode(healthAPIStub, 'PC1 1PC')
      expect(result.success).to.eq(false)
      expect(result.errors).to.eq('No matching items found.')
    })

    it('returns two items when postcode is CR9 1PJ', () => {
      let result: IClinicsAPIPostcodeResult = clinicsAPI.getByPostcode(healthAPIStub, 'CR9 1PJ')
      expect(result.success).to.eq(true)
      expect(result.results.length).to.eq(2)
    })
  })
})
