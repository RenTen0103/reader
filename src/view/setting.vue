<template>
    <div class="setting">
        <div class="button-paging">
            <div class="button-paging-text">
                分页模式
            </div>
            <div class="button-paging-btn"
                :class="PagingBTNisChecked ? 'button-paging-btn-checked' : 'button-paging-btn-unchecked'"
                @click="PagingBTNisChecked = !PagingBTNisChecked">
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import store from 'electron-store'

const PagingBTNisChecked = ref(false)

const Store = new store()

watch(PagingBTNisChecked, (n, o) => {
    Store.set('isPage', n)
})

onMounted(() => {
    let ip = <boolean>Store.get('isPage')
    PagingBTNisChecked.value = ip ? ip : false
})

</script>

<style>
.setting {
    width: 96vw;
    margin-left: 2vw;
    margin-top: 10px;
    user-select: none;
}

.button-paging {
    display: flex;
    width: 100%;
}

.button-paging-btn {
    height: 20px;
    width: 20px;
    margin-left: 12px;
    border-radius: 12px;
    border: 2px solid black;
}

.button-paging-btn-checked {
    background-color: rgb(107, 107, 167);
}

.button-paging-btn-unchecked {
    background-color: rgb(255, 255, 255);
}
</style>