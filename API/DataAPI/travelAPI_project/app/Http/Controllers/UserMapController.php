<?php

namespace App\Http\Controllers;

use App\Models\UserMap;
use Illuminate\Http\Request;

class UserMapController extends Controller
{
    public function save(Request $request)
    {        
        $validated = request()->validate([
            'description' => 'required',
            'lat' => 'required',
            'lng' => 'required'
        ]);  

        // $map = []; 
        // $map['description'] = $request['description'];
        // $map['lat'] = $request['lat'];
        // $map['lng'] = $request['lng'];
        UserMap::create($validated);
        
        return redirect()->back();
    }
}
