<template>
    <div class="main">
        <div class="cover">
            <div class="bookCover" :style="{
                backgroundImage: 'url(' + bookCover + ')'
            }">
            </div>
        </div>
        <div class="info" @click="read">
            继续阅读
        </div>
    </div>

</template>
<script setup lang="ts">
import { bookdataStore } from '../pinia/index'
import { ref, onMounted } from 'vue';
import router from '../router/index';

const bdstore = bookdataStore()
const bookCover = ref('')

const read = ()=>{
    router.push('/bookReader')
}

onMounted(() => {
    let u = new URL((bdstore.cover) as string).toString()
    bookCover.value = u
})
</script>
<style scoped>
.main {
    display: flex;
}

.bookCover {
    background-size: cover;
    height: 450px;
    width: 300px;
}
</style>