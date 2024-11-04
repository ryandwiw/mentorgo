<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'mentoring_session_id',
        'total_price',
        'status',
        'booking_time'
    ];

    protected $casts = [
        'booking_time' => 'datetime'
    ];

    public function mentoringSession()
    {
        return $this->belongsTo(MentoringSession::class);
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function payments()
    {
        return $this->hasOne(Payment::class);
    }

    public function ratings()
    {
        return $this->hasOne(Rating::class);
    }
}
