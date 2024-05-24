import { axiosApi } from "@/services/axiosApi";
import { Auth } from "../AuthContext";

async function refreshApi() {
  const res = await axiosApi.get<Auth>("/users/refresh");
  return res.data;
}

export { refreshApi };
