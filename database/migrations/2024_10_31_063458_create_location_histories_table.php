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
        Schema::create('location_histories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id'); // ID pengguna
            $table->enum('user_type', ['student', 'mentor']); // Tipe pengguna (mahasiswa atau mentor)
            $table->decimal('latitude', 10, 8); // Latitude lokasi
            $table->decimal('longitude', 11, 8); // Longitude lokasi
            $table->timestamps(); // Waktu pencatatan lokasi
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('location_histories');
    }
};
