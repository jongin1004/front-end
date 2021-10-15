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
</template>

<script>
import Covid from './Covid.vue'
import StatusOfEntry from './StatusOfEntry.vue'

export default {
    components: {
        Covid,
        StatusOfEntry,
    },

    data() {
        return {
            menus: [
                "공지사항",
                "코로나소식",
                "날씨",
                "해외입국자 조치현황",
                "여행경보",
                "입국허가"
            ],
            categoryState: 'main',
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