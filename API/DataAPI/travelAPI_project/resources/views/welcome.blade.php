@extends('layout.main')

@section('content')
    <div class="total">
        <div class="header">
            <div class="logo">
                <a href="/">
                    <i class="fas fa-plane"></i>
                    <span>travel</span>
                </a>                
            </div>
            <div class="menu"></div>
        </div>

        <div class="main">
            {{-- <main-page /> --}}
            <main-page />
        </div>  
    </div>    
@endsection