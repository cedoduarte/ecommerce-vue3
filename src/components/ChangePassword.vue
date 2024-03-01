<template>
    <v-form :class="{ 'change-password-form-left-30vw': !drawerStore.visible, 'change-password-form-left-21vw': drawerStore.visible }">
        <h3 class="change-password-title">Change password</h3>
        <PasswordTextField 
            placeholder="Current password" 
            @password-changed="currentPasswordChanged" />
        <PasswordTextField 
            placeholder="New password" 
            @password-changed="newPasswordChanged" />
        <PasswordTextField 
            placeholder="Confirmed password" 
            @password-changed="confirmedPasswordChanged" />
        <v-btn 
            class="change-password-save-button" 
            @click="saveClicked" 
            flat>
            <i class="material-symbols-outlined">save</i>Save
        </v-btn>
    </v-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { useDrawerStore } from "../store/drawer";
import { useUserStore } from "../store/user";
import { IChangePasswordDto } from "../shared/interfaces";
import { URL_USER_CHANGE_PASSWORD, AUTHORIZATION_TOKEN } from "../shared/constants";
import PasswordTextField from "./PasswordTextField.vue";

const toast = useToast();
const drawerStore = useDrawerStore();
const userStore = useUserStore();

const changePasswordDto = ref<IChangePasswordDto>({
    usernameOrEmail: userStore.user?.username ?? "",
    oldPassword: "",
    newPassword: "",
    confirmedPassword: ""
});

const currentPasswordChanged = (password: string) => {
    changePasswordDto.value.oldPassword = password;
}

const newPasswordChanged = (password: string) => {
    changePasswordDto.value.newPassword = password;
}

const confirmedPasswordChanged = (password: string) => {
    changePasswordDto.value.confirmedPassword = password;
}

const fetchUpdate = async () => {
    await fetch(URL_USER_CHANGE_PASSWORD, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": AUTHORIZATION_TOKEN
        },
        body: JSON.stringify(changePasswordDto.value)
    }).then(response => {
        if (!response.ok) {
            return response.text().then(errorText => {
                throw new Error(errorText);
            });
        }
        return response.json();
    }).then(data => {
        toast.info("Password changed successfully!");
    }).catch(error => {
        toast.error(error.message.substring(18, error.message.indexOf("!") + 1));
    });
}

const saveClicked = async () => {
    await fetchUpdate();
}
</script>

<style scoped>
.change-password-form-left-30vw {
    margin-left: 10px;
    margin-right: 10px;
    width: 500px;
    position: relative;
    left: 30vw;
}

.change-password-form-left-21vw {
    margin-left: 10px;
    margin-right: 10px;
    width: 500px;
    position: relative;
    left: 21vw;
}

.change-password-title {
    margin-bottom: 10px;
}

.change-password-save-button {
    position: relative;
    left: 12rem;
}
</style>