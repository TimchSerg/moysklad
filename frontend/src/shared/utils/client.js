import axios from "axios";

export const client = axios.create({
  timeout: 30000,
  // Host: "https://3raza.com",
  headers: {
    "Content-Type": "application/json",
  },
});
