'use strict'

const Category = use('App/Models/Category')
const Post = use('App/Models/Post')
const PostCreator = use('PostCreator')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with posts
 */
class PostController {
  /**
   * Show a list of all posts.
   * GET posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    response.header('Turbolinks-Location', '/posts')

    const posts = await Post.all().then(data => data.toJSON())

    return view.render('posts.posts', { posts })
  }

  /**
   * Render a form to be used for creating a new post.
   * GET posts/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    response.header('Turbolinks-Location', '/posts/add')

    const categories = await Category.all().then(data => data.toJSON())
    const markdown = '---\ntitle: \nseo_title: \npublished: false\nseo_description: \npost_slug: \nsummary: \n---\n\nThe Title is above...\n\nFront matter above, and write your post here...'.trim()

    return view.render('posts.editor', {
      categories,
      markdown
    })
  }


  async preview({ request, response }) {
    const { markdown } = request.post()

    const { body } = PostCreator.create(markdown)

    return response.status(200).json({
      data: body
    })
  }
  /**
   * Create/save a new post.
   * POST posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const {markdown, category_id} = request.post()

    let {
      body,
      attributes: {
        title,
        seo_title,
        seo_description,
        seo_keywords,
        post_slug,
        summary,
        published
      }
    } = PostCreator.create(markdown)

    post_slug = post_slug || title

    const post = await Post.create({
      body,
      markdown,
      title,
      seo_title,
      seo_description,
      seo_keywords,
      post_slug,
      summary,
      published,
      category_id
    }).then(data => data.toJSON())

    return response.redirect('posts/' + post.slug)
  }

  /**
   * Display a single post.
   * GET posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params: {slug}, request, response, view }) {
    const post = await Post.findBy('slug', slug)

    response.header('Turbolinks-Location', '/posts/' + slug)

    return view.render('posts.post', {
      post
    })
  }

  /**
   * Render a form to update an existing post.
   * GET posts/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update post details.
   * PUT or PATCH posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a post with id.
   * DELETE posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params: {id}, request, response }) {
    const post = await Post.find(id)

    const deleted = post.delete()

    return response.status(200).json({ deleted })
  }

}

module.exports = PostController


