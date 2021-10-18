<template>     
    <div class="Marker">{{ markerBool === false ? "marker표시" : "marker숨기기" }}</div>    
    <div id="map"></div>
</template>

<script>
export default {
    data() {
        return {
            userMapDatas: '', 
            modalBool: true,
            weatherData: '', 
            markerBool: false,        
        }
    },

    created() {        
        axios.get('api/getUserMap').then(res => {         
            this.userMapDatas = res.data.userMapDatas;
            this.initMap();
        });
    },

    methods: {
        initMap() {
            let map;
            let markers = new Array(this.userMapDatas.length).fill(0);            
            let myLatlng = this.userMapDatas[0] !== undefined ? { lat: this.userMapDatas[0]['lat'], lng: this.userMapDatas[0]['lng']} : { lat: 0, lng: 0 };
            
            map = new google.maps.Map(document.querySelector("#map"), {
                center: myLatlng,
                zoom:  this.userMapDatas[0] !== undefined ? 15 : 1,
            });

            let weatherInfo = new google.maps.InfoWindow({    
                maxWidth: 100,
                maxHeight: 100,
            });  

            let makerInfo = new google.maps.InfoWindow({          
                maxWidth: 200,
                });  
            
            document.querySelector(".Marker").addEventListener("click", () => {                
                this.showMarker(map, weatherInfo, makerInfo, markers);
                this.markerBool = !this.markerBool;
            });            

            // Configure the click listener.
            this.showWeather(map, weatherInfo, makerInfo);            
        },

        showWeather(map, weatherInfo, makerInfo) {
            // Configure the click listener.
            map.addListener("click", (mapsMouseEvent) => {
                let Latlng = JSON.parse(JSON.stringify(mapsMouseEvent.latLng));
                let url = `https://api.openweathermap.org/data/2.5/weather?lat=${Latlng.lat}&lon=${Latlng.lng}&appid=05086922b6ef740c6cf24a77cf9627be&units=metric`;

                fetch(url)
                .then(res => res.json())
                .then(myJson => {
                    this.weatherData = myJson;                    
                })
                // Close the current InfoWindow.
                weatherInfo.close();
                makerInfo.close();

                // Create a new InfoWindow.
                weatherInfo = new google.maps.InfoWindow({
                    position: mapsMouseEvent.latLng,
                });
                
                setTimeout(() => {
                    weatherInfo.setContent(
                        "<div>선택된 지역의 현재 날씨</div>" +
                        "<p style='display: flex; align-items: center;'><span>" + this.weatherData.weather[0].main +"</span><img src='http://openweathermap.org/img/wn/" + this.weatherData.weather[0].icon + "@2x.png' style='width: 30px;'></p>" + 
                        "<div> 평균온도 :" + this.weatherData.main.temp + "</div>" +
                        "<div> 체감온도 :" + this.weatherData.main.feels_like + "</div>" +
                        "<div> 최저온도 :" + this.weatherData.main.temp_min + "</div>" +
                        "<div> 최고온도 :" + this.weatherData.main.temp_max + "</div>" +
                        "<div> 바람 :" + this.weatherData.wind.speed + "</div>"
                    );
                    weatherInfo.open(map);  
                
                }, 300);                                  
            });
        },
        
        showMarker(map, weatherInfo, makerInfo, markers) {      
            if ( this.markerBool === true) {
                this.clearMarkers(markers);
            } else {
                this.addMarkerWithTimeout(map, markers, weatherInfo, makerInfo);               
            }            
        }, 

        addMarkerWithTimeout(map, markers, weatherInfo, makerInfo) {
            for (let i = 0; i < this.userMapDatas.length; i++) {
                setTimeout(() => {
                    markers[i] = new google.maps.Marker({
                        position: { lat: this.userMapDatas[i]['lat'], lng: this.userMapDatas[i]['lng'] },
                        map,
                        animation: google.maps.Animation.DROP,
                    });
                    
                    markers[i].addListener("click", () => {
                        weatherInfo.close();
                        makerInfo.close();

                        makerInfo.setContent(
                            "<strong>" + this.userMapDatas[i]['description'] + "</strong><br>"                        
                        );

                        makerInfo.open({
                            anchor: markers[i],
                            map,
                            shouldFocus: false,                        
                        });
                    });
                }, i * 100); 
            }                       
        },

        clearMarkers(markers) {
            for (let i = 0; i < markers.length; i++) {
                if (markers[i] !== 0) {
                    markers[i].setMap(null);
                }
            }
            markers = new Array(this.userMapDatas.length).fill(0);
        },
    }
}
</script>