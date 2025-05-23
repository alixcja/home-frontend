import { defineStore } from "pinia";
import { Game } from "../../../ts/types/game.type";
import { Console } from "../../../ts/types/console.types";
import { Accessory } from "../../../ts/types/accessory.types";
import axiosInstance from "@/data/api/axios";
import { AxiosResponse } from "axios";
import { BookingEntityType } from "@/ts/entitytypes.enums";
import { useToast } from "vue-toastification";

export const useEntityStore = defineStore("entity", {
  state: () => ({
    allGames: [] as Game[],
    allConsoles: [] as Console[],
    allAccessories: [] as Accessory[],
    allEntities: [] as BookingEntity[],
    isEditEntityModuleActive: false,
    isAddEntityModuleActive: false,
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
          this.allEntities.push(...response.data);
        });
    },
    getAllConsoles() {
      axiosInstance
        .get(`${import.meta.env.VITE_BACKEND_URL}/consoles`)
        .then((response) => {
          this.allConsoles = response.data;
          this.allEntities.push(...response.data);
        });
    },
    getAllAccessories() {
      axiosInstance
        .get(`${import.meta.env.VITE_BACKEND_URL}/accessories`)
        .then((response) => {
          this.allAccessories = response.data;
          this.allEntities.push(...response.data);
        });
    },
    async getImageForEntity(id: number) {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_BACKEND_URL}/entities/${id}/image`,
        { responseType: "blob" }
      );
      return URL.createObjectURL(response.data);
    },
    async getDefaultImage() {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_BACKEND_URL}/entities/image/default`,
        { responseType: "blob" }
      );
      return URL.createObjectURL(response.data);
    },
    async uploadImageForEntity(id: number, image: File) {
      const formData = new FormData();
      formData.append("file", image);

      await axiosInstance.put(
        `${import.meta.env.VITE_BACKEND_URL}/entities/${id}/image`,
        formData,
        { responseType: "blob" }
      );
    },
    triggerEditEntityModuleActive() {
      this.isEditEntityModuleActive = !this.isEditEntityModuleActive;
    },
    triggerAddEntityModuleActive() {
      this.isAddEntityModuleActive = !this.isAddEntityModuleActive;
    },
    setSelectedEntityForEdit(selected: BookingEntity | null) {
      this.selectedEntityForEdit = selected;
    },

    async persistEntity(
      name: string,
      type: BookingEntityType,
      consoleType?: string,
      description?: string
    ): Promise<number | null> {
      if (type === BookingEntityType.Game) {
        return this.persistGame(name, description, consoleType);
      } else if (type === BookingEntityType.Console) {
        return this.persistConsole(name, description);
      } else {
        return this.persistAccessory(name, description, consoleType);
      }
    },
    persistGame(
      name: string,
      description?: string,
      consoleType?: string
    ): number | null {
      const game: Partial<Game> = {
        name,
        consoleType,
        description,
        type: BookingEntityType.Game,
      };
      axiosInstance
        .post(`${import.meta.env.VITE_BACKEND_URL}/games`, game)
        .then((response: AxiosResponse) => {
          const toast = useToast();
          toast.success(
            `Spiel ${response.data.name} wurde erfolgreich erstellt`
          );
          return response.data();
        });
      return null;
    },
    persistConsole(name: string, description?: string): number | null {
      const console: Partial<Game> = {
        name,
        description,
        type: BookingEntityType.Console,
      };
      axiosInstance
        .post(`${import.meta.env.VITE_BACKEND_URL}/consoles`, console)
        .then((response: AxiosResponse) => {
          const toast = useToast();
          toast.success(
            `Konsole ${response.data.name} wurde erfolgreich erstellt`
          );
          return response.data();
        });
      return null;
    },
    persistAccessory(
      name: string,
      description?: string,
      consoleType?: string
    ): number | null {
      const consoleAccessory: Partial<Accessory> = {
        name,
        consoleType,
        description,
        type: BookingEntityType.Accessory,
      };
      axiosInstance
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/accessories`,
          consoleAccessory
        )
        .then((response: AxiosResponse) => {
          const toast = useToast();
          toast.success(
            `Konsolenzubehör ${response.data.name} wurde erfolgreich erstellt`
          );
          return response.data();
        });
      return null;
    },

    async updateEntity(
      id: number,
      name: string,
      type: BookingEntityType,
      description: string,
      consoleType?: string
    ) {
      if (type === BookingEntityType.Game) {
        this.updateGame(id, name, description, consoleType);
      } else if (type === BookingEntityType.Console) {
        this.updateConsole(id, name, description);
      } else {
        this.updateAccessory(id, name, description, consoleType);
      }
    },
    updateGame(
      id: number,
      name: string,
      description: string,
      consoleType?: string
    ) {
      const game: Partial<Game> = {
        name,
        consoleType,
        type: "game",
        description,
      };
      axiosInstance
        .put(`${import.meta.env.VITE_BACKEND_URL}/games/${id}`, game)
        .then(() => {
          const toast = useToast();
          toast.success(`Spiel wurde erfolgreich aktualisisert`);
        });
    },
    updateConsole(id: number, name: string, description: string) {
      const console: Partial<Game> = {
        name,
        type: "console",
        description,
      };
      axiosInstance
        .put(`${import.meta.env.VITE_BACKEND_URL}/consoles/${id}`, console)
        .then(() => {
          const toast = useToast();
          toast.success(`Konsole wurde erfolgreich aktualisisert`);
        });
    },
    updateAccessory(
      id: number,
      name: string,
      description: string,
      consoleType?: string
    ) {
      const consoleAccessory: Partial<Accessory> = {
        name,
        consoleType,
        type: "accessory",
        description,
      };
      axiosInstance
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/accessories/${id}`,
          consoleAccessory
        )
        .then(() => {
          const toast = useToast();
          toast.success(`Konsolenzubehör wurde erfolgreich aktualisisert`);
        });
    },

    archiveEntity(id: number) {
      axiosInstance
        .put(`${import.meta.env.VITE_BACKEND_URL}/entities/${id}/archive`)
        .then(() => {
          const toast = useToast();
          toast.success(`Entity wurde erfolgreich archiviert`);
        });
    },

    unarchiveEntity(id: number) {
      axiosInstance
        .put(`${import.meta.env.VITE_BACKEND_URL}/entities/${id}/unarchive`)
        .then(() => {
          const toast = useToast();
          toast.success(`Entity wurde erfolgreich unarchiviert (????)`);
        });
    },
  },
});
