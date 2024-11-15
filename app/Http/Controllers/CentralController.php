<?php

namespace App\Http\Controllers;
use Inertia\Inertia;

use Illuminate\Http\Request;

class CentralController extends Controller
{
    public function index(){
        return Inertia::render('Homepage');
    }
    public function index2(){
        return Inertia::render('Test');
    }



}
