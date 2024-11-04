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
        Schema::create('materials', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mentor_id')->constrained('mentors')->onDelete('cascade'); // Relasi ke tabel mentors
            $table->foreignId('admin_id')->constrained('admins')->onDelete('cascade'); // Relasi ke tabel admins
            $table->string('title'); // Judul materi
            $table->text('content'); // Konten materi
            $table->enum('format', ['video', 'pdf', 'link']); // Format materi
            $table->enum('access_type', ['online', 'offline']); // Tipe akses materi
            $table->decimal('price', 10, 2)->nullable(); // Harga materi (jika ada)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('materials');
    }
};
