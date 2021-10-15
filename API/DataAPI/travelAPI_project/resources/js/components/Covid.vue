<template>
    <!-- modal -->
    <div class="modal" v-bind:class="{ active : modalBool }" @click="closeModal">
        <div class="modal_content">
            <div v-html="detailContent"></div>
            <!-- <div class="close"><i class="fas fa-times" id="close"></i></div> -->
        </div>
    </div>

    <div class="content">
        <div>코로나 소식</div>
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
        axios.get('api/allCountry').then(res => {
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
