import {
    createRouter,
    createWebHashHistory,
    RouteRecordRaw
} from "vue-router";
import editCssVue from "../view/editCss.vue";
import bookReaderVue from '../view/bookReader.vue'
import settingVue from "../view/setting.vue";
const routes: Array<RouteRecordRaw> = [{
    path: '/',
    component: bookReaderVue
}, {
    path: '/editCss',
    component: editCssVue
},
{
    path: '/setting',
    component: settingVue
}
]
const router = createRouter({
    routes,
    history: createWebHashHistory()
})

export default router