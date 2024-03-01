<template>
    <v-text-field 
        variant="outlined" 
        placeholder="Search" 
        v-model="searchText"
        @keydown.enter="buttonClicked">
        <v-btn 
            class="search-text-field-search-button"
            flat
            @click="buttonClicked">
            <i class="material-symbols-outlined">search</i>
        </v-btn>
    </v-text-field>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";

const emits = defineEmits(["searchClicked"]);
const searchText = ref<string>("");

const buttonClicked = () => {
    emits("searchClicked", searchText.value);
}
</script>

<style scoped>
</style>