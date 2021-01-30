'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FoodSchema extends Schema {
  up () {
    this.create('foods', (table) => {
      table.increments()
      table.string('name', 50).notNullable()
      table.string('description', 800).notNullable()
      table.integer('price').unsigned()
      table.string('image_source', 200).notNullable()
      table.integer('category_id').unsigned().notNullable()
      table.foreign('category_id').references('categories.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('foods')
  }
}

module.exports = FoodSchema
