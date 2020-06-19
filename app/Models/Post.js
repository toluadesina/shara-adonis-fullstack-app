'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {
    static boot() {
        super.boot()
        this.addTrait('@provider:Lucid/Slugify', {
          fields: { slug: 'post_slug' },
          strategy: 'dbIncrement',
          disableUpdates: true
        })
      }
}

module.exports = Post
