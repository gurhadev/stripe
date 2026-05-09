<?php

use App\Http\Controllers\StripePaymentGatway;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post("refresh",[AuthController::class,"refresh"]);

Route::middleware('jwt')->group(function () {
    Route::get('/user', [AuthController::class, 'getUser']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post("/create-checkout-indent",[StripePaymentGatway::class,"index"]);
    Route::get("payment/{id}",[StripePaymentGatway::class,"getStripePaymentDetails"]);
});