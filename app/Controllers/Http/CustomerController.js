'use strict'

const Customers = use('App/Models/Customer')

class CustomerController {
  async index({view, response}){
    let customers = await Customers.all()
    console.log(customers.toJSON())
    response.send(customers.toJSON())
  }
}

module.exports = CustomerController
