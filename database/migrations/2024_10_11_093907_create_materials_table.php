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
            $table->foreignId('mentor_id')->nullable()->constrained('mentors')->onDelete('cascade'); // Relasi ke tabel mentors, nullable
            // $table->foreignId('subject_id')->nullable()->constrained('subjects')->onDelete('cascade'); // Relasi ke tabel subjects, nullable
            $table->string('title'); // Judul materi
            $table->text('content'); // Konten materi
            $table->enum('format', ['video', 'pdf', 'link'])->nullable(); // Format materi
            $table->string('file')->nullable(); // Make file nullable
            $table->string('link')->nullable(); // Add link column
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
