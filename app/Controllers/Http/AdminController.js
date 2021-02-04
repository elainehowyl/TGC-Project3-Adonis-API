'use strict'

const { validateAll } = use('Validator')
const Admin = use('App/Models/Admin')
const Hash = use('Hash')

class AdminController {
  register({view}){
    return view.render('adminregister')
  }
  async processRegister({request,response,session}){
    const rules = {
      username:'required|unique:admins',
      password:'required|confirmed|min:8',
    }
    const messages = {
     'username.required':'Please provide a username',
     'username.unique':'Username already exist',
     'password.required':'Please provide a password',
     'password.min':'Password should be at least 8 characters long',
     'password.confirmed':'Passwords do not match'
    }
    let body = request.post()
    const validation = await validateAll(body, rules, messages)
    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll()
      return response.redirect('back')
    }
    let newAdmin = new Admin()
    newAdmin.username = body.username
    newAdmin.password = body.password
    await newAdmin.save()
    response.route('loginpage')
  }
  login({view}){
    return view.render('loginpage')
  }
  async processLogin({auth, request, response,session}){
    let body = request.post()
    let loggedInAdmin = await Admin.findBy('username', body.username)
    let loggedInAdminJ = loggedInAdmin.toJSON()
    let verifyPassword = await Hash.verify(body.password,loggedInAdminJ.password)
    await Hash.verify('plain-value', 'hashed-value')
    if(!loggedInAdmin){
      session
        .withErrors({username:'Username is not a registered user'})
        .flashAll()
     return response.redirect('back')
    }
    else{
      if(!verifyPassword){
        session
          .withErrors({password:'Incorrect password'})
          .flashAll()
        return response.redirect('back')
      }
      else{
        await auth.authenticator('admin').attempt(body.username, body.password)
        response.route('UsersList')
      }
    }
    // await auth.authenticator('admin').attempt(body.username, body.password)
    // response.route('UsersList')
  }
  async logout({auth, response}){
    await auth.logout()
    response.route('loginpage')
  }
}

module.exports = AdminController
