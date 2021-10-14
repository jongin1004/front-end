<?php

namespace App\Imports;
use App\Models\Country;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class CountryImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Country([
            'country_han' => $row[0],
            'country_en' => $row[1],
            'iso_code_two' => $row[2],
            'iso_code_thr' => $row[3]
        ]);
    }
}