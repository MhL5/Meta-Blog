import { useToast } from "@/components/ui/use-toast";
import { axiosApi } from "@/services/axiosApi";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export function useSignUp() {
  const { toast } = useToast();

  const {
    mutate: SignUp,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (newUser: {
      fullName: string;
      email: string;
      password: string;
      passwordConfirm: string;
    }) => {
      const user = await axiosApi.post("/users/signup", newUser);

      return user;
    },
    // There is a onSuccess handler in SignUpForm Controller
    onError: (err) => {
      toast({
        variant: "destructive",
        title: "Error, Something went wrong",
        description: `${isAxiosError(err) ? err.response?.data.message : err.message}`,
      });
    },
  });

  return { SignUp, isPending, error };
}
