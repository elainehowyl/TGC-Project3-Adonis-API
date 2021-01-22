'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CustomerSchema extends Schema {
  up () {
    this.create('customers', (table) => {
      table.increments();
      table.string('email', 50).notNullable();
      table.string('password', 50).notNullable();
      table.string('first_name', 50).notNullable();
      table.string('last_name', 50).notNullable();
      table.string('contact_number', 20).notNullable();
      table.timestamps();
    })
  }

  down () {
    this.drop('customers')
  }
}

module.exports = CustomerSchema
