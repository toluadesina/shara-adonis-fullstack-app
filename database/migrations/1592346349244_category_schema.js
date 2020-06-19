'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategorySchema extends Schema {
  up () {
    this.create('categories', (table) => {
      table.increments()
      table.timestamps()
      table.string('name').notNullable()
      table.string('description').nullable()
      table.string('cat_slug').notNullable()
      table.string('slug') //slugify_use_only
    })
  }

  down () {
    this.drop('categories')
  }
}

module.exports = CategorySchema
