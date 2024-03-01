import { defineStore } from "pinia";
import {IDrawerStoreState} from "../shared/interfaces";

export const useDrawerStore = defineStore("drawer", {
    state: (): IDrawerStoreState => ({
        visible: false
    }),
    actions: {
        setState(isVisible: boolean) {
            this.visible = isVisible;
        }
    }
});