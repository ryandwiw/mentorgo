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
        Schema::create('paymentsgateway', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booking_id')->constrained('bookings')->onDelete('cascade'); // Relasi ke tabel bookings
            $table->integer('amount'); // Jumlah pembayaran
            $table->string('transaction_id')->nullable(); // ID transaksi dari Midtrans
            $table->timestamp('payment_date')->nullable(); // Tanggal pembayaran
            $table->text('response')->nullable(); // Respons dari gateway pembayaran
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
