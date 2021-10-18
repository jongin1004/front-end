<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\screenController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\UserMapController;


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

Route::get('/', function () {
    return view('welcome');
});

Route::get('file-import-export', [CountryController::class, 'fileImportExport']);
Route::post('file-import', [CountryController::class, 'fileImport'])->name('file-import');
Route::get('file-export', [CountryController::class, 'fileExport'])->name('file-export');
Route::post('/saveMap', [UserMapController::class, 'save']);
Route::get('/map', [screenController::class, 'map']);