<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SessionOnline extends Model
{
    use HasFactory;

    protected $fillable = ['mentoring_session_id', 'google_meet_link'];

    public function mentoringSession()
    {
        return $this->belongsTo(MentoringSession::class, 'mentoring_session_id');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

}
