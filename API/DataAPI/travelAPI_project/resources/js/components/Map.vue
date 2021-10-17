<template>    
    <button class="mapBtn" @click="initMap">지도보기</button>            
    <div id="map"></div>
</template>

<script>
export default {
    data() {
        return {
            map: null,
            myLatlng: { lat: 37.68, lng: 127.75 },
        }
    },

    // created() {        
    //     this.initMap();
    // },

    methods: {
        initMap() {
            let map;            
            let myLatlng = { lat: 37.68, lng: 127.75 };
            map = new google.maps.Map(document.querySelector("#map"), {
                center: myLatlng,
                zoom: 15,    
            });
        

            // Create the initial InfoWindow.
            // let infoWindow = new google.maps.InfoWindow({
            //   content: "Click the map to get Lat/Lng!",
            //   position: myLatlng,
            // });
            // infoWindow.open(map);

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

            let markLatlng = [
                { lat: 37.68507190212072, lng: 127.75659465746138 },
                { lat: 37.682728454890174, lng: 127.74071598009321 },
                { lat: 37.67617320208278, lng: 127.75698089555952 },
            ];

            let message = [
                "마크1",
                "마크2",
                "마크3"
            ];

            for (let i = 0; i < markLatlng.length; i++) {
                let marker = new google.maps.Marker({
                    position: markLatlng[i],
                    map,
                    title: "Uluru (Ayers Rock)",
                });

                marker.addListener("click", () => {
                    infoWindow.close();
                    infoWindow2.close();

                    infoWindow2.setContent(
                        message[i]
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