<template>
    <h2>Stock</h2>
    <SearchTextField @search-clicked="searchProduct"/>
    <div class="stock-card-grid">
        <div v-for="item in productList" :key="item.id">
            <ProductCard
                :id="item.id"
                :name="item.name"
                :description="item.description"
                :price="item.price"
                :stock="item.stock"
                :imagehref="item.imagehref"
                :lastModified="item.lastModified"
                :createdDate="item.createdDate"
                :isDeleted="item.isDeleted" />
        </div>
    </div>    
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useUserStore } from "../store/user";
import SearchTextField from "../components/SearchTextField.vue";
import { URL_PRODUCT_GET_LIST, AUTHORIZATION_TOKEN } from "../shared/constants";
import ProductCard from "../components/ProductCard.vue";
import { IProductViewModel } from "../shared/interfaces";

const toast = useToast();
const userStore = useUserStore();
const productList = ref<IProductViewModel[]>([]);

onMounted(() => {
    userStore.loadFromLocalStorage();
});

const fetchList = async (keyword: string) => {
    await fetch(`${URL_PRODUCT_GET_LIST}?GetAll=false&keyword=${keyword}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": AUTHORIZATION_TOKEN
        }
    }).then(response => {
        if (!response.ok) {
            return response.text().then(errorText => {
                throw new Error(errorText);
            });
        }
        return response.json();
    }).then(data => {
        productList.value = data;
    }).catch(error => {
        toast.error(error.message.substring(18, error.message.indexOf("!") + 1));
    });
}

const searchProduct = async (keyword: string) => {
    await fetchList(keyword);
}
</script>

<style scoped>
.stock-card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
}
</style>