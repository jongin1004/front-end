<template>  
    <!-- modal -->
    <!-- <div class="modal" v-bind:class="{ active : modalBool }" @click="closeModal">
        <div class="modal_content">
            <div>ㅇㅇㅇㅇㅇㅇㅇㅇ</div>
        </div>
    </div> -->
    <div class="Marker">{{ markerBool === false ? "marker표시" : "marker숨기기" }}</div>
    <div id="map"></div>
</template>

<script>
export default {
    data() {
        return {
            userMapDatas: '', 
            modalBool: true,
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

            let FormInfo = new google.maps.InfoWindow({    
                maxWidth: 200,
            });  

            let markerInfo = new google.maps.InfoWindow({          
                maxWidth: 200,
                });              
            
            document.querySelector(".Marker").addEventListener("click", () => {                
                this.showMarker(map, FormInfo, markerInfo, markers);
                this.markerBool = !this.markerBool;
            });  

            this.showFormOfMarker(map, FormInfo, markerInfo);            
        },

        showFormOfMarker(map, FormInfo, markerInfo) {
            map.addListener("click", (mapsMouseEvent) => {
                let Latlng = JSON.parse(JSON.stringify(mapsMouseEvent.latLng));
                // Close the current InfoWindow.
                FormInfo.close();
                markerInfo.close();

                // Create a new InfoWindow.
                FormInfo = new google.maps.InfoWindow({
                    position: mapsMouseEvent.latLng,
                });

                FormInfo.setContent(
                    "<form action='/saveMap' method='POST'>" +                    
                    "<input type='text' name='description' placeholder='간단한 메모를 적으세요.'></input>" +                     
                    "<input type='hidden' name='lat' value="+ Latlng.lat.toString() + "></input>" +
                    "<input type='hidden' name='lng' value="+ Latlng.lng.toString() + "></input>" +
                    "<input type='submit' />" +
                    "</form>"
                );
                FormInfo.open(map);                                
            });
        },

        showMarker(map, FormInfo, markerInfo, markers) {
            if ( this.markerBool === true) {
                this.clearMarkers(markers);
            } else {
                this.addMarkerWithTimeout(map, markers, FormInfo, markerInfo);               
            }       
        },

        addMarkerWithTimeout(map, markers, FormInfo, markerInfo) {
            for (let i = 0; i < this.userMapDatas.length; i++) {
                setTimeout(() => {
                    markers[i] = new google.maps.Marker({
                        position: { lat: this.userMapDatas[i]['lat'], lng: this.userMapDatas[i]['lng'] },
                        map,
                        animation: google.maps.Animation.DROP,
                    });
                    
                    markers[i].addListener("click", () => {
                        FormInfo.close();
                        markerInfo.close();

                        markerInfo.setContent(
                            "<strong>" + this.userMapDatas[i]['description'] + "</strong><br>"                        
                        );

                        markerInfo.open({
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

        closeModal() {                
            this.modalBool = false;
        },
    }
}
</script>