<?php

use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PortfolioController::class, 'index'])->name('home');

// Admin Auth Routes
Route::middleware('guest')->group(function () {
    Route::get('/admin/login', [AdminController::class, 'showLogin'])->name('admin.login');
    Route::post('/admin/login', [AdminController::class, 'login']);
});

// Protected Admin Routes
Route::middleware('auth')->prefix('admin')->group(function () {
    Route::post('/logout', [AdminController::class, 'logout'])->name('admin.logout');
    Route::get('/', [AdminController::class, 'dashboard'])->name('admin.dashboard');

    Route::put('/hero', [AdminController::class, 'updateHero']);
    Route::put('/about', [AdminController::class, 'updateAbout']);

    Route::post('/experiences', [AdminController::class, 'createExperience']);
    Route::put('/experiences/{id}', [AdminController::class, 'updateExperience']);
    Route::delete('/experiences/{id}', [AdminController::class, 'deleteExperience']);

    Route::post('/projects', [AdminController::class, 'createProject']);
    Route::put('/projects/{id}', [AdminController::class, 'updateProject']);
    Route::delete('/projects/{id}', [AdminController::class, 'deleteProject']);

    Route::post('/tech-stacks', [AdminController::class, 'createTechStack']);
    Route::put('/tech-stacks/{id}', [AdminController::class, 'updateTechStack']);
    Route::delete('/tech-stacks/{id}', [AdminController::class, 'deleteTechStack']);

    Route::post('/logs', [AdminController::class, 'createLog']);
    Route::post('/actions/clear-cache', [AdminController::class, 'clearCache']);
    Route::post('/actions/run-tests', [AdminController::class, 'runTests']);
});
