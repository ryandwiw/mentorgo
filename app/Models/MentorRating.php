<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MentorRating extends Model
{
    protected $fillable = ['mentor_id', 'average_rating', 'total_ratings'];

    public function mentor()
    {
        return $this->belongsTo(Mentor::class);
    }
}
