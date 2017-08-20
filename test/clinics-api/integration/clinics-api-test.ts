'use strict'

import * as chai from 'chai'
import chaiHttp = require('chai-http')
import * as mocha from 'mocha'

import { app } from '../../../src/web-server/express'

const expect = chai.expect

chai.use(chaiHttp)

describe('clinics-api', () => {
  describe('/api/clinics/v1/city:name', () => {
    it('returns failure if city not found', () => {
      chai.request(app).get('/api/clinics/v1/city/Nowhere')
        .then(res => {
          expect(res.body.success).to.eq(false)
          expect(res.body.errors).to.eq('No matching items found.')
        })
        .catch(console.log)
    })

    it('returns correct data for Croydon', () => {
      chai.request(app).get('/api/clinics/v1/city/Croydon')
        .then(res => {
          expect(res.body.success).to.eq(true)
          expect(res.body.results['CR0']).to.eq(8)
          expect(res.body.results['CR9']).to.eq(2)
        })
        .catch(console.log)
    })
  })

  describe('/api/clinics/v1/postcode:postcode', () => {
    it('returns failure if postcode not found', () => {
      chai.request(app).get('/api/clinics/v1/postcode/PC1%201PC')
        .then(res => {
          expect(res.body.success).to.eq(false)
          expect(res.body.errors).to.eq('No matching items found.')
        })
        .catch(console.log)
    })

    it('returns two items when postcode is CR9 1PJ', () => {
      chai.request(app).get('/api/clinics/v1/postcode/CR9%201PJ')
        .then(res => {
          expect(res.body.success).to.eq(true)
          expect(res.body.results.length).to.eq(2)
        })
        .catch(console.log)
    })
  })
})
