'use strict'

const { validateAll } = use('Validator')
const Users = use('App/Models/User')
const Addresses = use('App/Models/Address')
const Orders = use('App/Models/Order')
const Admin = use('App/Models/Admin')

class UserController {
  // for cRud api
  async index({response}){
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
      'users':users.toJSON()
    })
  }
  // for Crud in admin view
  // async create({view}){
  //   return view.render('users/createuser')
  // }
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
    if(body.block_number === null){
      newAddress.block_number = ""
    }
    else{
      newAddress.block_number = body.block_number
    }
    newAddress.unit_number = body.unit_number
    if(body.building_name === null){
      newAddress.building_name = ""
    }
    else{
      newAddress.building_name = body.building_name
    }
    newAddress.postal_code = body.postal_code
    await newAddress.save()
    await newUser.addresses().attach(newAddress.id)
    response.send({
      'status':'ok'
    })
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
    // response.redirect('/users')
    response.route('UsersList')
  }
  async delete({request, params, response}){
      let userId = request.params.id
      let user = await Users.find(userId)
      let user_address = await user.addresses().fetch()
      let user_addressJ = user_address.toJSON()
      let addressesId = []
      for(let u_a of user_addressJ){
        addressesId.push(u_a.id)
      }
      // 1. delete all the orders where user_id = userId so that the user_id wouldn't be associated with
      // any orders as a foreign key
      await Orders.query().where('user_id', userId).delete()
      // 2. remove the relationships from pivot table in user_address
      await user.addresses().detach()
      // 3. delete the user
      await user.delete()
      // 4. delete the address
      for(let ad of addressesId){
        let selectedAddress = await Addresses.find(ad)
        await selectedAddress.delete()
      }
      response.route('UsersList')
  }

  async login({ request, auth, response }){
    let data = request.post()
    let uid = data.email
    let password = data.password
    let token = await auth.authenticator('api').attempt(uid, password)
    return response.json(token)
  }
}

module.exports = UserController

