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
            <input class="searchText" type="text" name="search" @keyup.enter="getData(search.trim())" v-model="search" placeholder="국가이름을 검색해보세요.">
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
        <div>
            <pagination :page-info="pageInfo" @page-number="getPageNumber"/>            
        </div>   
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

        }
    },

    created() {
        // axios.get('api/getCountry').then(res => {
        //     this.countries = res.data.countries;            
        // })

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

        getData(search) {
            this.data = '';                 
            
            

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

        showDetail(country_name, iso_code) {
            let url = `https://cors-anywhere.herokuapp.com/http://apis.data.go.kr/1262000/CountryOverseasArrivalsService/getCountryOverseasArrivalsList?serviceKey=Sy%2FB8TPlVdYC0q7iMLyImE7PjeUf01J9DOja4msnx3nAJzqa72ZOCVKE8VQGrpqh6zT7bQs4lJxkBD2xjCMxvQ%3D%3D&returnType=JSON&numOfRows=10&pageNo=1&cond[country_nm::EQ]=${country_name}&cond[country_iso_alp2::EQ]=${iso_code}`

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

<style>
.content {    
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    height: 100%;
}

.content .search {
    flex-basis: 20%;
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
    flex-basis: 60%;
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