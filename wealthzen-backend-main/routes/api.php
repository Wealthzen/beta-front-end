<?php

use App\Http\Controllers\AnswerController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\UserController;
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

/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/

Route::fallback(function () {
    return response()->json(['status' => 404, 'error' => 'Not Found'], 404);
});

Route::prefix('/users')->group(function () {
    Route::get('/', [UserController::class, 'all']);
    Route::get('/{id}', [UserController::class, 'get']);
    Route::post('/', [UserController::class, 'store']);
    Route::put('/{id}', [UserController::class, 'update']);
    Route::delete('/{id}', [UserController::class, 'delete']);
});

Route::prefix('/questions')->group(function (){
    Route::get('/', [QuestionController::class, 'all']);
    Route::get('/{id}', [QuestionController::class, 'get']);
    Route::post('/', [QuestionController::class, 'store']);
    Route::put('/{id}', [QuestionController::class, 'update']);
    Route::delete('/{id}', [QuestionController::class, 'delete']);
    Route::post('/import', [QuestionController::class, 'import']);
});

Route::prefix('/answers')->group(function (){
    Route::get('/', [AnswerController::class, 'all']);
    Route::get('/{id}', [AnswerController::class, 'get']);
    Route::post('/', [AnswerController::class, 'store']);
    Route::put('/{id}', [AnswerController::class, 'update']);
    Route::delete('/{id}', [AnswerController::class, 'delete']);
});

Route::prefix('/portfolios')->group(function (){
    Route::get('/', [PortfolioController::class, 'all']);
    Route::get('/{id}', [PortfolioController::class, 'get']);
    Route::post('/', [PortfolioController::class, 'store']);
    Route::put('/{id}', [PortfolioController::class, 'update']);
    Route::delete('/{id}', [PortfolioController::class, 'delete']);
});

Route::prefix('/quizzes')->group(function (){
    Route::post('/', [QuizController::class, 'store']);
});
