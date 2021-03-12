'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Address extends Model {
  users(){
    return this.belongsToMany('App/Models/User').pivotTable('address_user')
  }
  // orders(){
  //   return this.hasMany('App/Models/Order')
  // }
  carts(){
    return this.hasMany('App/Models/Cart')
  }
}

module.exports = Address
