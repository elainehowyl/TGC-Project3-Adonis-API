'use strict'

const Cart = use('App/Models/Cart')
const Users = use('App/Models/User')

class CartController {
  async viewOrder({response, params, view}){
    let user_id = params.id
    let user = await Users.find(params.id)
    let carts = await Cart.query().where('user_id', '=', user_id).fetch()
    let cartsJ = carts.toJSON()
    for(let c of cartsJ){
      let address = JSON.parse(c.duplicate_address)
      c.addressJSON = address
      let orders = JSON.parse(c.duplicate_orders)
      c.ordersJSON = orders
    }
    return view.render('users/orderhistory',{
      'user':user,
      'carts':cartsJ
    })
  }
  async createCart({response, request}){
    try{
      let body = request.post()
      let newCart = new Cart()
      newCart.user_id = body.user_id
      newCart.address_id = body.address_id
      newCart.total_price = body.total_price
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
