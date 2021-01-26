'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddToUsersSchema extends Schema {
  up () {
    this.table('users', (table) => {
      // alter table
      table.dropColumn('username')
      table.string('first_name', 100).notNullable()
      table.string('last_name', 100).notNullable()
      table.string('contact_number', 30).notNullable()
    })
  }

  down () {
    this.table('users', (table) => {
      // reverse alternations
      table.dropColumn('first_name')
      table.dropColumn('last_name')
      table.dropColumn('contact_number')
    })
  }
}

module.exports = AddToUsersSchema
