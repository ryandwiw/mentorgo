<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SessionOffline extends Model
{
    use HasFactory;

    protected $fillable = ['mentoring_session_id', 'location', 'latitude', 'longitude'];

    public function mentoringSession()
    {
        return $this->belongsTo(MentoringSession::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
