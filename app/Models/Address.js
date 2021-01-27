'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Address extends Model {
  users(){
    // return this.belongsToMany('App/Models/User').pivotTable('address_user')
    return this.belongsToMany('App/Models/User')
  }
}

module.exports = Address
