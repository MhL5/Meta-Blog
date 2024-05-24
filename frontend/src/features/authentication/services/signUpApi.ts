import { axiosApi } from "@/services/axiosApi";

type SignUpApiParams = {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

async function signUpApi(newUser: SignUpApiParams) {
  const res = await axiosApi.post("/users/signup", newUser);

  return res.data;
}

export { signUpApi };
