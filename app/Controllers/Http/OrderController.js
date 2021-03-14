'use strict'

const Orders = use('App/Models/Order')

class OrderController {
  async processCreate({request, response}){
    try{
      let body = request.post()
      let newOrder = new Orders()
      newOrder.cart_id = body.cart_id
      await newOrder.save()
      await newOrder.foods().attach(body.food_id, (row) => {
        row.quantity = body.quantity
      })
      return response.send("order sent successfully")
    } catch (error){
      console.log(error)
    }
  }
}

module.exports = OrderController
