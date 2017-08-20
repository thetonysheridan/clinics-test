'use strict'

export interface IHealthAPI {
  getClinicsByCity: (name: string) => object
  getClinicsByPartialPostcode: (postcode: string) => object
}
