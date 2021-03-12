'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FinalFinalOrdersSchema extends Schema {
  up () {
    this.table('orders', (table) => {
      // alter table
      table.integer('cart_id').unsigned()
      table.foreign('cart_id').references('carts.id')
    })
  }

  down () {
    this.table('orders', (table) => {
      // reverse alternations
    })
  }
}

module.exports = FinalFinalOrdersSchema
