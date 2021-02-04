'use strict'

const Admin = use('App/Models/Admin')
const Hash = use('Hash')

class AdminController {
  register({view}){
    return view.render('adminregister')
  }
  async processRegister({request,response}){
    let body = request.post()
    let newAdmin = new Admin()
    newAdmin.username = body.username
    newAdmin.password = body.password
    await newAdmin.save()
    response.route('loginpage')
  }
  login({view}){
    return view.render('loginpage')
  }
  async processLogin({auth, request, response}){
    let body = request.post()
    await auth.authenticator('admin').attempt(body.username, body.password)
    response.route('UsersList')
  }
  async logout({auth, response}){
    await auth.logout()
    response.route('loginpage')
  }
}

module.exports = AdminController
