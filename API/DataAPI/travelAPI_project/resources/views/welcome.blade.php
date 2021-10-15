@extends('layout.main')

@section('content')
    <div class="total">
        <div class="header">
            <div class="logo">
                <i class="fas fa-plane"></i>
                <span>travel</span>
            </div>
            <div class="menu"></div>
        </div>

        <div class="main">
            {{-- <main-page /> --}}
            <status-of-entry />
        </div>  
    </div>    
@endsection