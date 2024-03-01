import { defineStore } from "pinia";
import { IProductViewModel, IShoppingCartState } from "../shared/interfaces";

export const useShoppingCartStore = defineStore("shoppingCart", {
    state: (): IShoppingCartState => ({
        productList: [],
        total: 0.0
    }),
    actions: {
        appendProduct(product: IProductViewModel) {
            let productMatched = false;
            this.productList.map(iProduct => {
                if (iProduct.product.id === product.id) {
                    iProduct.count++;
                    iProduct.total += product.price;
                    productMatched = true;
                }
            });
            if (!productMatched) {
                this.productList = [...this.productList, {
                    product,
                    count: 1,
                    total: product.price
                }];
            }
            this.updateTotal();
            this.saveToLocalStorage();
        },
        removeProduct(id: number) {
            this.productList = this.productList.filter(iProduct => iProduct.product.id !== id);
            this.updateTotal();
            this.saveToLocalStorage();
        },
        updateTotal() {
            this.total = 0.0;
            this.productList.map(iProduct => {
                this.total += iProduct.total;
            });
        },
        saveToLocalStorage() {
            localStorage.setItem("productList", JSON.stringify(this.productList));
            localStorage.setItem("total", JSON.stringify(this.total));
        },
        loadFromLocalStorage() {
            this.productList = JSON.parse(localStorage.getItem("productList") as string);
            this.total = JSON.parse(localStorage.getItem("total") as string);
        }
    }
});