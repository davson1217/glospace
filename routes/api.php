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

// client-side protected routes
Route::post('/registerUser','App\Http\Controllers\UserController@Register');
Route::post('/createSuperAdmin','App\Http\Controllers\UserController@CreateSuper');
Route::get('/slides','App\Http\Controllers\SlidesController@All');
Route::get('/services','App\Http\Controllers\ServiceController@All');
Route::post('/enquiry','App\Http\Controllers\AboutController@ContactUs');
//Route::get('/enquiry','App\Http\Controllers');

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return response()->json(["success"=>true,"user"=>$request->user()]);
//});


Route::middleware("auth:api")->group(function(){

    #::::::::::::   CLIENT-SIDE AUTH ROUTES     ::::::::::::#

    Route::get('/user', function (Request $request){
        return response()->json(["success"=>true,"user"=>$request->user()]);
    });
    //user update
    Route::post('/updateUser','App\Http\Controllers\UserController@Update');
    //user verify
    Route::post('/emailVerified','App\Http\Controllers\UserController@EmailVerified');
    //Invoice Routes
    Route::get("/invoices",'App\Http\Controllers\ShipmentInvoiceController@SortInvoice');
    Route::post("/receiptUpload",'App\Http\Controllers\PaymentUploadController@PaymentUpload');

    #::::::::::::   SERVER-SIDE AUTH ROUTES     ::::::::::::#

    //services Routes
# ROUTE:: Fetch All Services
//    Route::get('/services','App\Http\Controllers\ServiceController@All');
# ROUTE:: Add a service
    Route::post('/addService','App\Http\Controllers\ServiceController@Add');
# ROUTE:: Delete a service
    Route::post('/deleteService','App\Http\Controllers\ServiceController@Delete');

    //Slides Routes
# ROUTE:: Fetch All Slides
//    Route::get('/slides','App\Http\Controllers\SlidesController@All');
# ROUTE:: Add a Slide
    Route::post('/addSlide','App\Http\Controllers\SlidesController@Add');
# ROUTE:: Delete a Slide
    Route::post('/deleteSlide','App\Http\Controllers\SlidesController@Delete');

    //Accounts Routes
# ROUTE:: Fetch All Accounts
    Route::get('/accounts','App\Http\Controllers\UserController@All');
# ROUTE:: Update an Account :: Verified/Not Verified
    Route::post('/verifiedStatus','App\Http\Controllers\UserController@UpdateVerifiedStatus');
# ROUTE:: Filter Accounts List
    Route::post('/filterList','App\Http\Controllers\UserController@FilterResult');
# ROUTE:: Filter Accounts BY GSN
    Route::get('/filterByGSN','App\Http\Controllers\UserController@FilterByGSN');

    //Tracking Routes

# ROUTE:: Check Account GSNumber
    Route::post('/checkGSNumber','App\Http\Controllers\UserController@CheckGSNumber');

# ROUTE:: Create Tracking
    Route::post('/createTracking','App\Http\Controllers\ShipmentsController@Create');

# ROUTE:: Fetch Shipments
    Route::get('/fetchShipments','App\Http\Controllers\ShipmentsController@FetchShipments');

# ROUTE:: Client Shipment Tracking
    Route::get('/clientTracking','App\Http\Controllers\ShipmentsController@ClientTrackShipment');

# ROUTE:: Delete Shipment
    Route::delete('/deleteShipment','App\Http\Controllers\ShipmentsController@DeleteShipment');


    // Invoice Routes

    Route::post('/createInvoice','App\Http\Controllers\ShipmentInvoiceController@create');
    Route::get('/getInvoice','App\Http\Controllers\ShipmentInvoiceController@view');

    //This route works for the hidden "Paid" button in the InvoiceView Component
    //Route::post('/invoicePaid','App\Http\Controllers\ShipmentInvoiceController@InvoiceIsPaid');

    Route::delete('/deleteInvoice','App\Http\Controllers\ShipmentInvoiceController@delete');

    Route::get('/invoiceDetails','App\Http\Controllers\ShipmentInvoiceController@GetInvoiceWithProps');
#Invoice Payments
    Route::get('/getPaymentUploads','App\Http\Controllers\PaymentUploadController@GetUnconfirmedUploads');
    Route::post('/paymentConfirmed','App\Http\Controllers\PaymentUploadController@PaymentConfirmed');
    Route::post('/rejectPayment','App\Http\Controllers\PaymentUploadController@PaymentReject');

    // Shipment Progress Routes

# ROUTE:: Fetch Progress
    Route::post('/addProgress','App\Http\Controllers\ShipmentProgressController@AddProgress');

# ROUTE:: Fetch Progress
    Route::post('/shipmentProgress','App\Http\Controllers\ShipmentProgressController@FetchShipmentProgress');

# ROUTE:: Delete Progress
    Route::post('/deleteProgress','App\Http\Controllers\ShipmentsController@DeleteShipmentProgress');

});
