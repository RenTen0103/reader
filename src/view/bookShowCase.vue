<template>
    <div class="showCaseMain" id="drag_test">
        <div class="showCase">
            <div v-for="i in list">
                <book :md5="i"></book>
            </div>
            <div class="addnewbook">
                拖拽书籍到此处以添加
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ipcRenderer } from 'electron';
import path from 'path';
import book from '../components/book.vue';
import { getCurrentInstance, onMounted, Ref, ref } from 'vue';
import { bookdataStore } from '../pinia'
import store from 'electron-store';

const list: Ref<Array<string>> = ref([])

const viewer = ref(null)

const tosc = ref(true)

const images = ref(['https://kbimages1-a.akamaihd.net/38f769f0-a6f3-4361-8d7e-1b08cebe3867/353/569/90/False/bdBqg5F3ajO_Eua_p433vg.jpg'])

onMounted(() => {
    const eStore = new store()
    const bdstore = bookdataStore()

    // eStore.clear()
    bdstore.$reset()
    // console.log();




    for (const key in eStore.store) {
        if (Object.prototype.hasOwnProperty.call(eStore.store, key)) {
            if (key != "booklist" && key != "css" && key != "isPage" && key != 'first') {
                const element = eStore.store[key];
                console.log(key);
                console.log(element);
                list.value.push(key)
            }
        }
    }


    // bdstore.clrear()
    // list.value = <Array<string>>eStore.get('booklist')

    // console.log(list.value);

    ipcRenderer.on("finish", () => {
        let nl = []
        for (const key in eStore.store) {
            if (Object.prototype.hasOwnProperty.call(eStore.store, key)) {
                if (key != "booklist" && key != "css" && key != "isPage" && key != 'first') {
                    const element = eStore.store[key];
                    console.log(key);
                    console.log(element);
                    nl.push(key)
                }
            }
        }
        list.value = nl
    })

    const dragWrapper = document.getElementById("drag_test");
    if (dragWrapper != null) {
        dragWrapper.addEventListener("drop", (e) => {
            e.preventDefault();
            const files = e.dataTransfer?.files;

            if (files && files.length > 0) {
                bdstore.title = path.basename(files[0].name, '.epub')
                const p = files[0].path;
                console.log('path:', p);
                ipcRenderer.send('filePath', p)
            }
        })

        dragWrapper.addEventListener("dragover", (e) => {
            e.preventDefault();
        })
    }
})


</script>
<style>
.showCaseMain {
    min-height: 400px;
    width: 96%;
    margin-left: 2%;
}

.showCase {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(135px, 1fr));
    gap: 10px;
}

.addnewbook {
    width: 130px;
    height: 180px;
    border: 1px solid black;
    line-height: 32px;
    text-align: center;
}
</style>