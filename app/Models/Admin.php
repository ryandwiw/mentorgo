<?php

namespace App\Models;

use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use App\Models\Subject;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Auth\Authenticatable;

class Admin extends Model implements AuthenticatableContract
{
    use HasFactory;
    use Authenticatable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'slug',

    ];

    public function addSubject($name, $description = null)
    {
        return Subject::create([
            'name' => $name,
            'description' => $description,
        ]);
    }
}
