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

Route.get('/', 'HomeController.Welcome');
Route.get('/delete/:id', 'HomeController.Delete');
Route.on('/admin-login').render('login'); 
Route.get('/product-info/:product', 'HomeController.ProductInfo');
Route.get('/admin-home', 'HomeController.AdminHome');
Route.post('/admin-login', 'HomeController.Login');
Route.post('/download', 'HomeController.Download');
Route.post('/add-item', 'HomeController.AddItem');