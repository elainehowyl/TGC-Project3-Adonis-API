'use strict'

const Users = use('App/Models/User')
const Addresses = use('App/Models/Address')

class CustomerController {
  async index({response, params}){
    // let users = await Users.all()
    // let addresses = await users.addresses().fetch()
    let users = await Users.query().with('addresses').fetch()
    response.json(users)
  }
  async adminIndex({view}){
    let users = await Users.query().with('addresses').fetch()
    // let users = await Users.all()
    // let addresses = await users.addresses().fetch().all()
    return view.render('users/usersList', {
      'users':users.toJSON(),
    })
  }
}

module.exports = CustomerController
