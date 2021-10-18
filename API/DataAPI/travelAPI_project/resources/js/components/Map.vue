<template>         
    <div id="map"></div>
</template>

<script>
export default {
    data() {
        return {
            userMapDatas: '',    
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
                maxWidth: 200,
            });  

            let infoWindow2 = new google.maps.InfoWindow({          
                maxWidth: 200,
                });  

            // Configure the click listener.
            map.addListener("click", (mapsMouseEvent) => {
                let Latlng = JSON.parse(JSON.stringify(mapsMouseEvent.latLng));
                // Close the current InfoWindow.
                infoWindow.close();
                infoWindow2.close();

                // Create a new InfoWindow.
                infoWindow = new google.maps.InfoWindow({
                    position: mapsMouseEvent.latLng,
                });

                infoWindow.setContent(
                    "<form action='/saveMap' method='POST'>" +                    
                    "<input type='text' name='description' placeholder='간단한 메모를 적으세요.'></input>" +                     
                    "<input type='hidden' name='lat' value="+ Latlng.lat.toString() + "></input>" +
                    "<input type='hidden' name='lng' value="+ Latlng.lng.toString() + "></input>" +
                    "<input type='submit' />" +
                    "</form>"
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
                        this.userMapDatas[i]['description']
                    );

                    infoWindow2.open({
                        anchor: marker,
                        map,
                        shouldFocus: false,
                    });
                });
            }
        }
    }
}
</script>