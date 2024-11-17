<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\GoogleController;
use App\Http\Controllers\MentoringSessionController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\MentorController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\CentralController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// localhost:8000/
Route::get('/', [CentralController::class, 'index'])->name('landing.page');
Route::get('/test', [CentralController::class, 'index2']);

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
    Route::post('/sessions/online/{mentoringSessionId}/google-meet', [SessionController::class, 'storeGoogleMeetLink'])
        ->name('mentor.sessions.online.google-meet.store');
    // Route::post('/sessions/online/{id}/google-meet', [SessionController::class, 'storeGoogleMeetLink'])->name('mentor.sessions.online.google-meet.store');
    // Route::post('/sessions/online/{bookingId}/google-meet', [SessionController::class, 'storeGoogleMeetLink'])->name('mentor.sessions.online.google-meet.store');
    Route::get('/sessions/ratings', [RatingController::class, 'mentorIndex'])->name('mentor.ratings.index');
    Route::get('/sessions/online/{id}', [SessionController::class, 'mentorShowOnline'])->name('mentor.session.online.show');
    Route::get('/sessions/offline/{id}', [SessionController::class, 'mentorShowOffline'])->name('mentor.session.offline.show');
    Route::get('/sessions', [MentoringSessionController::class, 'mentorSessions'])->name('mentor.session.dashboard');
    Route::get('/sessions/create', [MentoringSessionController::class, 'create'])->name('mentor.session.create');
    Route::post('/sessions', [MentoringSessionController::class, 'store'])->name('mentor.session.store');
    Route::get('/sessions/{id}', [MentoringSessionController::class, 'show'])->name('mentor.session.show');
    Route::get('/sessions/{id}/edit', [MentoringSessionController::class, 'edit'])->name('mentor.session.edit');
    Route::put('/sessions/{id}', [MentoringSessionController::class, 'update'])->name('mentor.session.update');
    Route::delete('/sessions/{id}', [MentoringSessionController::class, 'destroy'])->name('mentor.session.delete');

    Route::get('/students', [MentorController::class, 'students'])->name('mentor.students.index');
    Route::get('/students/{slug}', [MentorController::class, 'studentDetail'])->name('mentor.students.show');

    Route::get('/bookings', [BookingController::class, 'mentorBookings'])->name('mentor.bookings.index');
    Route::get('/materials', [MaterialController::class, 'indexforMentor'])->name('mentor.materials.index');
    Route::get('/materials/{material}', [MaterialController::class, 'showMentor'])->name('mentor.materials.show');

    // localhost:8000/mentor/ =>  Profile routes untuk mentor
    Route::get('/', [MentorController::class, 'dashboard'])->name('mentor.dashboard');
    Route::get('/help', [MentorController::class, 'help'])->name('mentor.help');
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

    Route::get('/mentors', [StudentController::class, 'mentors'])->name('student.mentors.index');
    Route::get('/mentors/{slug}', [StudentController::class, 'mentorDetail'])->name('student.mentors.show');

    // Rute untuk menampilkan form rating
    // Rute untuk menyimpan rating

    // Route::get('/sessions/online/{id}', [SessionController::class, 'showOnlineSession'])->name('student.sessions.online.show');
    // Route::get('/sessions/offline/{id}', [SessionController::class, 'showOfflineSession'])->name('student.sessions.offline.show');
    // Route::get('/sessions/mode/{id}', [SessionController::class, 'showSession'])->name('student.sessions.show');
    Route::get('/sessions/ratings', [RatingController::class, 'studentIndex'])->name('student.ratings.index');
    Route::get('/sessions/online/{bookingId}/rating', [RatingController::class, 'create'])->name('sessions.online.rating.create');
    Route::get('/sessions/offline/{bookingId}/rating', [RatingController::class, 'create'])->name('sessions.offline.rating.create');

    Route::post('/sessions/online/{id}/complete', [SessionController::class, 'completeon'])->name('sessions.online.complete');
    Route::post('/sessions/offline/{id}/complete', [SessionController::class, 'completeoff'])->name('sessions.offline.complete');
    Route::get('/sessions/online/{id}', [SessionController::class, 'showOnline'])->name('session.online.show');
    Route::get('/sessions/offline/{id}', [SessionController::class, 'showOffline'])->name('session.offline.show');
    Route::post('/sessions/online/{id}/google-meet', [SessionController::class, 'createGoogleMeetLink'])->name('session.online.google-meet');
    // Route::get('/sessions/offline/{sessionId}/rate', [RatingController::class, 'create'])->name('ratings.create');
    // Route::get('/sessions/online/{id}/rating', [RatingController::class, 'createOnline'])->name('ratings.create.online');
    // Route::get('/sessions/offline/{id}/rating', [RatingController::class, 'createOffline'])->name('ratings.create.offline');
    // Route::post('/ratings', [RatingController::class, 'store'])->name('ratings.store');
    // Route::get('/sessions/online/{id}/rating', [RatingController::class, 'createOnline'])->name('ratings.create.online');
    // Route::get('/sessions/offline/{id}/rating', [RatingController::class, 'createOffline'])->name('ratings.create.offline');
    // Route untuk menampilkan form rating

    // Route untuk menyimpan rating
    Route::post('/sessions/rating/store', [RatingController::class, 'storeRating'])->name('sessions.rating.store');

    Route::get('/materials', [MaterialController::class, 'indexforStudent'])->name('student.materials.index');
    Route::get('/materials/{material}', [MaterialController::class, 'showStudent'])->name('student.materials.show');

    Route::get('/payments', [PaymentController::class, 'index'])->name('student.payments.index');
    Route::get('/payments/create/{bookingId}', [PaymentController::class, 'create'])->name('student.payments.create');
    Route::post('/payments', [PaymentController::class, 'store'])->name('student.payments.store');

    // localhost:8000/student/sessions/ =>  Sesi order jasa  routes untuk student

    Route::get('/sessions', [MentoringSessionController::class, 'studentSessions'])->name('student.session.dashboard');
    Route::get('/sessions/{id}', [MentoringSessionController::class, 'studentShow'])->name('student.session.show');

    // localhost:8000/student/ =>  Profile routes untuk Student
    Route::get('/', [StudentController::class, 'dashboard'])->name('student.dashboard');
    Route::get('/help', [StudentController::class, 'help'])->name('student.help');
    Route::get('/settings', [StudentController::class, 'setting'])->name('student.setting');
    Route::get('/edit/{slug}', [StudentController::class, 'edit'])->name('student.edit');
    Route::put('/{slug}', [StudentController::class, 'update'])->name('student.update');
    Route::get('/{slug}', [StudentController::class, 'show'])->name('student.show');
    Route::post('/logout', [StudentController::class, 'logout'])->name('student.logout');
    Route::delete('/delete/{slug}', [StudentController::class, 'destroy'])->name('student.delete');
});


