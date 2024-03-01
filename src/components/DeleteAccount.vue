<template>
    <v-form :class="{ 'delete-account-form-left-30vw': !drawerStore.visible, 'delete-account-form-left-21vw': drawerStore.visible }">
        <h3 class="delete-account-title">Delete account</h3>
        <v-text-field 
            variant="outlined" 
            v-model="deleteAccount.usernameOrEmail"
            placeholder="Username or email" />
        <PasswordTextField 
            placeholder="Current password" 
            @password-changed="currentPasswordChanged" />
        <PasswordTextField 
            placeholder="Confirmed password" 
            @password-changed="confirmedPasswordChanged"/>
        <v-btn 
            class="delete-account-delete-button"
            @click="deleteClicked"
            flat>
            <i class="material-symbols-outlined">person_remove</i>Delete
        </v-btn>
    </v-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user";
import { useDrawerStore } from "../store/drawer";
import { useToast } from "vue-toastification";
import { IDeleteAccountDto } from "../shared/interfaces";
import { URL_ACCOUNT_DELETE, AUTHORIZATION_TOKEN } from "../shared/constants";
import PasswordTextField from "./PasswordTextField.vue";

const router = useRouter();
const toast = useToast();
const userStore = useUserStore();
const drawerStore = useDrawerStore();

const deleteAccount = ref<IDeleteAccountDto>({
    usernameOrEmail: "",
    currentPassword: "",
    confirmedPassword: ""
});

const currentPasswordChanged = (password: string) => {
    deleteAccount.value.currentPassword = password;
}

const confirmedPasswordChanged = (password: string) => {
    deleteAccount.value.confirmedPassword = password;
}

const fetchUpdate = async () => {
    await fetch(URL_ACCOUNT_DELETE, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": AUTHORIZATION_TOKEN
        },
        body: JSON.stringify(deleteAccount.value)
    }).then(response => {
        if (!response.ok) {
            return response.text().then(errorText => {
                throw new Error(errorText);
            });
        }
        return response.json();
    }).then(data => {
        toast.info("Your account has beed deleted successfully!");
        userStore.setState(false, null);
        router.push("/login");
    }).catch(error => {
        toast.error(error.message.substring(18, error.message.indexOf("!") + 1));
    });
}

const deleteClicked = async () => {
    await fetchUpdate();
}
</script>

<style scoped>
.delete-account-form-left-30vw {
    margin-left: 10px;
    margin-right: 10px;
    width: 500px;
    position: relative;
    left: 30vw;
}

.delete-account-form-left-21vw {
    margin-left: 10px;
    margin-right: 10px;
    width: 500px;
    position: relative;
    left: 21vw;
}

.delete-account-title {
    margin-top: 10px;
    margin-bottom: 10px;
}

.delete-account-delete-button {
    position: relative;
    left: 12rem;
}
</style>