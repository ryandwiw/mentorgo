<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MentoringSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'mentor_id',
        'title',
        'description',
        'session_type',
        'location',
        'latitude',
        'longitude',
        'date',
        'duration',
        'price',
        'student_limit',
        'current_participants',
        'status',
    ];

    protected $casts = [
        'date' => 'datetime',
    ];

    public function students()
    {
        return $this->belongsToMany(Student::class);
    }

    public function calculateEndTime()
    {
        return $this->start_time->addHours($this->duration);
    }

    public function mentor()
    {
        return $this->belongsTo(Mentor::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function isAvailable()
    {
        return $this->status === 'available' &&
               $this->current_participants < $this->student_limit;
    }



}
