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
  }),
  getters: {},
  actions: {
    async getAllEntites() {
      this.getAllGames();
      this.getAllConsoles();
      this.getAllAccessory();
    },
    getAllGames() {
      axiosInstance.get("http://localhost:8000/games").then((response) => {
        this.allGames = response.data;
      });
    },
    getAllConsoles() {
      axiosInstance.get("http://localhost:8000/consoles").then((response) => {
        this.allConsoles = response.data;
      });
    },
    getAllAccessory() {
      axiosInstance.get("http://localhost:8000/accessories").then((response) => {
        this.allAccessories = response.data;
      });
    },
  },
});
