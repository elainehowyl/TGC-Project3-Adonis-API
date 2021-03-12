'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddAddressCartSchema extends Schema {
  up () {
    this.table('carts', (table) => {
      // alter table
       table.string('duplicate_address', 1000).nullable()
    })
  }

  down () {
    this.table('carts', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AddAddressCartSchema
