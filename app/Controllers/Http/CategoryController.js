'use strict'

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
  async processCreate({request,response}){
    let body = request.post()
    let newCategory = new Categories()
    newCategory.name = body.name
    await newCategory.save()
    // response.redirect('/category')
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
    let foods = await Foods.query().where('category_id', categoryId).delete()
    let category = await Categories.find(categoryId)
    await category.delete()
    response.route('categoryList')
  }
}

module.exports = CategoryController
