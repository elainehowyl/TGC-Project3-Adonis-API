'use strict'

const Users = use('App/Models/User')
const Addresses = use('App/Models/Address')

class UserController {
  // for cRud api
  async index({response, params}){
    // let users = await Users.all()
    // let addresses = await users.addresses().fetch()
    let users = await Users.query().with('addresses').fetch()
    response.json(users)
  }
  // for cRud admin view
  async adminIndex({view}){
    let users = await Users.query().with('addresses').fetch()
    // let users = await Users.all()
    // let addresses = await users.addresses().fetch().all()
    return view.render('users/usersList', {
      'users':users.toJSON(),
    })
  }
  // for Crud in admin view
  async create({view}){
    return view.render('users/createuser')
  }
  // for processing Crud in admin view
  async processCreate({response, request}){
    let body = request.post()
    let newUser = new Users()
    newUser.email = body.email
    newUser.password = body.password
    newUser.first_name = body.first_name
    newUser.last_name = body.last_name
    newUser.contact_number = body.contact_number
    await newUser.save()
    let newAddress = new Addresses()
    newAddress.street_name = body.street_name
    newAddress.block_number = body.block_number
    newAddress.unit_number = body.unit_number
    newAddress.building_name = body.building_name
    newAddress.postal_code = body.postal_code
    await newAddress.save()
    await newUser.addresses().attach(newAddress.id)
    response.redirect('/users')
  }
  async update({request, params, view}){
    let userId = request.params.id
    let user = await Users.find(userId)
    return view.render('users/updateuser', {
      'user':user.toJSON()
    })
  }
  async processUpdate({request, params, response}){
    let userId = request.params.id
    let user = await Users.find(userId)
    let body = request.post()
    user.email = body.email
    user.first_name = body.first_name
    user.last_name = body.last_name
    user.contact_number = body.contact_number
    user.password = body.password
    await user.save()
    response.redirect('/users')
  }
  async delete({request, params, response}){
      let userId = request.params.id
      let user = await Users.find(userId)
      // 1. remove the relationships from pivot table
      await user.addresses().detach()
      // 2. delete the user
      await user.delete()
      response.route('UsersList')
  }
}

module.exports = UserController
