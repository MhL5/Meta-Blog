import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { Auth, useAuthContext } from "./AuthContext";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const { toast } = useToast();
  const { setAuth } = useAuthContext();
  const { axiosPrivate } = useAxiosPrivate();
  const navigate = useNavigate();

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
      navigate(-1);
      toast({
        title: "welcome back",
        description: `successfully logged in as ${data.data.user.fullName || ""}`,
      });
    },
    onError: (err) => {
      let error = "unknown error😥";
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
