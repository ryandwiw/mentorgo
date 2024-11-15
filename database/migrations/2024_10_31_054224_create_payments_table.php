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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booking_id')->constrained('bookings')->onDelete('cascade'); // Relasi ke tabel bookings
            $table->integer('amount'); // Jumlah pembayaran
            $table->enum('payment_method', ['credit_card', 'e-wallet', 'bank_transfer']); // Metode pembayaran
            $table->enum('status', ['paid', 'pending', 'failed']); // Status pembayaran
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
