'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Food extends Model {
  categories(){
    return this.belongsTo('App/Models/Category')
  }
  orders(){
    return this.belongsToMany('App/Models/Order').pivotTable('food_order')
  }
}

module.exports = Food
