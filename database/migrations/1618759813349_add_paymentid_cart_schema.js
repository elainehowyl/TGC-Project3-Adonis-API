'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddPaymentidCartSchema extends Schema {
  up () {
    this.table('carts', (table) => {
      // alter table
      table.string('stripe_payment_id').notNullable()
    })
  }

  down () {
    this.table('carts', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AddPaymentidCartSchema
