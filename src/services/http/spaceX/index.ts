import axios from "axios";

export const httpSpaceX = axios.create({
  baseURL: "https://api.spacexdata.com/v4",
});
