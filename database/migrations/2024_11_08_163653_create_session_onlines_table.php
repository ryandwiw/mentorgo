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
        Schema::create('session_onlines', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mentoring_session_id')->constrained('mentoring_sessions')->onDelete('cascade');
            $table->string('google_meet_link')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('session_onlines');
    }
};
