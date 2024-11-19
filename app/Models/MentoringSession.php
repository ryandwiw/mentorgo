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
        'subject_id',
        'material_id',
    ];

    protected $casts = [
        'date' => 'datetime',
    ];

    public function students()
    {
        return $this->belongsToMany(Student::class);
    }

    // public function student()
    // {
    //     return $this->hasOne(Student::class);
    // }

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

    public function getSessionType($id)
    {
        $mentoringSession = MentoringSession::findOrFail($id);

        return $mentoringSession->session_type;
    }

    public function sessionOnline()
    {
        return $this->hasOne(SessionOnline::class);
    }

    public function sessionOffline()
    {
        return $this->hasOne(SessionOffline::class);
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function material()
    {
        return $this->belongsTo(Material::class);
    }
}
