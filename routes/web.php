<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\GoogleController;
use App\Http\Controllers\MentoringSessionController;
use App\Http\Controllers\MentorController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\CentralController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// localhost:8000/
Route::get('/', [CentralController::class, 'index'])->name('landing.page');

// Tanpa Middleware
// localhost:8000/mentor
Route::prefix('mentor')->group(function () {
    Route::get('login', [MentorController::class, 'showLogin'])->name('mentor.login');
    Route::post('login', [MentorController::class, 'login']);
    Route::get('login/google', function () {
        return app(GoogleController::class)->redirectToGoogle('mentor');
    })->name('mentor.login.google');

    Route::get('login/google/callback', [GoogleController::class, 'handleGoogleCallback']);
    Route::get('register', [MentorController::class, 'showRegister'])->name('mentor.register');
    Route::post('register', [MentorController::class, 'register']);
});

// localhost:8000/student
Route::prefix('student')->group(function () {
    Route::get('login', [StudentController::class, 'showLogin'])->name('student.login');
    Route::post('login', [StudentController::class, 'login']);
    Route::get('login/google', function () {
        return app(GoogleController::class)->redirectToGoogle('student');
    })->name('student.login.google');
    Route::get('login/google/callback', [GoogleController::class, 'handleGoogleCallback']);
    Route::get('register', [StudentController::class, 'showRegister'])->name('student.register');
    Route::post('register', [StudentController::class, 'register']);
});


// Auth Middleware -> Must Login

Route::prefix('mentor')->middleware('mentor')->group(function () {

    // localhost:8000/mentor/session => Sessions routes untuk mentor
    Route::get('/sessions', [MentoringSessionController::class, 'mentorSessions'])->name('mentor.session.dashboard');
    Route::get('/sessions/create', [MentoringSessionController::class, 'create'])->name('mentor.session.create');
    Route::post('/sessions', [MentoringSessionController::class, 'store'])->name('mentor.session.store');
    Route::get('/sessions/{id}', [MentoringSessionController::class, 'show'])->name('mentor.session.show');
    Route::get('/sessions/{id}/edit', [MentoringSessionController::class, 'edit'])->name('mentor.session.edit');
    Route::put('/sessions/{id}', [MentoringSessionController::class, 'update'])->name('mentor.session.update');
    Route::delete('/sessions/{id}', [MentoringSessionController::class, 'destroy'])->name('mentor.session.delete');


    // localhost:8000/mentor/ =>  Profile routes untuk mentor
    Route::get('/', [MentorController::class, 'dashboard'])->name('mentor.dashboard');
    Route::get('/settings', [MentorController::class, 'setting'])->name('mentor.setting');
    Route::get('/edit/{slug}', [MentorController::class, 'edit'])->name('mentor.edit');
    Route::put('/{slug}', [MentorController::class, 'update'])->name('mentor.update');
    Route::get('{slug}', [MentorController::class, 'show'])->name('mentor.show');
    Route::post('/logout', [MentorController::class, 'logout'])->name('mentor.logout');
    Route::delete('/delete/{slug}', [MentorController::class, 'destroy'])->name('mentor.delete');
});

Route::prefix('student')->middleware('student')->group(function () {

    // localhost:8000/student/sessions/bookings =>  Booking order jasa  routes untuk student
    Route::prefix('sessions/bookings')->name('student.sessions.bookings.')->group(function () {
        Route::get('/', [BookingController::class, 'index'])->name('index');
        Route::post('/', [BookingController::class, 'store'])->name('store');
        Route::get('/{id}', [BookingController::class, 'show'])->name('show');
        Route::put('/{id}/cancel', [BookingController::class, 'cancel'])->name('cancel');
    });

    // localhost:8000/student/sessions/ =>  Sesi order jasa  routes untuk student

    Route::get('/sessions', [MentoringSessionController::class, 'studentSessions'])->name('student.session.dashboard');
    Route::get('/sessions/{id}', [MentoringSessionController::class, 'studentShow'])->name('student.session.show');

    // localhost:8000/mentor/ =>  Profile routes untuk Student
    Route::get('/', [StudentController::class, 'dashboard'])->name('student.dashboard');
    Route::get('/settings', [StudentController::class, 'setting'])->name('student.setting');
    Route::get('/edit/{slug}', [StudentController::class, 'edit'])->name('student.edit');
    Route::put('/{slug}', [StudentController::class, 'update'])->name('student.update');
    Route::get('/{slug}', [StudentController::class, 'show'])->name('student.show');
    Route::post('/logout', [StudentController::class, 'logout'])->name('student.logout');
    Route::delete('/delete/{slug}', [StudentController::class, 'destroy'])->name('student.delete');
});


require __DIR__ . '/auth.php';
