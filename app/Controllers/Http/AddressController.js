'use strict'

const Addresses = use('App/Models/Address')
const Users = use('App/Models/User')

class AddressController {
  async create({view}){
    return view.render('addresses/createnewaddress')
  }
  async processCreate({params, request, response}){
    let userId = params.id
    let user = await Users.find(userId)
    let body = request.post()
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
    await user.addresses().attach(newAddress.id)
    response.redirect('/users')
  }
}

module.exports = AddressController
