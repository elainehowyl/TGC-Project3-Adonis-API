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

  async showOne({params, response}) {
    // extract out the book_id parameter from the URL
    let userId = params.user_id;

    // select * from books where id = bookId
    let user = await Users.find(userId);
    console.log(user)
    let addresses = await user.addresses().fetch()
    response.json(addresses)
  }
}

module.exports = CustomerController
