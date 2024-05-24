import { PropsWithChildren } from "react";
import { useAuthContext } from "./AuthContext";
import PageContainer from "@/components/layout/PageContainer";
import Spinner from "@/components/ui/Spinner";

type PersistLoginProps = PropsWithChildren;

export default function PersistLogin({ children }: PersistLoginProps) {
  const { isLoading } = useAuthContext();

  return (
    <>
      {isLoading ? (
        <PageContainer>
          <div className="flex min-h-dvh flex-col items-center justify-center">
            <div className="text-lg font-semibold">loading...😉</div>
            <Spinner className="" />
          </div>
        </PageContainer>
      ) : (
        children
      )}
    </>
  );
}
