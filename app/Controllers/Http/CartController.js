'use strict'

const Cart = use('App/Models/Cart')

class CartController {
  async createCart({response, request}){
    try{
      let body = request.post()
      let newCart = new Cart()
      newCart.user_id = body.user_id
      newCart.address_id = body.address_id
      newCart.duplicate_address = body.duplicate_address
      newCart.duplicate_orders = body.duplicate_orders
      await newCart.save()
      return response.send(newCart.id)
    } catch (error){
      console.log(error)
    }
  }
}

module.exports = CartController
