import {
    createRouter,
    createWebHashHistory,
    RouteRecordRaw
} from "vue-router";
import editCssVue from "../view/editCss.vue";
import bookReaderVue from '../view/bookReader.vue'
import settingVue from "../view/setting.vue";
import bookShowCaseVue from '../view/bookShowCase.vue'
import bookviewVue from "../view/bookview.vue";

const routes: Array<RouteRecordRaw> = [{
    path: '/bookReader',
    component: bookReaderVue
}, {
    path: '/editCss',
    component: editCssVue
},
{
    path: '/setting',
    component: settingVue
}, {
    path: "/",
    component: bookShowCaseVue
}, {
    path: '/bookView',
    component: bookviewVue
}
]
const router = createRouter({
    routes,
    history: createWebHashHistory()
})

export default router