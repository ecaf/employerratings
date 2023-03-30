<?php

use App\Http\Controllers\EmployerController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/{path?}', function () {
    return view('home');
})->where('path', '^(?!api).*?');

Route::group(['prefix' => 'api'], function () {
    Route::any('/test', [EmployerController::class, 'calclate_points']);
    Route::any('/allRatings', [EmployerController::class, 'allRatings']);
    Route::post('/login', [\App\Http\Controllers\Api\LoginController::class, 'login']);
    Route::post('/register', [\App\Http\Controllers\Api\RegisterController::class, 'register']);

    Route::group(['middleware' => 'auth:sanctum'], function () {
        Route::post('/logout', [App\Http\Controllers\Api\LoginController::class, 'logout']);
        Route::post('/me', [App\Http\Controllers\Api\LoginController::class, 'me']);
    });
});

