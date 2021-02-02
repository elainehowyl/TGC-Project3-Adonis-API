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
  async create({view}){
    view.render('orders/createorder')
  }
  async processCreate({request}){
    let body = request.post()
    let newOrder = new Orders()
  }
}

module.exports = OrderController
