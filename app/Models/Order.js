'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {
  users(){
    return this.belongsTo('App/Models/User')
  }
  addresses(){
    return this.belongsTo('App/Models/Address')
  }
  foods(){
    return this.belongsToMany('App/Models/Food').pivotTable('food_order')
  }
}

module.exports = Order
