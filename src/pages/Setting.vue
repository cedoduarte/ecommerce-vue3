<template>
    <ChangePassword />
    <v-divider></v-divider>
    <DeleteAccount />
</template>

<script setup lang="ts">
import ChangePassword from "../components/ChangePassword.vue";
import DeleteAccount from "../components/DeleteAccount.vue";
import { onMounted } from "vue";
import { useUserStore } from "../store/user";

const userStore = useUserStore();

onMounted(() => {
    userStore.loadFromLocalStorage();
});
</script>