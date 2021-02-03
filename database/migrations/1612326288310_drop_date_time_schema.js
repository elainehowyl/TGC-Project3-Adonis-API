'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DropDateTimeSchema extends Schema {
  up () {
    this.table('orders', (table) => {
      // alter table
      table.dropColumn('date_time_ordered')
    })
  }

  down () {
    this.table('orders', (table) => {
      // reverse alternations
    })
  }
}

module.exports = DropDateTimeSchema
