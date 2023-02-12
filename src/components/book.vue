<template>
    <div class="bookMain" @click="read">
        <div class="bookCover" :style="{
            backgroundImage: 'url(' + bookCover + ')'
        }">

        </div>

        <div class="bookTitle">
            {{ title }}
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import store from 'electron-store';
import { bookdataStore } from '../pinia/index';
import { ipcRenderer } from 'electron';
import router from '../router/index';
const estore = new store()
type prop = {
    md5: string
}

const props = defineProps<prop>()

const bookCover = ref('https://kbimages1-a.akamaihd.net/38f769f0-a6f3-4361-8d7e-1b08cebe3867/353/569/90/False/bdBqg5F3ajO_Eua_p433vg.jpg')

const title = ref('测试标题')

const read = () => {
    const bdstore = bookdataStore()
    bdstore.$state = (estore.get(props.md5) as any)
    // console.log(bdstore.$state);
    router.push('/bookReader')
}

onMounted(() => {

    const bookInfo = estore.get(props.md5)
    console.log(bookInfo);
    let u = new URL(((bookInfo as any).cover) as string)
    console.log(bookCover.value = u.href);
    title.value = (bookInfo as any).title
})

</script>
<style>
.bookMain {
    width: 130px;
    height: 250px;
    box-sizing: border-box;
}

.bookCover {
    background-size: cover;
    height: 180px;
    width: 100%;
}

.bookTitle {
    text-align: center;
}
</style>

