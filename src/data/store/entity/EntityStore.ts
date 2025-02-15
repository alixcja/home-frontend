import { defineStore } from "pinia";
import { Game } from "../../../ts/types/game.type";
import { Console } from "../../../ts/types/console.types";
import { Accessory } from "../../../ts/types/accessory.types";
import axiosInstance from "@/data/api/axios";

export const useEntityStore = defineStore("entity", {
  state: () => ({
    allGames: [] as Game[],
    allConsoles: [] as Console[],
    allAccessories: [] as Accessory[],
    allEntities: [] as BookingEntity[],
    isEditEntityModuleActive: false,
    selectedEntityForEdit: null as BookingEntity | null,
  }),
  getters: {},
  actions: {
    async getAllEntites() {
      this.allEntities = [];
      this.getAllGames();
      this.getAllConsoles();
      this.getAllAccessories();
    },
    getAllGames() {
      axiosInstance
        .get(`${import.meta.env.VITE_BACKEND_URL}/games`)
        .then((response) => {
          this.allGames = response.data;
          this.allEntities.push(... response.data);
        });
    },
    getAllConsoles() {
      axiosInstance.get(`${import.meta.env.VITE_BACKEND_URL}/consoles`).then((response) => {
        this.allConsoles = response.data;
        this.allEntities.push(... response.data);
      });
    },
    getAllAccessories() {
      axiosInstance
        .get(`${import.meta.env.VITE_BACKEND_URL}/accessories`)
        .then((response) => {
          this.allAccessories = response.data;
          this.allEntities.push(... response.data);
        });
    },
    async getImageForEntity(id: number) {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_BACKEND_URL}/entities/${id}/image`,
        { responseType: "blob" } 
      );
  
      return URL.createObjectURL(response.data);
    },
    triggerEditEntityModuleActive() {
      this.isEditEntityModuleActive = !this.isEditEntityModuleActive;
    },
    setSelectedEntityForEdit(selected: BookingEntity | null) {
      this.selectedEntityForEdit = selected;
    }
  },
});
