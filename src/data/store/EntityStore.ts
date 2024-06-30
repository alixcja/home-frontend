import { defineStore } from "pinia";
import axios from "axios";
import { Game } from "../../ts/types/game.type";
import { Console } from "../../ts/types/console.types";
import { Accessory } from "../../ts/types/accessory.types";

export const useEntityStore = defineStore("entity", {
  state: () => ({ allGames: [] as Game[], allConsoles: [] as Console[], allConsoleAccessories: [] as Accessory[] }),
  getters: {},
  actions: {
    async getAllEntites() {
      this.getAllGames();
      this.getAllConsoles();
      this.getAllConsolesAccessory();
    },
    getAllGames() {
      axios.get("http://localhost:8900/game/all").then((response) => {
        this.allGames = response.data;
      });
    },
    getAllConsoles() {
      axios.get("http://localhost:8900/console/all").then((response) => {
        this.allConsoles = response.data;
      });
    },
    getAllConsolesAccessory() {
      axios.get("http://localhost:8900/accessory/all").then((response) => {
        this.allConsoleAccessories = response.data;
      });
    },
  },
});
