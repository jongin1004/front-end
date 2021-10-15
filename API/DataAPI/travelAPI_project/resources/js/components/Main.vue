<template>
    <div class="wrapper">
        <div v-for="(menu, i) in menus" :key="i" @click="test(menu)">
            {{ menu }}
        </div>
    </div>
</template>

<script>
export default {
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
        }
    },

    methods: {
        test(text) {
            console.log(text);
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