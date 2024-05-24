import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { logoutApi } from "./services/logoutApi";
import { useAuthContext } from "./AuthContext";

export function useLogout() {
  const { toast } = useToast();
  const { setAuth } = useAuthContext();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      // removes the persistLogin from localStorage
      localStorage.removeItem("persistLogin");
      setAuth(null);

      toast({
        description: "logged out successfully",
      });
    },
  });

  return { logout, isPending };
}
