'use strict'

const Categories = use('App/Models/Category')

class CategoryController {
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
    newCategory.description = body.description
    await newCategory.save()
    // response.redirect('/category')
    response.route('categoryList')
  }
}

module.exports = CategoryController
