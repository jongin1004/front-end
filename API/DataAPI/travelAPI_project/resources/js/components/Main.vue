<template>    

    <div class="wrapper" v-if="categoryState === 'main'">
        <div v-for="(menu, i) in menus" :key="i" @click="changeCategory(menu)">
            {{ menu }}
        </div>
    </div>        
    <Covid v-else-if="categoryState === '코로나소식'"/>

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
.wrapper {
    display: flex;
    flex-grow: 1;
    flex-wrap: wrap;
    justify-content: center;
    /* align-items: center; */
    /* height: 100%; */
}

.wrapper > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 270px;
    height: 150px;
    border: 1px solid #000;
    border-radius: 4px;
    margin: 4px;
}

.wrapper > div:hover {
    color: white;
    background-color: #0093c4;
}

@media screen and (max-width: 768px) {
    .wrapper > div {
        width: 200px;
        height: 75px;
    }
}

@media screen and (max-width: 520px) {
    .wrapper > div {
        width: 100px;
        height: 50px;
    }
}
</style>