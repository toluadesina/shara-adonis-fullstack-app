'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {
    static boot () {
        super.boot()
    
        this.addTrait('@provider:Lucid/Slugify', {
          fields: {
            slug: 'cat_slug'
          },
          strategy: 'dbIncrement',
          disableUpdates: true
        })
      }
}

module.exports = Category
