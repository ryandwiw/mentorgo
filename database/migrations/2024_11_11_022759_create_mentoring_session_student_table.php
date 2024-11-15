<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('mentoring_session_student', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('mentoring_session_id');
            $table->unsignedBigInteger('student_id');
            $table->timestamps();

            $table->foreign('mentoring_session_id')->references('id')->on('mentoring_sessions')->onDelete('cascade');
            $table->foreign('student_id')->references('id')->on('students')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('mentoring_session_student');
    }
};
