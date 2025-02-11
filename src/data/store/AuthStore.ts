import { defineStore } from "pinia";
import keycloakService from "@/services/keycloakService";
import { KeycloakTokenParsed } from "keycloak-js";

export const useAuthStore = defineStore({
  id: "storeAuth",
  state: () => {
    return {
      authenticated: false,
      currentUser: {} as User,
      test: false,
    };
  },
  getters: {},
  actions: {
    async initOauth(keycloak: KeycloakTokenParsed, clearData = true) {
      if (clearData) {
        await this.clearUserData();
      }

      this.authenticated = keycloak.authenticated;
      this.currentUser.firstName = keycloak.idTokenParsed.given_name;
      this.currentUser.lastName = keycloak.idTokenParsed.family_name;
      this.currentUser.accessToken = keycloak.token;
      this.isUserHomeAdmin(keycloak.tokenParsed.groups);
      //this.user.refToken = keycloak.refreshToken;
    },

    isUserHomeAdmin(roles: string[]) {
      if (roles.includes("home-admin")) {
        this.currentUser.isHomeAdmin = true;
      } else {
        this.currentUser.isHomeAdmin = false;
      }
    },

    async logout() {
      try {
        keycloakService.CallLogout(import.meta.env.VITE_APP_URL);
        this.clearUserData();
      } catch (error) {
        console.error(error);
      }
    },

    async refreshUserToken() {
      try {
        const keycloak = await keycloakService.CallTokenRefresh();
        this.initOauth(keycloak, false);
      } catch (error) {
        console.error(error);
      }
    },
    // Clear user's store data
    clearUserData() {
      this.authenticated = false;
      this.currentUser = {} as User;
    },

    getCurrentUser(): User {
      return this.currentUser;
    },
  },
});
