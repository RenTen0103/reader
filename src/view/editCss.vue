<template>
    <textarea name="1" v-model="v"></textarea>
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

<style>
textarea {
    width: 100vw;
    height: 100vh;
    border: 0;
}
</style>