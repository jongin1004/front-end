<template>
    <!-- modal -->
    <div class="modal" v-bind:class="{ active : modalBool }" @click="closeModal">
        <div class="modal_content">
            <div v-html="detailContent"></div>
            <!-- <div class="close"><i class="fas fa-times" id="close"></i></div> -->
        </div>
    </div>

    <div class="content">
        <div>해외입국자 조치현황</div>
        <div class="search">
            <input class="searchText" type="text" name="search" @keyup.enter="searchCountry(search)" v-model="search" placeholder="국가이름을 검색해보세요.">
            <i class="fas fa-search"></i>
        </div>

        <div class="list">            
            <div                
                v-for="(country, i) in countries" 
                :key="i" 
                @click="showDetail(country.country_han, country.iso_code_two)"
            >                
                {{ country.country_han }}
            </div>                                  
        </div>   

        <!-- Paginate -->        
        <pagination :page-info="pageInfo" @page-number="getPageNumber"/>                
    </div>
</template>

<script>
import pagination from './pagination';


export default {
    components: {
        pagination,
    },

    data() {        
        return {
            search: '',
            iso_code: '',
            data: '',
            modalBool: false,
            detailContent: '',
            countries: '',            
            pageInfo: '',
            countryAll: '',  //search할 때, 필요한 country의 모든 데이터를 담기 위함   
        }
    },

    created() {                        
        axios.get('api/allCountry').then(res => {            
            this.countryAll = res.data.countries;            
        });

        this.getCountry();        
    },

    methods: {
        //모든 data를 가져올 때 기반이되는 함수 
        getCountry(pageNum = 1) {
            axios.get('api/getCountry?page='+ pageNum)
            .then(res => {                       
                this.pageInfo = res.data.countries;
                this.countries = res.data.countries.data;                
            });
        },

        searchCountry(search) {
            this.countries = [];
            for (let i = 0; i < this.countryAll.length; i++) {
                if (this.countryAll[i].country_han === search) {
                    this.countries.push(this.countryAll[i]); 
                }
            }

            this.search = '';
        },

        showDetail(country_name, iso_code) {
            let url = `http://apis.data.go.kr/1262000/CountryOverseasArrivalsService/getCountryOverseasArrivalsList?serviceKey=Sy%2FB8TPlVdYC0q7iMLyImE7PjeUf01J9DOja4msnx3nAJzqa72ZOCVKE8VQGrpqh6zT7bQs4lJxkBD2xjCMxvQ%3D%3D&returnType=JSON&numOfRows=10&pageNo=1&cond[country_nm::EQ]=${country_name}&cond[country_iso_alp2::EQ]=${iso_code}`

            fetch(url)
            .then(res => res.json())
            .then(myJson => {                                
                if ( myJson.data.length > 0 ) {                    
                    this.detailContent = myJson.data[0].txt_origin_cn;
                    this.modalBool = true;
                } else {
                    alert("죄송합니다. 해당 국가에 대한 정본는 확인되지 않습니다.");
                }             
            });                        
        },

        closeModal() {                
            this.modalBool = false;
        },

        // paginate components에서 emit을 통해 실행된느 함수
        // currentPage number을 받아와서 해당 페이지에 맞는 data를 가져오도록 
        getPageNumber(pageNum) {
            this.getCountry(pageNum);
        },
    }
}
</script>
