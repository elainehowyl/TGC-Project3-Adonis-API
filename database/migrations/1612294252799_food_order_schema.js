'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FoodOrderSchema extends Schema {
  up () {
    this.create('food_order', (table) => {
      table.increments()

      table.integer('food_id').unsigned().notNullable()
      table.foreign('food_id').references('foods.id')

      table.integer('order_id').unsigned().notNullable()
      table.foreign('order_id').references('orders.id')

      table.integer('quantity').unsigned().notNullable()

      table.timestamps()
    })
  }

  down () {
    this.drop('food_order')
  }
}

module.exports = FoodOrderSchema
