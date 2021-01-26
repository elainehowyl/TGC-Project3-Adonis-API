'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddressSchema extends Schema {
  up () {
    this.create('addresses', (table) => {
      table.increments()
      table.string('street_name', 100).notNullable()
      table.string('unit_number', 20).notNullable()
      table.string('postal_code', 10).notNullable()
      table.string('building_number', 50)
      table.string('block_number', 50)
      table.timestamps()
    })
  }

  down () {
    this.drop('addresses')
  }
}

module.exports = AddressSchema
