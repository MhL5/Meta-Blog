import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { Auth, useAuthContext } from "./AuthContext";
import { useAxiosPrivate } from "./useAxiosPrivate";

export function useLogin() {
  const { toast } = useToast();
  const { setAuth } = useAuthContext();
  const { axiosPrivate } = useAxiosPrivate();

  const {
    mutate: login,
    isPending,
    error,
  } = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const res = await axiosPrivate.post<Auth>("/users/login", {
        email,
        password,
      });

      return res.data;
    },
    onSuccess: (data) => {
      setAuth(data);
      const accessToken = data.accessToken;
      console.log(accessToken);

      toast({
        title: "welcome back",
        description: `successfully logged in as ${data?.user?.fullName || ""}`,
      });
    },
    onError: (err) => {
      let error;
      if (isAxiosError(err) && !err?.response) error = "No Server Response";
      if (isAxiosError(err)) error = err.response?.data.message;
      if (!error) error = err.message;

      toast({
        title: "Something went wrong while logging in",
        description: `${error}`,
      });
    },
  });

  return { login, error, isPending };
}
