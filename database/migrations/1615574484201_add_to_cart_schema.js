'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddToCartSchema extends Schema {
  up () {
    this.table('carts', (table) => {
      // alter table
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id')
      table.integer('address_id').unsigned().nullable()
      table.foreign('address_id').references('addresses.id')
      table.string('duplicate_orders', 1000).nullable()
    })
  }

  down () {
    this.table('carts', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AddToCartSchema
