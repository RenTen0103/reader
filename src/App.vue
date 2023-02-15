
<template>
  <div>
    <router-view />
  </div>

</template>
<script setup lang="ts">
import { ipcRenderer } from 'electron';
import { onMounted } from 'vue';
import { configLoad } from './utils/configLoader';
import store from 'electron-store';

onMounted(() => {

  const Store = new store()
  if (!Store.get('first')) {
    Store.clear()
    Store.set('first', true)
  }


  configLoad()
  ipcRenderer.send('ready')
  window.addEventListener('contextmenu', (e) => {
    ipcRenderer.send('contextMenu')
  })

  // router.push('/bookShowCase')


})
</script>