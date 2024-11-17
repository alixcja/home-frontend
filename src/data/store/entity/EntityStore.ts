import { defineStore } from "pinia";
import axios from "axios";
import { Game } from "../../../ts/types/game.type";
import { Console } from "../../../ts/types/console.types";
import { Accessory } from "../../../ts/types/accessory.types";

export const useEntityStore = defineStore("entity", {
  state: () => ({
    allGames: [] as Game[],
    allConsoles: [] as Console[],
    allConsoleAccessories: [] as Accessory[],
  }),
  getters: {},
  actions: {
    async getAllEntites() {
      this.getAllGames();
      this.getAllConsoles();
      this.getAllConsolesAccessory();
    },
    getAllGames() {
      axios.get("http://localhost:8000/games").then((response) => {
        this.allGames = response.data;
      });
    },
    getAllConsoles() {
      axios.get("http://localhost:8000/consoles").then((response) => {
        this.allConsoles = response.data;
      });
    },
    getAllConsolesAccessory() {
      axios.get("http://localhost:8000/accessories").then((response) => {
        this.allConsoleAccessories = response.data;
      });
    },
  },
});
