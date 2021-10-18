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
        
        $MapDatas = UserMap::where('lat', $request['lat'])->where('lng', $request['lng'])->get();
        if (count($MapDatas) == 0) {
            UserMap::create($validated);
        };

        return view('welcome');
    }

    public function getUserMap()
    {
        $userMapDatas = UserMap::get();

        return response()->json([
            'userMapDatas' => $userMapDatas
        ], 200);
    }
}
