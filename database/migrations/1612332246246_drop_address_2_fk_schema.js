'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DropAddress2FkSchema extends Schema {
  up () {
    this.table('orders', (table) => {
      // alter table
      table.dropForeign('address_id')
      table.dropColumn('address_id')
    })
  }

  down () {
    this.table('orders', (table) => {
      // reverse alternations
    })
  }
}

module.exports = DropAddress2FkSchema
