<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">        
        <!-- Styles -->
        <link href="{{ asset('/css/style.css') }}" rel="stylesheet">
        {{-- icon --}}
        <script src="https://kit.fontawesome.com/1877f468c8.js" crossorigin="anonymous"></script>
        {{-- bootstrap --}}
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
        {{-- tailwindcss --}}
        <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
        {{-- google fonts --}}
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,900&display=swap" rel="stylesheet">
        {{-- google map api --}}
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD8nlhkTRE7zQLu2Q0ISEGwr9Budhk3syo" async></script>
    </head>
    <body class="h-screen">          
        <div id="app">
            @yield('content')      
        </div>        
        <script src="{{ asset('js/app.js') }}"></script>
        <script>
            function test() {
                document.querySelector(".modal").classList.add("active");
            };

            function closeModal() {
                document.querySelector(".modal").classList.remove("active");
            }
        </script>
    </body>
</html>
