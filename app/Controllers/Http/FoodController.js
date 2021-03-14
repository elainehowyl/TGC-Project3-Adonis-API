'use strict'

const { validateAll } = use('Validator')
const Foods = use('App/Models/Food')
const Category = use('App/Models/Category')
const Config = use('Config')

class FoodController {
  async index({response}){
    let foods = await Foods.query().with('categories').fetch()
    response.json(foods)
  }
  async adminIndex({view, request}){
    let body = request.get()
    let query = Foods.query()
    if(body.showcategories){
      query.where('category_id', body.showcategories)
    }
    let foods = await query.with('categories').fetch()
    let categories = await Category.all()
    return view.render('food/foodlist',{
      'foods':foods.toJSON(),
      'categories':categories.toJSON()
    })
  }
  async create({view}){
    let category = await Category.all()
    return view.render('food/createfood', {
      'category':category.toJSON(),
      'cloudinaryName':Config.get('cloudinary.name'),
      'cloudinaryApiKey':Config.get('cloudinary.api_key'),
      'cloudinaryPreset':Config.get('cloudinary.preset'),
      'sign_url':'/cloudinary/sign',
    })
  }

  async processCreate({request,response,session}){
    const rules = {
      name:'required',
      description:'required',
      price:'required',
    }

    const messages = {
     'name.required':'Please enter a food title',
     'description.required':'Please enter a description of the food',
     'price.required':'Please provide a price',
    }
    let body = request.post()
    const validation = await validateAll(body, rules, messages)
    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll()
      return response.redirect('back')
    }
    let newFood = new Foods()
    newFood.name = body.name
    newFood.description = body.description
    newFood.price = body.price
    newFood.image_source = body.image_source
    newFood.category_id = body.category
    session.flash({ notification: `${newFood.name} has been created` });
    await newFood.save()
    response.route('foodList')
  }

  async update({params, view}){
    let foodId = params.id
    let food = await Foods.find(foodId)
    let category = await Category.all()
    return view.render('food/updatefood', {
      'food':food.toJSON(),
      'category':category.toJSON(),
      'cloudinaryName':Config.get('cloudinary.name'),
      'cloudinaryApiKey':Config.get('cloudinary.api_key'),
      'cloudinaryPreset':Config.get('cloudinary.preset'),
      'sign_url':'/cloudinary/sign',
    })
  }

  async processUpdate({params, response, request}){
    let foodId = params.id
    let food = await Foods.find(foodId)
    let body = request.post()
    food.name = body.name
    food.description = body.description
    food.price = body.price
    food.image_source = body.image_source
    food.category_id = body.category
    await food.save()
    response.route('foodList')
  }

  // There is no reason for admin to delete food unless I enter the wrong food / send food into wrong category
  // Deleting of food will only occurs before customer can make an order
  // Therefore, there should be no reason to worry about the associating food with order part.

  async delete({params, response, session}){
    let foodId = params.id
    let food = await Foods.find(params.id)
    await food.orders().detach()
    session.flash({ warning: `${food.name} has been deleted successfully` });
    await food.delete()
    response.route('foodList')
  }
}

module.exports = FoodController
