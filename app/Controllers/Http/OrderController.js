'use strict'

const Orders = use('App/Models/Order')

class OrderController {
  async index({response}){
    let orders = await Orders.all()
    response.json(orders)
  }
  async adminIndex({view}){
    let orders = await Orders.all()
    view.render('orders/orderslist', {
      'orders':orders.toJSON()
    })
  }
  async processCreate({request, response}){
    let body = request.post()
    let newOrder = new Orders()
    newOrder.user_id = body.user_id
    newOrder.address_id = body.address_id
    newOrder.total_price = body.total_price
    await newOrder.save()
    await newOrder.foods().attach(body.food_id)
    await newOrder.foods().attach(foods, (row) => {
      row.quantity = body.quantity
    })
    return response.send("order sent successfully")
  }
}

module.exports = OrderController
