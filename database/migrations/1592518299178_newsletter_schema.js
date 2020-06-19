'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NewsletterSchema extends Schema {
  up () {
    this.create('newsletters', (table) => {
      table.increments()
      table.timestamps()
      table.string('email').notNullable()
      table.string('_csrf')
    })
  }

  down () {
    this.drop('newsletters')
  }
}

module.exports = NewsletterSchema
