<?php

namespace App\Models;

use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Mentor extends Model implements AuthenticatableContract
{
    use HasFactory;
    use Authenticatable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'bio',
        'profile_picture',
        'subjects',
        'rating',
        'location',
        'google_id',
        'latitude',
        'longitude',
        'slug',
        'asal',
    ];

    public function mentoringSessions()
    {
        return $this->hasMany(MentoringSession::class);
    }

    public function materials()
    {
        return $this->hasMany(Material::class);
    }

    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }

    public function locationHistories()
    {
        return $this->morphMany(LocationHistory::class, 'user');
    }

    public function mentorRating()
    {
        return $this->hasOne(MentorRating::class);
    }

    public function subjects()
    {
        return $this->belongsToMany(Subject::class, 'mentor_subject');
    }

    // Method untuk menambahkan subject ke mentor
    public function addSubject($subjectId)
    {
        return $this->subjects()->attach($subjectId);
    }

    // Method untuk menghapus subject dari mentor
    public function removeSubject($subjectId)
    {
        return $this->subjects()->detach($subjectId);
    }
}
