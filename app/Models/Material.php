<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Material extends Model
{
    use HasFactory;

    protected $fillable = [
        'mentor_id',
        'title',
        'content',
        'format',
        'file',
        'subject_id',
        'link',
    ];

    public function mentor()
    {
        return $this->belongsTo(Mentor::class);
    }

    public function subjects()
    {
        return $this->belongsToMany(Subject::class, 'material_subject');
    }
}
