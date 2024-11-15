<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Rating extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id',
        'student_id',
        'mentor_id',
        'rating',
        'comment',
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function mentor()
    {
        return $this->belongsTo(Mentor::class);
    }
}
