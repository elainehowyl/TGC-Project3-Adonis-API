'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FinalAddAddressSchema extends Schema {
  up () {
    this.table('orders', (table) => {
      // alter table
      table.integer('address_id').unsigned()
      table.foreign('address_id').references('addresses.id')
    })
  }

  down () {
    this.table('orders', (table) => {
      // reverse alternations
      table.dropForeign('address_id')
      table.dropColumn('address_id')
    })
  }
}

module.exports = FinalAddAddressSchema
