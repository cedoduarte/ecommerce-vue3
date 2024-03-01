<template>
    <v-app-bar app dark flat dense>
        <v-app-bar-nav-icon @click="toggleDrawer">
            <i class="material-symbols-outlined">menu</i>
        </v-app-bar-nav-icon>
        <v-toolbar-title>ECOMMERCE</v-toolbar-title>
        <v-spacer />
        <v-btn @click="shoppingCartClick" flat>
            <i class="material-symbols-outlined">shopping_cart</i>
        </v-btn>
    </v-app-bar>

    <v-navigation-drawer :width="300" v-if="drawerStore.visible">
        <v-list-item title="Navigation 🖥️" :subtitle="userStore.user?.username"></v-list-item>
        <v-divider></v-divider>
        <v-list-item link title="🛒 Stock" @click="stockClick"></v-list-item>
        <v-list-item link title="🙍‍♀️ Profile" @click="profileClick"></v-list-item>
        <v-list-item link title="🎚️ Settings" @click="settingClick"></v-list-item>
        <v-list-item link title="❌ Sign Out" @click="signoutClick"></v-list-item>
    </v-navigation-drawer>
</template>
  
<script setup lang="ts">
import { defineEmits } from "vue";
import { useUserStore } from "../store/user";
import { useDrawerStore } from "../store/drawer";

const emits = defineEmits([
    "shoppingCartClicked", 
    "stockClicked", 
    "profileClicked", 
    "settingClicked",
    "signoutClicked"
]);

const userStore = useUserStore();
const drawerStore = useDrawerStore();

const toggleDrawer = () => {
    drawerStore.setState(!drawerStore.visible);
}

const shoppingCartClick = () => {
    emits("shoppingCartClicked");
}

const stockClick = () => {
    emits("stockClicked");
}

const profileClick = () => {
    emits("profileClicked");
}

const settingClick = () => {
    emits("settingClicked");
}

const signoutClick = () => {
    emits("signoutClicked");
}
</script>
  
<style scoped></style>