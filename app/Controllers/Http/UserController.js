'use strict'

// const { validateAll } = use('Validator')
const Users = use('App/Models/User')
const Addresses = use('App/Models/Address')
const Orders = use('App/Models/Order')

// const rules = {
//   email:'required',
//   password:'required|min:8',
//   first_name:'required',
//   last_name:'required',
//   contact_number:'required|min:8',
//   street_name:'required',
//   unit_number:'required',
//   postal_code:'required',
// }

// const messages = {
//   'email.required':'Please provide an email',
//   'password.required':'Please provide a password',
//   'password.min':'Password should be at least 8 characters long',
//   'first_name.required':'Please enter your first name',
//   'last_name.required':'Please enter your last name',
//   'contact_number.required':'Please provide a contact number',
//   'contact_number.min':'Please provide a valid contact number',
//   'street_name.required':'Please enter your street name',
//   'unit_number.required':'Please enter your unit number',
//   'postal_code.required':'Please enter your postal code'
// }

class UserController {
  // for cRud api
  async index({response}){
    // let users = await Users.all()
    // let addresses = await users.addresses().fetch()
    let users = await Users.query().with('addresses').fetch()
    response.json(users)
  }
  // for cRud admin view
  async adminIndex({view, auth}){
    let user = await Users.find(auth.user.id)
    let users = await Users.query().with('addresses').fetch()
    // let users = await Users.all()
    // let addresses = await users.addresses().fetch().all()
    return view.render('users/usersList', {
      'users':users.toJSON(),
      'user':user.toJSON()
    })
  }
  // for Crud in admin view
  async create({view}){
    return view.render('users/createuser')
  }
  // for processing Crud in admin view
  async processCreate({response, request, session}){
    let body = request.post()
    // const validation = await validateAll(body, rules, messages)
    // if (validation.fails()) {
    //   session
    //     .withErrors(validation.messages())
    //     .flashExcept(['password'])

    //   return response.redirect('back')
    // }
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
    session.flash({ notification: `${newUser.last_name} has been created` });
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
  login({view}){
    return view.render('loginpage')
  }
  async processLogin({auth, request, response, session}){
    let body = request.post()
    // let users = await Users.all()
    // let usersJ = users.toJSON()
    // for(let u of usersJ){
    //   if(!u.email.includes(body.email)){
    //     session.flash({ warning: "Email does not exist!"})
    //   }
    //   else{
    //     if(body.password !== u.password){
    //       session.flash({ warning: "Password does not match!"})
    //     }
    //     else{
    //       await auth.attempt(body.email, body.password)
    //       response.route('UsersList')
    //     }
    //   }
    // }
    await auth.attempt(body.email, body.password)
    response.route('UsersList')
  }
  async logout({auth, response}){
    await auth.logout()
    response.route('loginpage')
  }
}

module.exports = UserController

