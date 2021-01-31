'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DropCategoriesDescriptionSchema extends Schema {
  up () {
    this.table('categories', (table) => {
      // alter table
      table.dropColumn('description')
    })
  }

  down () {
    this.table('categories', (table) => {
      // reverse alternations
    })
  }
}

module.exports = DropCategoriesDescriptionSchema
