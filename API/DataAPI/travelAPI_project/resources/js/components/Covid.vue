<template>
    <!-- modal -->
    <div class="modal" v-bind:class="{ active : modalBool }" @click="closeModal">
        <div class="modal_content">
            <div v-html="detailContent"></div>
            <!-- <div class="close"><i class="fas fa-times" id="close"></i></div> -->
        </div>
    </div>

    <div class="content">
        <div class="search">
            <input class="searchText" type="text" name="search" @keyup.enter="getData(search.trim())" v-model="search">
            <i class="fas fa-search"></i>
        </div>

        <div class="list">            
            <div                
                v-for="(news, i) in data" 
                :key="i" 
                @click="showDetail(i)"
            >                
                {{ news.title }}
            </div>                                  
        </div>        
    </div>
</template>

<script>
export default {
    data() {
        return {
            search: '',
            iso_code: '',
            data: '',
            modalBool: false,
            detailContent: '',
            countries: '',            

        }
    },

    created() {
        axios.get('api/getCountry').then(res => {
            this.countries = res.data.countries;            
        })
    },

    methods: {
        getData(search) {
            this.data = '';
            for (let i = 0; i < this.countries.length; i++) {
                if (this.countries[i]["country_han"] === this.search) {
                    this.iso_code = this.countries[i]["iso_code_two"];
                }
            }            
            let url = `http://apis.data.go.kr/1262000/CountryCovid19SafetyServiceNew/getCountrySafetyNewsListNew?serviceKey=Sy%2FB8TPlVdYC0q7iMLyImE7PjeUf01J9DOja4msnx3nAJzqa72ZOCVKE8VQGrpqh6zT7bQs4lJxkBD2xjCMxvQ%3D%3D&returnType=JSON&numOfRows=10&pageNo=1&cond[country_nm::EQ]=${search}&cond[country_iso_alp2::EQ]=${this.iso_code}`

            fetch(url)
            .then(res => res.json())
            .then(myJson => {
                if ( myJson.data.length > 0 ) {
                    this.data = myJson.data;
                } else {
                    alert("죄송합니다. 해당 국가에 대한 정본는 확인되지 않습니다.");
                }             
            });
            
            this.search = '';
        },

        showDetail(idx) {
            this.detailContent = this.data[idx]["html_origin_cn"];
            this.modalBool = true;
        },

        closeModal() {                
            this.modalBool = false;
        }
    }
}
</script>

<style>
.content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    height: 70%;
}

.content .search {
    flex-basis: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.content .searchText{
    width: 100%;
    border-radius: 4px;
    font-size: 12px;
    padding-left: 20px;
}

.content i {
    position: absolute;
    left: 4px;
    font-size: 8px;
}

.content .list {
    flex-basis: 70%;
    border: 1px solid #000;
    border-radius: 4px; 
    padding: 4px;
    background-color: #b6ffff;
}

.content .list > div {
    border-bottom: 1px solid #000;    
    margin-bottom: 4px;
    padding: 8px;
    font-size: 8px;
}


.content .list > div:hover {
    color: white;
    background-color: #0093c4;
}

/* modal */
.modal {    
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: -1;    
    opacity: 0;
    transition: all .5s;
}

.modal.active {
    opacity: 1;
    z-index: 30;
}

.modal_content {    
    display: flex;
    padding: 5vw;
    width: 85%; 
    height: 90%;
    border-radius: 1vw;
    overflow-y: auto;    
    background-color: #4b636e;
    color: #a7c0cd;
    border: 3px solid #a7c0cd;
}

.modal i {    
    color: rgba(0, 0, 0, 0.6);    
    transition: all .5s;
    margin: 0 8px;
}

.modal i:hover {
    color: rgb(0, 0, 0);
    transform: scale(1.5);
}

</style>