import { defineStore } from "pinia";
import axiosInstance from "../api/axios";
import { Shop } from "@/ts/types/shop.types";

export const useShopStore = defineStore({
  id: "storeShop",
  state: () => {
    return {
      allShops: [] as Shop[],
      isEditShopModalActive: false,
      selectedShopForEdit: null as Shop | null,
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

    triggerEditShopModuleActive() {
      this.isEditShopModalActive = !this.isEditShopModalActive;
    },

    setSelectedShopForEdit(selected: Shop | null) {
      this.selectedShopForEdit = selected;
    },

    async getImageForShop(id: number) {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_BACKEND_URL}/shops/${id}/image`,
        { responseType: "blob" }
      );
      return URL.createObjectURL(response.data);
    },
  },
});
