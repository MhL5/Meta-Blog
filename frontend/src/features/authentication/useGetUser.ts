import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUser as getUserApi } from "./api/getUser";
import toast from "react-hot-toast";
import { Dispatch } from "react";
import { AuthAction } from "./AuthContext";

export function useGetUser(authDispatch: Dispatch<AuthAction>) {
  const queryClient = useQueryClient();
  const {
    mutate: getUser,
    isPending,
    isError,
  } = useMutation({
    mutationFn: getUserApi,
    onSuccess: (data) => {
      // setting user query data into react query cash
      queryClient.setQueryData(["user"], data.user);
      // updating localStorage
      const userData = JSON.stringify(data.user);
      localStorage.setItem("user", userData);
      // updating reducer
      authDispatch({ type: "user/loggedIn", payload: data.user });
      // success toast
      toast.success("logged in successfully.");
    },
    onError: () => {
      toast.error("Provided email or password is wrong!");
    },
  });

  return { getUser, isPending, isError };
}