//Admin

Route::prefix('admin')->group(function () {
    Route::get('register', [AdminController::class, 'showRegister'])->name('admin.register');
    Route::post('register', [AdminController::class, 'register']);

    Route::get('login', [AdminController::class, 'showLogin'])->name('admin.login');
    Route::post('login', [AdminController::class, 'login']);

    Route::middleware('admin')->group(function () {
        Route::get('materials', [MaterialController::class, 'index'])->name('materials.index');
        Route::get('materials/create', [MaterialController::class, 'create'])->name('materials.create');
        Route::post('materials', [MaterialController::class, 'store'])->name('materials.store');
        Route::get('materials/{material}', [MaterialController::class, 'show'])->name('materials.show');
        Route::get('materials/{material}/edit', [MaterialController::class, 'edit'])->name('materials.edit');
        Route::put('materials/{material}', [MaterialController::class, 'update'])->name('materials.update');
        Route::delete('materials/{material}', [MaterialController::class, 'destroy'])->name('materials.destroy');
        Route::resource('subjects', SubjectController::class);

        Route::get('/', [AdminController::class, 'dashboard'])->name('admin.dashboard');
        Route::get('/help', [AdminController::class, 'help'])->name('admin.help');
        Route::get('/settings', [AdminController::class, 'setting'])->name('admin.setting');
        Route::get('/listakun', [AdminController::class, 'listakun'])->name('admin.listakun');
        // Route::get('/edit/{slug}', [AdminController::class, 'edit'])->name('admin.edit');
        // Route::put('/{slug}', [AdminController::class, 'update'])->name('admin.update');
        Route::get('/{slug}', [AdminController::class, 'show'])->name('admin.show');
        Route::post('logout', [AdminController::class, 'logout'])->name('admin.logout');
    });
});

require __DIR__ . '/auth.php';
