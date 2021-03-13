'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddTotalpriceToCartSchema extends Schema {
  up () {
    this.table('carts', (table) => {
      // alter table
      table.integer('total_price').unsigned()
    })
  }

  down () {
    this.table('carts', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AddTotalpriceToCartSchema
