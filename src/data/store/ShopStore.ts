import { defineStore } from "pinia";
import axiosInstance from "../api/axios";
import { Shop } from "@/ts/types/shop.types";

export const useShopStore = defineStore({
  id: "storeShop",
  state: () => {
    return {
        allShops: [] as Shop[],
    };
  },
  getters: {},
  actions: {
    setShops(shops: Shop[]) {
      this.allShops = shops;
    },
    async getAllShops() {
      axiosInstance
        .get(`${import.meta.env.VITE_BACKEND_URL}/shops`)
        .then((response) => {
          if (response.data.length > 0) {
            this.setShops(response.data);
          }
        });
    },
  },
});
