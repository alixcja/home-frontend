import { defineStore } from "pinia";
import axiosInstance from "../api/axios";
import { Address, Shop } from "@/ts/types/shop.types";
import { useToast } from "vue-toastification";
import { AxiosResponse } from "axios";

export const useShopStore = defineStore({
  id: "storeShop",
  state: () => {
    return {
      allShops: [] as Shop[],
      isAddShopModuleActive: false,
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

    triggerAddShopModuleActive() {
      this.isAddShopModuleActive = !this.isAddShopModuleActive;
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

    async getMenuCardByShopAndNumber(id: number, number: number) {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_BACKEND_URL}/shops/${id}/menucards/${number}`,
        { responseType: "blob" }
      );
      return URL.createObjectURL(response.data);
    },

    async persistShop(
      name: string,
      website?: string,
      phoneNumber?: string,
      streetName?: string,
      streetNumber?: string,
      postalCode?: number,
      city?: string
    ) {
      const address = {
        streetNumber,
        streetName,
        postalCode,
        city,
      } as Address;

      const shop: Partial<Shop> = {
        name,
        website,
        phoneNumber,
        address,
      };
      axiosInstance
        .post(`${import.meta.env.VITE_BACKEND_URL}/shops`, shop)
        .then((response: AxiosResponse) => {
          const toast = useToast();
          toast.success(
            `Shop ${response.data.name} wurde erfolgreich erstellt`
          );
          return response.data();
        });
      return null;
    },

    async updateShop(
      id: number,
      name: string,
      website?: string,
      phoneNumber?: string,
      streetName?: string,
      streetNumber?: string,
      postalCode?: number,
      city?: string
    ) {
      const address = {
        streetNumber,
        streetName,
        postalCode,
        city,
      } as Address;

      const shop: Partial<Shop> = {
        name,
        website,
        phoneNumber,
        address,
      };
      const response: AxiosResponse<Shop> = await axiosInstance.put(
        `${import.meta.env.VITE_BACKEND_URL}/shops/${id}`,
        shop
      );
      useToast().success(
        `Shop ${response.data.name} wurde erfolgreich erstellt`
      );
      return response.data.id;
    },

    async persistMenuCardForShop(number: number, menuCard: File, id?: number) {
      const formData = new FormData();
      formData.append("file", menuCard);
      formData.append("number", number as unknown as string);
      formData.append("id", id as unknown as string);

      await axiosInstance.post(
        `${import.meta.env.VITE_BACKEND_URL}/shops/${this.selectedShopForMenuCardsEditing?.id}/menucards`,
        formData,
        { responseType: "blob" }
      );
    },

    async getImageForShop(id: number) {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_BACKEND_URL}/shops/${id}/image`,
        { responseType: "blob" }
      );
      return URL.createObjectURL(response.data);
    },

    async getDefaultImage() {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_BACKEND_URL}/shops/image/default`,
        { responseType: "blob" }
      );
      return URL.createObjectURL(response.data);
    },

    async uploadImageForShop(id: number, image: File) {
      const formData = new FormData();
      formData.append("file", image);

      await axiosInstance.put(
        `${import.meta.env.VITE_BACKEND_URL}/shops/${id}/image`,
        formData,
        { responseType: "blob" }
      );
    },
  },
});
