import { PropsWithChildren } from "react";
import { useAuthContext } from "./AuthContext";
import PageContainer from "@/components/layout/PageContainer";
import { MetaBlogLogoSvgIcon } from "@/components/SvgIcons";

type PersistLoginProps = PropsWithChildren;

export default function PersistLogin({ children }: PersistLoginProps) {
  const { isLoading } = useAuthContext();

  return (
    <>
      {isLoading ? (
        <PageContainer>
          <div className="flex min-h-dvh flex-col items-center justify-center">
            <MetaBlogLogoSvgIcon className="animate-ping duration-500" />
          </div>
        </PageContainer>
      ) : (
        children
      )}
    </>
  );
}
