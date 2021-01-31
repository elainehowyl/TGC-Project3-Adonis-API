'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {
  foods(){
    return this.hasMany('App/Models/Food')
  }
}

module.exports = Category
