<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class LocationHistory extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'user_type', 'latitude', 'longitude'];

    public function user()
    {
        return $this->morphTo();
    }
}
