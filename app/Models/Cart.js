'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Cart extends Model {
  users(){
    return this.belongsTo('App/Models/User')
  }
  addresses(){
    return this.belongsTo('App/Models/Address')
  }
  orders(){
    return this.hasMany('App/Models/Order')
  }
}

module.exports = Cart
