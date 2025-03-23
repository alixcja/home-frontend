import { defineStore } from "pinia";
import { News } from "@/ts/types/news.types";
import axiosInstance from "../api/axios";

export const useNewsStore = defineStore({
  id: "storeNews",
  state: () => {
    return {
        newsList: [] as News[],
      hasNews: false,
    };
  },
  getters: {},
  actions: {
    setNews(news: News[]) {
      this.newsList = news;
    },
    async getAllNews() {
      axiosInstance
        .get(`${import.meta.env.VITE_BACKEND_URL}/news`)
        .then((response) => {
          if (response.data.length > 0) {
            this.setNews(response.data);
            this.hasNews = true;
          }
        });
    },
  },
});
