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

Route.get('/', 'AdminController.login').as('loginpage')
Route.post('/', 'AdminController.processLogin')
Route.get('/admin/register', 'AdminController.register').as('adminregister')
Route.post('/admin/register', 'AdminController.processRegister')
Route.get('/admin/logout', 'AdminController.logout').as('logoutpage')

Route.get('/users', 'UserController.adminIndex').as('UsersList').middleware(['auth:admin'])
Route.get('/users/update/:id', 'UserController.update').middleware(['auth:admin'])
Route.post('/users/update/:id', 'UserController.processUpdate').as('updateUser').middleware(['auth:admin'])
Route.get('/users/delete/:id', 'UserController.delete').as('deleteUser').middleware(['auth:admin'])
Route.get('/users/orderhistory/:id', 'CartController.viewOrder').as('orderHistory').middleware(['auth:admin'])

Route.post('api/user/register', 'UserController.processCreate')
Route.post('api/user/login', 'UserController.login')
Route.get('api/user/profile', 'UserController.profile').middleware(['auth:api'])
Route.get('api/food', 'FoodController.index')
Route.get('api/category', 'CategoryController.index')
Route.post('api/addaddress', 'AddressController.processCreate').middleware(['auth:api'])
Route.get('/api/deleteaddress', 'AddressController.delete').middleware(['auth:api'])
Route.get('/api/user/logout', 'UserController.logout').middleware(['auth:api'])
Route.post('/api/cart/create', 'CartController.createCart').middleware(['auth:api'])
Route.post('/api/order/create', 'OrderController.processCreate').middleware(['auth:api'])

Route.get('/category', 'CategoryController.adminIndex').as('categoryList').middleware(['auth:admin'])
Route.get('/category/create', 'CategoryController.create').as('createNewCategory').middleware(['auth:admin'])
Route.post('/category/create', 'CategoryController.processCreate').middleware(['auth:admin'])
Route.get('/category/update/:id', 'CategoryController.update').as('updateCategory').middleware(['auth:admin'])
Route.post('/category/update/:id', 'CategoryController.processUpdate').middleware(['auth:admin'])
Route.get('/category/delete/:id', 'CategoryController.delete').as('deleteCategory').middleware(['auth:admin'])

Route.get('/food', 'FoodController.adminIndex').as('foodList').middleware(['auth:admin'])
Route.get('/food/create', 'FoodController.create').as('createNewFood').middleware(['auth:admin'])
Route.post('/food/create', 'FoodController.processCreate').middleware(['auth:admin'])
Route.get('/food/update/:id', 'FoodController.update').as('updateFood').middleware(['auth:admin'])
Route.post('/food/update/:id', 'FoodController.processUpdate').middleware(['auth:admin'])
Route.get('/food/delete/:id', 'FoodController.delete').as('deleteFood').middleware(['auth:admin'])


Route.get('/cloudinary/sign', 'CloudinaryController.sign').as('cloudinary_sign').middleware(['auth:admin'])
