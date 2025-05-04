import { defineStore } from "pinia";
import axiosInstance from "../api/axios";
import { Shop } from "@/ts/types/shop.types";

export const useShopStore = defineStore({
  id: "storeShop",
  state: () => {
    return {
      allShops: [] as Shop[],
      isEditShopModalActive: false,
      isMenuCardModalActive: false,
      selectedShopForMenuCardsEditing: null as Shop | null,
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

    triggerEditMenuCardsForShopModuleActive() {
      this.isMenuCardModalActive = !this.isMenuCardModalActive;
    },

    setSelectedShopForMenuCardsEdit(selected: Shop | null) {
      this.selectedShopForMenuCardsEditing = selected;
    },

    async getImageForShop(id: number) {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_BACKEND_URL}/shops/${id}/image`,
        { responseType: "blob" }
      );
      return URL.createObjectURL(response.data);
    },

    async getMenuCardsForShop(id: number) {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_BACKEND_URL}/shops/${id}/menucards`,
        { responseType: "blob" }
      );
      return response.data.array.forEach((card: Blob | MediaSource) => {
        return URL.createObjectURL(card);
      });
    },
  },
});
