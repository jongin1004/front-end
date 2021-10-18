<template>  
    <!-- modal -->
    <!-- <div class="modal" v-bind:class="{ active : modalBool }" @click="closeModal">
        <div class="modal_content">
            <div>ㅇㅇㅇㅇㅇㅇㅇㅇ</div>
        </div>
    </div> -->
    <div @click="getWeather">날씨</div>
    <div id="map"></div>
</template>

<script>
export default {
    data() {
        return {
            userMapDatas: '', 
            modalBool: true,
            weatherData: '',  
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
            let myLatlng = this.userMapDatas[0] !== undefined ? { lat: this.userMapDatas[0]['lat'], lng: this.userMapDatas[0]['lng']} : { lat: 0, lng: 0 };
            map = new google.maps.Map(document.querySelector("#map"), {
                center: myLatlng,
                zoom:  this.userMapDatas[0] !== undefined ? 15 : 1,
            });

            let infoWindow = new google.maps.InfoWindow({    
                maxWidth: 100,
                maxHeight: 100,
            });  

            let infoWindow2 = new google.maps.InfoWindow({          
                maxWidth: 200,
                });  

            // Configure the click listener.
            map.addListener("click", (mapsMouseEvent) => {
                let Latlng = JSON.parse(JSON.stringify(mapsMouseEvent.latLng));
                let url = `https://api.openweathermap.org/data/2.5/weather?lat=${Latlng.lat}&lon=${Latlng.lng}&appid=05086922b6ef740c6cf24a77cf9627be&units=metric`;

                fetch(url)
                .then(res => res.json())
                .then(myJson => {
                    this.weatherData = myJson;
                    console.log(myJson.weather[0].main);
                })
                // Close the current InfoWindow.
                infoWindow.close();
                infoWindow2.close();

                // Create a new InfoWindow.
                infoWindow = new google.maps.InfoWindow({
                    position: mapsMouseEvent.latLng,
                });

                infoWindow.setContent(
                    "<div>선택된 지역의 현재 날씨</div>" +
                    "<p style='display: flex; align-items: center;'><span>날씨 </span><img src='http://openweathermap.org/img/wn/" + this.weatherData.weather[0].icon + "@2x.png' style='width: 30px;'></p>" + 
                    "<div> 평균온도 :" + this.weatherData.main.temp + "</div>" +
                    "<div> 체감온도 :" + this.weatherData.main.feels_like + "</div>" +
                    "<div> 최저온도 :" + this.weatherData.main.temp_min + "</div>" +
                    "<div> 최고온도 :" + this.weatherData.main.temp_max + "</div>" +
                    "<div> 바람 :" + this.weatherData.wind.speed + "</div>"
                );
                infoWindow.open(map);
                
                console.log(Latlng);
            });

            for (let i = 0; i < this.userMapDatas.length; i++) {
                let marker = new google.maps.Marker({
                    position: { lat: this.userMapDatas[i]['lat'], lng: this.userMapDatas[i]['lng'] },
                    map,                    
                });

                marker.addListener("click", () => {
                    infoWindow.close();
                    infoWindow2.close();

                    infoWindow2.setContent(
                        "<strong>" + this.userMapDatas[i]['description'] + "</strong><br>" + 
                        "<div>날씨보기</div>"
                    );

                    infoWindow2.open({
                        anchor: marker,
                        map,
                        shouldFocus: false,
                    });
                });
            }
        },

        closeModal() {                
            this.modalBool = false;
        },
    }
}
</script>