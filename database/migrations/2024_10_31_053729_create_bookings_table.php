<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('students')->onDelete('cascade'); // Relasi ke tabel students
            $table->foreignId('mentoring_session_id')->constrained()->onDelete('cascade');
            $table->decimal('total_price', 10, 2); // Total harga
            $table->enum('status', ['pending', 'confirmed', 'canceled']); // Status pemesanan
            $table->dateTime('booking_time'); // Waktu pemesanan
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
