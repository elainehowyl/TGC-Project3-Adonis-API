'use strict'

const Addresses = use('App/Models/Address')
const Users = use('App/Models/User')
const Database = use('Database')

class AddressController {
  async processCreate({request, response}){
    let body = request.post()
    let userId = body.user_id
    let user = await Users.find(userId)
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
    response.send('address added successfully')
  }

  async processUpdate({params,response,request}){
    let addressId = params.id
    let address = await Addresses.find(addressId)
    let body = request.post()
    address.street_name = body.street_name
    if(body.block_number === null){
      address.block_number = ""
    }
    else{
      address.block_number = body.block_number
    }
    address.unit_number = body.unit_number
    if(body.building_name === null){
      address.building_name = ""
    }
    else{
      address.building_name = body.building_name
    }
    address.postal_code = body.postal_code
    await address.save()
    // await user.addresses().attach(newAddress.id)
    response.redirect('/users')
  }

  async delete({response, request}){
    try{
      let data = request.get()
      let addressId = data.address_id
      let address = await Addresses.find(addressId)
      // 1. remove relationship from pivot table
      await address.users().detach()
      // 2. delete the address
      await address.delete()
      response.send("address is deleted")
    } catch (error){
      console.log(error)
      response.send(error)
    }
  }
}

module.exports = AddressController
