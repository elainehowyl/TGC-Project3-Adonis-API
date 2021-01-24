'use strict'

const Customers = use('App/Models/Customer')

class CustomerController {
  async index({response}){
    let customers = await Customers.all()
    // response.send(customers.toJSON())
    response.json(customers)
  }
  async adminIndex({view}){
    let customers = await Customers.all()
    return view.render('customers', {
      customers:customers.toJSON()
    })
  }
}

module.exports = CustomerController
