'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FinalAmendmentToOrdersSchema extends Schema {
  up () {
    this.table('orders', (table) => {
      // alter table
      table.dropForeign('address_id')
      table.dropColumn('address_id')
      table.dropForeign('user_id')
      table.dropColumn('user_id')
      table.dropColumn('total_price')
    })
  }

  down () {
    this.table('orders', (table) => {
      // reverse alternations
    })
  }
}

module.exports = FinalAmendmentToOrdersSchema
