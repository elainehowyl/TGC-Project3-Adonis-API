'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddressUserSchema extends Schema {
  up () {
    this.create('address_user', (table) => {
      table.increments()

      table.integer('address_id').unsigned().notNullable()
      table.foreign('address_id').references('addresses.id')

      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('address_user')
  }
}

module.exports = AddressUserSchema
