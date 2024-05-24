import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { signUpApi } from "./services/signUpApi";

export function useSignUp() {
  const { toast } = useToast();

  const {
    mutate: SignUp,
    isPending,
    error,
  } = useMutation({
    mutationFn: signUpApi,
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
