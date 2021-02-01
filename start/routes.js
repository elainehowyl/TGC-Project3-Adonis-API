'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')


Route.get('/users-api', 'UserController.index')
Route.get('/users', 'UserController.adminIndex').as('UsersList')
Route.get('/users/create', 'UserController.create').as('createNewUser')
Route.post('/users/create', 'UserController.processCreate')
Route.get('/users/update/:id', 'UserController.update')
Route.post('/users/update/:id', 'UserController.processUpdate').as('update')
Route.get('/users/delete/:id', 'UserController.delete').as('delete')

Route.get('/category-api', 'CategoryController.index')
Route.get('/category', 'CategoryController.adminIndex').as('categoryList')
Route.get('/category/create', 'CategoryController.create').as('createNewCategory')
Route.post('/category/create', 'CategoryController.processCreate')

Route.get('/food-api', 'FoodController.index')
Route.get('/food', 'FoodController.adminIndex').as('foodList')
Route.get('/food/create', 'FoodController.create').as('createNewFood')
Route.post('/food/create', 'FoodController.processCreate')

Route.get('/cloudinary/sign', 'CloudinaryController.sign').as('cloudinary_sign')
