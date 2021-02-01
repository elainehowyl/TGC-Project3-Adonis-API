'use strict'

const Foods = use('App/Models/Food')

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
  async create({}){
    let body = request.post()
    let newFood = new Foods()
  }
}

module.exports = FoodController
