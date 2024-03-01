import { createApp } from "vue";
import App from "./App.vue";
import { RouterOptions, createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vue-toastification/dist/index.css";
import Toast from "vue-toastification";

const routerOptions: RouterOptions = {
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: () => import("./pages/Home.vue"),
            children: [
                {
                    path: "poster",
                    component: () => import("./pages/Poster.vue")
                },
                {
                    path: "shopping-cart",
                    component: () => import("./pages/ShoppingCart.vue")
                },
                {
                    path: "stock",
                    component: () => import("./pages/Stock.vue")
                },
                {
                    path: "profile",
                    component: () => import("./pages/Profile.vue")
                },
                {
                    path: "setting",
                    component: () => import("./pages/Setting.vue")
                }
            ]
        },
        {
            path: "/login",
            component: () => import("./pages/Login.vue")
        }
    ]
};

const router = createRouter(routerOptions);

router.beforeEach((to, from) => {
    if (to.path === "/login") {
        return true;
    }
    const loggedinString: string | null = localStorage.getItem("loggedin");
    if (loggedinString) {
        const isLoggedin: boolean = JSON.parse(loggedinString);
        if (isLoggedin) {
            return true;
        }
    }
    return "/login";
});

const pinia = createPinia();

const vuetify = createVuetify({
    components,
    directives
});

createApp(App)
    .use(router)
    .use(pinia)
    .use(Toast)
    .use(vuetify)
    .mount("#app");