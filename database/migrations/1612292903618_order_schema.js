'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id')
      table.integer('address_id').unsigned().notNullable()
      table.foreign('address_id').references('addresses.id')
      table.integer('total_price').unsigned().notNullable()
      table.datetime('date_time_ordered').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrderSchema
