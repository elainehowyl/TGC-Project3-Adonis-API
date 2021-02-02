'use strict'

const Foods = use('App/Models/Food')
const Category = use('App/Models/Category')
const Config = use('Config')

class FoodController {
  async index({response}){
    let foods = await Foods.query().with('categories').fetch()
    // let foods = await Foods.all()
    response.json(foods)
  }
  async adminIndex({view}){
    let foods = await Foods.query().with('categories').fetch()
    // let foods = await Foods.all()
    return view.render('food/foodlist',{
      'foods':foods.toJSON()
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

  async processCreate({request,response}){
    let body = request.post()
    let newFood = new Foods()
    newFood.name = body.name
    newFood.description = body.description
    newFood.price = body.price
    newFood.image_source = body.image_source
    newFood.category_id = body.category
    await newFood.save()
    // response.json(newFood)
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
}

module.exports = FoodController
