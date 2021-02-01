'use strict'

const Foods = use('App/Models/Food')
const Category = use('App/Models/Category')

class FoodController {
  async index({response}){
    let foods = await Foods.all()
    response.json(foods)
  }
  async adminIndex({view}){
    let foods = await Foods.all()
    return view.render('food/foodlist',{
      'foods':foods.toJSON()
    })
  }
  async create({view}){
    let category = await Category.all()
    return view.render('food/createfood', {
      'category':category.toJSON()
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
}

module.exports = FoodController
