import { axiosApi } from "@/services/axiosApi";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export function useSignUp() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (newUser: {
      fullName: string;
      email: string;
      password: string;
      passwordConfirm: string;
    }) => {
      const user = await axiosApi.post("/users/signup", newUser);

      return user;
    },
    onSuccess: (s) => {
      console.log(s);
      console.log(`well done`);
    },
    onError: (e) => {
      if (isAxiosError(e)) console.log(e?.response?.data.error);
      console.log(`sadge`);
    },
  });

  return { mutate, isPending, error };
}
