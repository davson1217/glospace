<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

                                    //services Routes
# ROUTE:: Fetch All Services
Route::get('/services','App\Http\Controllers\ServiceController@All');
# ROUTE:: Add a service
Route::post('/addService','App\Http\Controllers\ServiceController@Add');
# ROUTE:: Delete a service
Route::post('/deleteService','App\Http\Controllers\ServiceController@Delete');

                                    //Slides Routes
# ROUTE:: Fetch All Slides
Route::get('/slides','App\Http\Controllers\SlidesController@All');
# ROUTE:: Add a Slide
Route::post('/addSlide','App\Http\Controllers\SlidesController@Add');
# ROUTE:: Delete a Slide
Route::post('/deleteSlide','App\Http\Controllers\SlidesController@Delete');

                                    //Accounts Routes
# ROUTE:: Fetch All Accounts
Route::get('/accounts','App\Http\Controllers\UserController@All');
# ROUTE:: Add an Account
#Route::post('/addSlide','App\Http\Controllers\SlidesController@Add');
# ROUTE:: Delete an Account
#Route::post('/deleteSlide','App\Http\Controllers\SlidesController@Delete');

# ROUTE:: Update an Account :: Verified/Not Verified
Route::post('/verifiedStatus','App\Http\Controllers\UserController@UpdateVerifiedStatus');
# ROUTE:: Filter Accounts List
Route::post('/filterList','App\Http\Controllers\UserController@FilterResult');

                    //Tracking Routes

# ROUTE:: Check Account GSNumber
Route::post('/checkGSNumber','App\Http\Controllers\UserController@CheckGSNumber');

# ROUTE::
Route::get('/fetchShipments','App\Http\Controllers\ShipmentsController@FetchShipments');

# ROUTE::
Route::post('/shipmentProgress','App\Http\Controllers\ShipmentsController@FetchShipmentProgress');

