import { defineStore } from "pinia";
import { IUserViewModel, IUserStoreState } from "../shared/interfaces";

export const useUserStore = defineStore("user", {
    state: (): IUserStoreState => ({
        loggedin: false,
        user: null
    }),
    actions: {
        setState(isLoggedin: boolean, userData: IUserViewModel | null) {
            this.loggedin = isLoggedin;
            this.user = userData;
            localStorage.setItem("loggedin", JSON.stringify(this.loggedin));
            localStorage.setItem("user", JSON.stringify(this.user));
        },
        loadFromLocalStorage() {
            this.loggedin = JSON.parse(localStorage.getItem("loggedin") as string);
            this.user = JSON.parse(localStorage.getItem("user") as string);
        }
    }
});