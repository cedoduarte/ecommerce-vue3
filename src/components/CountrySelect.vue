<template>
    <Select 
        :items="countryList" 
        label="Country" 
        :current-item="currentItem"
        @current-item-changed="countryChanged" />    
</template>

<script setup lang="ts">
import Select from "./Select.vue";
import { ref, defineEmits, defineProps } from "vue";
import { countryList } from "../shared/constants";

const emits = defineEmits(["countrySelected"]);
const props = defineProps(["currentCountry"]);
const currentItem = ref<string>(props.currentCountry);

const countryChanged = (country: string) => {
    emits("countrySelected", country);
}
</script>