<template>
    <div :class="{'shopping-cart-left-30vw': !drawerStore.visible, 'shopping-cart-left-21vw': drawerStore.visible}">
        <h2 class="shopping-cart-title">Shopping Cart</h2>
        <v-card 
            class="shopping-cart-card" 
            variant="elevated" 
            v-for="(item, index) in items" :key="index">
            <img class="shopping-cart-product-image" :src="item.productImagehref" /><br />
            Name: {{ item.productName }}<br />
            Description: {{ item.productDescription }}<br />
            Price: {{ formatAsCurrency(item.productPrice) }}<br />
            Count: {{ item.productCount }}<br />
            Subtotal: {{ item.subtotal }}
            <v-btn 
                class="shopping-cart-remove-button" 
                flat 
                @click="removeProductClicked(item.productId)">❌
            </v-btn>
        </v-card>
        <strong>Total:</strong> {{ formatAsCurrency(shoppingCartStore.total) }}
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useUserStore } from "../store/user";
import { useDrawerStore } from "../store/drawer";
import { useShoppingCartStore } from "../store/shoppingCart";
import { ResumeShoppingProduct } from "../shared/interfaces";
import { formatAsCurrency } from "../shared/utils";

const userStore = useUserStore();
const drawerStore = useDrawerStore();
const shoppingCartStore = useShoppingCartStore();
const items = ref<ResumeShoppingProduct[]>([]);

const updateItems = () => {
    items.value = [];
    if (shoppingCartStore.productList) {
        shoppingCartStore.productList.map(iProduct => {
            items.value = [...items.value, {
                productId: iProduct.product.id,
                productPrice: iProduct.product.price,
                productName: iProduct.product.name,
                productDescription: iProduct.product.description,
                productImagehref: iProduct.product.imagehref,
                productCount: iProduct.count,
                subtotal: iProduct.total
            }];
        });
    }
}

const removeProductClicked = (productId: number) => {
    shoppingCartStore.removeProduct(productId);
    updateItems();
}

onMounted(() => {
    userStore.loadFromLocalStorage();
    shoppingCartStore.loadFromLocalStorage();
    updateItems();
});
</script>

<style scoped>
.shopping-cart-left-30vw {
    margin-left: 10px;
    margin-right: 10px;    
    margin-bottom: 10px;
    width: 500px;
    position: relative;
    left: 30vw;
}

.shopping-cart-left-21vw {
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    width: 500px;
    position: relative;
    left: 21vw;
}

.shopping-cart-card {
    margin-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
}

.shopping-cart-title {
    text-align: center;
    margin-bottom: 10px;
}

.shopping-cart-product-image {
    width: 50px;
    height: 50px;
}

.shopping-cart-remove-button {
    position: absolute;
    left: 27.5rem;
    bottom: 10rem;
}
</style>