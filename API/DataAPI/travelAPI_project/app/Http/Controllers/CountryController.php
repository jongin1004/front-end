<?php

namespace App\Http\Controllers;
use App\Models\Country;
use Illuminate\Http\Request;
use App\Exports\CountryExport;
use App\Imports\CountryImport;
use Maatwebsite\Excel\Facades\Excel;

class CountryController extends Controller
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function fileImportExport()
    {
       return view('file-import');
    }
   
    /**
    * @return \Illuminate\Support\Collection
    */
    public function fileImport(Request $request) 
    {
        Excel::import(new CountryImport, $request->file('file')->store('temp'));
        return back();
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function fileExport() 
    {
        return Excel::download(new CountryExport, 'countrys-collection.xlsx');
    }  

    public function getData() 
    {
        $countries = Country::paginate(7);

        return response()->json([
            'countries' => $countries,
        ], 200);
    }

    public function allData() 
    {
        $countries = Country::get();

        return response()->json([
            'countries' => $countries,
        ], 200);
    }
}