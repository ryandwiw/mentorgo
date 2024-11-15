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
        Schema::create('mentoring_sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mentor_id')->constrained('mentors')->onDelete('cascade'); // Menghubungkan ke tabel mentors
            $table->foreignId('subject_id')->constrained('subjects')->onDelete('cascade');
            $table->string('title'); // Judul sesi mentoring
            $table->text('description'); // Deskripsi sesi mentoring
            $table->enum('session_type', ['online', 'offline']); // Tipe sesi
            $table->string('location')->nullable(); // Lokasi sesi jika offline
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->dateTime('date'); // Tanggal dan waktu sesi
            $table->integer('duration'); // Durasi sesi dalam menit
            $table->integer('price'); // Harga sesi
            $table->integer('student_limit')->nullable(); // Batas jumlah siswa
            $table->integer('current_participants')->default(0); // Jumlah peserta saat ini
            $table->dateTime('start_time')->nullable(); // Waktu mulai sesi
            $table->dateTime('end_time')->nullable(); // Waktu selesai sesi
            $table->boolean('is_completed')->default(false); // Status penyelesaian sesi
            $table->enum('status', ['available', 'booked', 'completed', 'canceled']); // Status sesi
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mentoring_sessions');
    }
};
