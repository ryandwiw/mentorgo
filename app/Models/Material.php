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
        'access_type',
        'price',
    ];

    public function mentor()
    {
        return $this->belongsTo(Mentor::class);
    }
}
