<template>
    <div class="text">
        <textarea name="1" v-model="v" spellcheck="false"></textarea>
    </div>

</template>

<script setup lang="ts">
import store from 'electron-store'
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { reloadCss } from '../utils/configLoader';
const s = new store()
const v = ref('')
onMounted(() => {
    v.value = <string>s.get("css")
})
onBeforeUnmount(() => {
    s.set('css', v.value)
    reloadCss(v.value)
})
</script>

<style >
@font-face {
    font-family: jb;
    src: url('../assets/font/JetBrainsMonoNL-Light.ttf');
}

textarea {
    width: 100%;
    height: 100%;
    border: 0;
    font-family: jb;
    outline: white;
}
.text{
    overflow: hidden;
    height: 100vh;
}

body::-webkit-scrollbar {
    display: none;
}

</style>