import axios from "axios";

export * from "./launches";

export const httpSpaceX = axios.create({
  baseURL: "https://api.spacexdata.com/v4",
});
