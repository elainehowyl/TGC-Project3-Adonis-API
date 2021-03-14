'use strict'
const Database = use('Database')

const { validateAll } = use('Validator')
const Users = use('App/Models/User')
const Addresses = use('App/Models/Address')
const Orders = use('App/Models/Order')
const Admin = use('App/Models/Admin')

class UserController {
  async adminIndex({request, view}){
    let body = request.get()
    let query = Users.query()
    if(body.searchid){
        query.where('id', body.searchid)
    }
    if(body.searchemail){
        query.where('email', body,searchemail)
    }
    let users = await query.with('addresses').fetch()
    return view.render('users/usersList', {
      'users':users.toJSON()
    })
  }

  async processCreate({response, request}){
    const rules = {
      email:'required|unique:users',
      password:'required|min:12',
      first_name:'required',
      last_name:'required',
      contact_number:'required',
      street_name:'required',
      unit_number:'required',
      postal_code:'required',
    }
    const messages = {
     'email.required':'Please provide a valid email',
     'email.unique':'Username already exist',
     'password.required':'Please provide a password',
     'password.min':'Password should be at least 12 characters long',
     'first_name.required':'Please provide a first name',
     'last_name.required':'Please provide a last name',
     'contact_number.required':'Please provide a contact number',
     'street_name.required':'Please enter street name',
     'unit_number.required':'Please enter unit number',
     'postal_code.required':'Please enter postal code'
    }
    let body = request.post()
    const validation = await validateAll(body, rules, messages)
    if(validation.fails()){
      return response.json(validation.messages())
    }
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
    // let newUserWithAddress = await newUser.addresses().fetch()
    // return response.json(newUserWithAddress.toJSON())
    return response.send('registration successful')
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
    try{
      let data = request.post()
      let uid = data.email
      let password = data.password
      let token = await auth.authenticator('api').attempt(uid, password)
      response.json(token)
    }
    catch(error){
      response.send(error)
    }
  }

  async profile({ response, auth }){
    try{
      let authUser = await auth.authenticator('api').getUser()
      // console.log(authUser.id)
      let authUserJ = await authUser.toJSON()
      let users = await Users.query().with('addresses').fetch()
      let usersJ = await users.toJSON()
      let user_address = usersJ.find(user => user.id === authUserJ.id)
      response.json(user_address)
    } catch (error) {
      console.log(error)
      response.send(error)
    }
  }

  // async logout({auth, response}){
  //   try{
  //     await auth.logout()
  //     response.send("logout successful")
  //   } catch (error) {
  //     console.log(error)
  //     response.send(error)
  //   }
  // }

  async userLogOut ({ auth, response }) {
    const user = auth.current.user
    const token = auth.getAuthHeader()
    try{
      await user
      .tokens()
      .where('token', token)
      .update({ is_revoked: true })
    } catch (error) {
      console.log(error)
      response.send(error)
    }
  }
  // remember to protect route with middleware
}

module.exports = UserController

