import { useAuthStore } from "@/data/store/AuthStore";
import Keycloak from "keycloak-js";

const options = {
  url: import.meta.env.VITE_KEYCLOAK_URL,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
};

const keycloak = new Keycloak(options);
let authenticated = false;
let store = null;

async function init(onInitCallback: unknown) {
  try {
    authenticated = await keycloak.init({ onLoad: "login-required" });
    onInitCallback();
    initStore(useAuthStore());
  } catch (error) {
    console.error("Keycloak init failed");
    console.error(error);
  }
}

async function initStore(storeInstance: unknown) {
  try {
    store = storeInstance;
    store.initOauth(keycloak);

    // Show alert if user is not authenticated
    if (!authenticated) {
      alert("not authenticated");
    }
  } catch (error) {
    console.error("Keycloak init failed");
    console.error(error);
  }
}

function logout(url: string) {
  keycloak.logout({ redirectUri: url });
}

async function refreshToken() {
  try {
    await keycloak.updateToken(480);
    return keycloak;
  } catch (error) {
    console.error("Failed to refresh token");
    console.error(error);
  }
}

const KeycloakService = {
  CallInit: init,
  CallInitStore: initStore,
  CallLogout: logout,
  CallTokenRefresh: refreshToken,
};

export default KeycloakService;
