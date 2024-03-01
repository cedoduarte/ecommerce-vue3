<template>
    <Navbar 
        @shopping-cart-clicked="goShoppingCartPage" 
        @stock-clicked="goStockPage"
        @profile-clicked="goProfilePage" 
        @setting-clicked="goSettingPage"
        @signout-clicked="signout" />
    <router-view />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user";
import Navbar from "../components/Navbar.vue";

const userStore = useUserStore();
const router = useRouter();

onMounted(() => {
    userStore.loadFromLocalStorage();
    router.push("poster");
});

const goShoppingCartPage = () => {
    router.push("shopping-cart");
}

const goStockPage = () => {
    router.push("stock");
}

const goProfilePage = () => {
    router.push("profile");
}

const goSettingPage = () => {
    router.push("setting");
}

const signout = () => {
    userStore.setState(false, null);
    router.push("/login");
}
</script>