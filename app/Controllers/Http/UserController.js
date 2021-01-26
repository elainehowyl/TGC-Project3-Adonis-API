'use strict'

const Users = use('App/Models/User')

class CustomerController {
  async index({response}){
    let users = await Users.all()
    // response.send(customers.toJSON())
    response.json(users)
  }
  async adminIndex({view}){
    let users = await Users.all()
    return view.render('users/usersList', {
      'users':users.toJSON()
    })
  }
}

module.exports = CustomerController
