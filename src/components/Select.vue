<template>
    <v-select
        class="select-outlined"
        :items="items"
        v-model="selectedValue"
        density="default" 
        :label="label">
    </v-select>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from "vue";

const props = defineProps(["items", "label", "currentItem"]);
const emits = defineEmits(["currentItemChanged"]);
const selectedValue = ref<string>(props.currentItem);

watch(selectedValue, (newValue: string, oldValue: string) => {
    emits("currentItemChanged", newValue);
});
</script>

<style scoped>
.select-outlined {
    border: 1px solid #ccc;
    border-radius: 4px;
    height: 57.5px;
}
</style>