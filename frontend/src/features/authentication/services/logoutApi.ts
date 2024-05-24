import { axiosApi } from "@/services/axiosApi";

async function logoutApi() {
  const res = await axiosApi.get("/users/logout");
  localStorage.removeItem("persistLogin");

  return res.data;
}

export { logoutApi };
