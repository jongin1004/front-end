<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class screenController extends Controller
{
    public function map() {
        return view('map');
    }
}
