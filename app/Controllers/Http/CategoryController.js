'use strict'

const { validateAll } = use('Validator')
const Categories = use('App/Models/Category')
const Foods = use('App/Models/Food')
const Database = use('Database')

class CategoryController {
  async index({response}){
    let categories = await Categories.all()
    response.json(categories)
  }
  async adminIndex({view}){
    let categories = await Categories.all()
    return view.render('categories/categorylist', {
      'categories':categories.toJSON()
    })
  }
  async create({view}){
    return view.render('categories/createcategory')
  }
  async processCreate({request,response,session}){
    const rules = {
      name:'required',
    }

    const messages = {
     'name.required':'Please provide a category title',
    }
    let body = request.post()
    const validation = await validateAll(body, rules, messages)
    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll()
      return response.redirect('back')
    }
    let newCategory = new Categories()
    newCategory.name = body.name
    session.flash({ notification: `${newCategory.name} has been created` });
    await newCategory.save()
    response.route('categoryList')
  }
  async update({request, params, view}){
    let categoryId = params.id
    let category = await Categories.find(categoryId)
    return view.render('categories/updatecategory', {
      'category':category.toJSON()
    })
  }
  async processUpdate({request, params, response}){
    let body = request.post()
    let categoryId = params.id
    let category = await Categories.find(categoryId)
    category.name = body.name
    await category.save()
    response.route('categoryList')
  }
  async delete({params, response}){
    let categoryId = params.id
    await Foods.query().where('category_id', categoryId).delete()
    let category = await Categories.find(categoryId)
    await category.delete()
    response.route('categoryList')
  }
}

module.exports = CategoryController
