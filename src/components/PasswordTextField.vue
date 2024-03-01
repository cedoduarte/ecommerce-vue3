<template>
    <v-text-field 
        :rules="passwordRules"
        variant="outlined" 
        :placeholder="placeholder" 
        v-model="password"
        :type="showPassword ? 'text' : 'password'" 
        @keydown.enter="enterKeyPressed">
        <v-btn 
            class="password-text-field-eye-button" 
            flat 
            @click="togglePasswordVisibility">
            <i v-if="showPassword" class="material-symbols-outlined">visibility_off</i>
            <i v-else class="material-symbols-outlined">visibility</i>
        </v-btn>
    </v-text-field>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits, defineProps } from "vue";
import { passwordRules } from "../shared/rules";

const props = defineProps(["placeholder"]);
const emits = defineEmits(["passwordChanged", "enterKeyPressed"]);
const password = ref<string>("");
const showPassword = ref<boolean>(false);

watch(password, (newValue: string, oldValue: string) => {
    emits("passwordChanged", newValue);
});

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
}

const enterKeyPressed = () => {
    emits("enterKeyPressed");
}
</script>

<style scoped>
.password-text-field-eye-button {
    height: 24px;
}
</style>