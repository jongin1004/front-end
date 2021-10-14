<template>
    <div class="black-bg" v-if="bool">
        <div class="white-bg">
            <div v-html="detailContent">
            </div>        
        </div>
    </div>

    <div class="content">
        <div class="search">
            <input type="text" name="search" @keyup.enter="getData(search)" v-model="search">
        </div>

        <div class="list" >
            <div v-for="(news, i) in data" :key="i" @click="showDetail(i)">
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
            data: '',
            bool: false,
            detailContent: '',
        }
    },

    methods: {
        getData(search) {
            // data = "";
            let url = `http://apis.data.go.kr/1262000/CountryCovid19SafetyServiceNew/getCountrySafetyNewsListNew?serviceKey=Sy%2FB8TPlVdYC0q7iMLyImE7PjeUf01J9DOja4msnx3nAJzqa72ZOCVKE8VQGrpqh6zT7bQs4lJxkBD2xjCMxvQ%3D%3D&returnType=JSON&numOfRows=10&pageNo=1&cond[country_nm::EQ]=${search}&cond[country_iso_alp2::EQ]=US`

            fetch(url)
            .then(res => res.json())
            .then(myJson => {
                this.data = myJson.data;
                console.log(myJson);
            }); 
        },

        showDetail(idx) {
            this.detailContent = this.data[idx]["html_origin_cn"];
            this.bool = true;
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
}
.content input {
    width: 70%;
    border-radius: 4px;
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
    /* border-radius: 4px; */
    margin-bottom: 4px;
    padding: 8px;
    /* background-color: #4fc3f7; */
}


.content .list > div:hover {
    color: white;
    background-color: #0093c4;
}

.black-bg {
    width: 100%; height: 100%;
    background: rgba(57, 17, 90, 0.5); 
    position: fixed; padding: 20px;
}
.white-bg {
    width: 80%; background: white;
    border-radius: 8px;
    padding: 20px;
    position: absolute;
    top: 35%;
    left: 50%;        
    transform: translate(-50%, -50%)
}
</style>