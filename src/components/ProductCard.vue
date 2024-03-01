<template>
    <v-card class="mx-auto" max-width="344">
        <v-img height="200px" :src="imagehref" cover></v-img>

        <v-card-title>
            {{ name }}
        </v-card-title>

        <v-card-subtitle>
            <span>Price {{ formatAsCurrency(price) }}</span><br />
            <span>Stock {{ stock }}</span>            
        </v-card-subtitle>
        <v-card-actions>
            <v-btn @click="addToShoppingCartClicked" flat>
                <i class="material-symbols-outlined">shopping_cart</i>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="showDescriptionClicked">
                <i class="material-symbols-outlined">feed</i>
            </v-btn>
        </v-card-actions>
        <v-expand-transition>
            <div v-show="show">
                <v-divider></v-divider>
                <v-card-text>
                    {{ description }}
                </v-card-text>
            </div>
        </v-expand-transition>
    </v-card>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";
import { formatAsCurrency } from "../shared/utils";
import { useShoppingCartStore } from "../store/shoppingCart";
import { useToast } from "vue-toastification";

const props = defineProps([
    "id",
    "name",
    "description",
    "price",
    "stock",
    "imagehref",
    "lastModified",
    "createdDate",
    "isDeleted"
]);

const toast = useToast();
const shoppingCartStore = useShoppingCartStore();
const show = ref<boolean>(false);

const showDescriptionClicked = () => {
    show.value = !show.value;
}

const addToShoppingCartClicked = () => {
    shoppingCartStore.appendProduct({
        id: props.id,
        name: props.name,
        description: props.description,
        price: props.price,
        stock: props.stock,
        imagehref: props.imagehref,
        lastModified: props.lastModified,
        createdDate: props.createdDate,
        isDeleted: props.isDeleted
    });
    toast.info("Product added to 'Shopping Cart'");
}
</script>

<style scoped>
</style>