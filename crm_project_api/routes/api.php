<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\getData;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\PaymentController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// users
Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);
Route::get('data',[getData::class,'data']);
Route::get('/edit/{id}',[getData::class,'edit']);
Route::put('/update/{id}',[getData::class,'update']);
Route::delete('/deleteUser/{id}',[getData::class,'delete']);
// Route::post('logout',[AuthController::class,'logOut']);

// service 
Route::post('/service',[ServiceController::class,'serviceRegister']);
Route::get('/getService',[ServiceController::class,'getService']);
Route::get('/editService/{id}',[ServiceController::class,'edit']);
Route::put('/updateService/{id}',[ServiceController::class,'update']);
Route::delete('/deleteService/{id}',[ServiceController::class,'delete']);

// Booking
Route::post('/booking',[BookingController::class,'booking']);
Route::get('/cart/{id}',[BookingController::class,'cartData']);
Route::delete('/delete/{id}',[BookingController::class,'delete']);

// Payment
Route::post('/payment',[PaymentController::class,'payment']);
Route::get('order/{id}',[PaymentController::class,'order']);
