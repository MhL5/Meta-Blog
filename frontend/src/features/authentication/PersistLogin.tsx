import { PropsWithChildren } from "react";
import { useAuthContext } from "./AuthContext";
import SpinnerFullScreen from "@/components/ui/SpinnerFullScreen";

type PersistLoginProps = PropsWithChildren;

export default function PersistLogin({ children }: PersistLoginProps) {
  const { isLoading } = useAuthContext();

  return <>{isLoading ? <SpinnerFullScreen /> : children}</>;
}
