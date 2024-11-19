<?php

namespace App\Models;

use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Student extends Model implements AuthenticatableContract
{
    use HasFactory;
    use Authenticatable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'bio',
        'profile_picture',
        'location',
        'google_id',
        'latitude',
        'longitude',
        'slug',
        'asal',
    ];

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }

    public function locationHistories()
    {
        return $this->morphMany(LocationHistory::class, 'user');
    }

    public function mentoringSessions()
    {
        return $this->belongsToMany(MentoringSession::class);
    }

    public function chats()
    {
        return $this->hasMany(Chat::class);
    }
}
