'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CartSchema extends Schema {
  up () {
    this.create('carts', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id')
      table.integer('address_id').unsigned().nullable()
      table.foreign('address_id').references('addresses.id')
      table.string('duplicate_orders', 1000).nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('carts')
  }
}

module.exports = CartSchema
