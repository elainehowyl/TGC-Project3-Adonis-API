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

// Route.on('/').render('welcome')

Route.get('/', 'UserController.login')
Route.post('/', 'UserController.processLogin')

Route.get('/users-api', 'UserController.index')
Route.get('/users', 'UserController.adminIndex').as('UsersList')
Route.get('/users/create', 'UserController.create').as('createNewUser')
Route.post('/users/create', 'UserController.processCreate')
Route.get('/users/update/:id', 'UserController.update')
Route.post('/users/update/:id', 'UserController.processUpdate').as('updateUser')
Route.get('/users/delete/:id', 'UserController.delete').as('deleteUser')

Route.get('/users/addAddress/:id', 'AddressController.create')
Route.post('/users/addAddress/:id', 'AddressController.processCreate').as('createNewAddress')
Route.get('/users/deleteAddress/:id', 'AddressController.delete').as('deleteAddress')
Route.get('/users/editAddress/:id', 'AddressController.update')
Route.post('/users/editAddress/:id', 'AddressController.processUpdate').as('updateAddress')

Route.get('/category-api', 'CategoryController.index')
Route.get('/category', 'CategoryController.adminIndex').as('categoryList')
Route.get('/category/create', 'CategoryController.create').as('createNewCategory')
Route.post('/category/create', 'CategoryController.processCreate')
Route.get('/category/update/:id', 'CategoryController.update').as('updateCategory')
Route.post('/category/update/:id', 'CategoryController.processUpdate')
Route.get('/category/delete/:id', 'CategoryController.delete').as('deleteCategory')

Route.get('/food-api', 'FoodController.index')
Route.get('/food', 'FoodController.adminIndex').as('foodList')
Route.get('/food/create', 'FoodController.create').as('createNewFood')
Route.post('/food/create', 'FoodController.processCreate')
Route.get('/food/update/:id', 'FoodController.update').as('updateFood')
Route.post('/food/update/:id', 'FoodController.processUpdate')
Route.get('/food/delete/:id', 'FoodController.delete').as('deleteFood')

Route.get('/orders-api','OrderController.index')
Route.get('/orders','OrderController.adminIndex').as('orderList')
Route.get('/orders/create','OrderController.create').as('createNewOrder')
Route.post('/orders/create','OrderController.processCreate')

Route.get('/address-fetch-user','AddressController.index')

Route.get('/cloudinary/sign', 'CloudinaryController.sign').as('cloudinary_sign')
