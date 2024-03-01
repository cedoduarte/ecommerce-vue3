<template>
    <v-form class="login-form">
        <div class="login-title">
            <h2>
                <i class="material-symbols-outlined">
                    shoppingmode
                </i>ECOMMERCE
            </h2>
            <h3>Sign In</h3>
            <i class="material-symbols-outlined">tv_signin</i>
        </div>
        <v-text-field 
            :rules="usernameRules"
            variant="outlined" 
            placeholder="Username" 
            v-model="signinDto.usernameOrEmail"
            @keydown.enter="enterKeyPressed" />
        <PasswordTextField 
            placeholder="Password"
            @password-changed="passwordChanged" 
            @enter-key-pressed="enterKeyPressed" />
        <v-btn 
            class="login-signin-button" 
            @click="signinClicked" 
            flat>
            <i class="material-symbols-outlined">
                login
            </i>Sign in
        </v-btn>
    </v-form>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { ISigninUserDto } from "../shared/interfaces";
import { URL_USER_SIGNIN, AUTHORIZATION_TOKEN } from "../shared/constants";
import { useUserStore } from "../store/user";
import PasswordTextField from "../components/PasswordTextField.vue";
import { usernameRules } from "../shared/rules";

const userStore = useUserStore();
const router = useRouter();
const toast = useToast();

const signinDto = ref<ISigninUserDto>({
    usernameOrEmail: "",
    password: ""
});

onMounted(() => {
    userStore.loadFromLocalStorage();
    signinDto.value.usernameOrEmail = userStore.user?.username ?? "";
});

const fetchSignin = async () => {
    await fetch(URL_USER_SIGNIN, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": AUTHORIZATION_TOKEN
        },
        body: JSON.stringify(signinDto.value)
    }).then(response => {
        if (!response.ok) {
            return response.text().then(errorText => {
                throw new Error(errorText);
            });
        }
        return response.json();
    }).then(data => {
        userStore.setState(true, data);
        toast.info(`Welcome ${data.firstName} ${data.lastName}`);
        router.push("/");
    }).catch(error => {
        toast.error(error.message.substring(18, error.message.indexOf("!") + 1));
    });
}

const enterKeyPressed = async () => {
    await fetchSignin();
}

const signinClicked = async () => {
    await fetchSignin();
}

const passwordChanged = (password: string) => {
    signinDto.value.password = password;
}
</script>

<style scoped>
.login-title {
    position: relative;
    text-align: center;
    margin-bottom: 10px;
}

.login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    transform: translate(-50%, -50%);
}

.login-signin-button {
    position: relative;
    left: 6.5rem;
}
</style>