<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{

    use HasFactory;

    protected $fillable = ['name', 'description', 'profile_matkul'];

    public function mentors()
    {
        return $this->belongsToMany(Mentor::class, 'mentor_subject');
    }

    public function materials()
    {
        return $this->hasMany(Material::class);
    }

    public function mentoringSession()
    {
        return $this->hasOne(MentoringSession::class);
    }
}
