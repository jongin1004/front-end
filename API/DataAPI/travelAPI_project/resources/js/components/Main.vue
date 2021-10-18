<template>    
    <div class="wrapper" v-if="categoryState === 'main'">
        <div v-for="(menu, i) in menus" :key="i" @click="changeCategory(menu)">
            {{ menu }}
        </div>
    </div>    
    <!-- 코로나 소식 -->
    <Covid v-else-if="categoryState === '코로나소식'"/>
    <!-- 해외입국자 조치현황 -->
    <StatusOfEntry v-else-if="categoryState === '해외입국자 조치현황'" />
    <!-- 구글 API -->
    <Map v-else-if="categoryState === '지도'" />
    <!-- 날씨 API -->
    <Weather v-else-if="categoryState === '날씨'" />
</template>

<script>
import Covid from './Covid.vue'
import StatusOfEntry from './StatusOfEntry.vue'
import Map from './Map.vue'
import Weather from './Weather.vue'

export default {
    components: {
        Covid,
        StatusOfEntry,
        Map,
        Weather,
    },

    data() {
        // const happyNewYear = new Date(); 
        // const year = happyNewYear.getFullYear(); 
        // const month = happyNewYear.getMonth() + 1;
        // const date = happyNewYear.getDate(); 
        // const weatherDate = `${year}-${month >= 10 ? month : '0' + month}-${date >= 10 ? date : '0' + date}`;

        return {
            menus: [
                "공지사항",
                "코로나소식",
                "날씨",
                "해외입국자 조치현황",
                "지도",
                "입국허가"
            ],
            categoryState: 'main',

            date: new Date("YYYY-MM-DD"),
        }
    },

    methods: {
        changeCategory(category) {
            this.categoryState = category;
        }
    }
}
</script>

<style>
@import '../../css/app.css';
</style>