import { MetaBlogLogoSvgIcon } from "../SvgIcons";
import PageContainer from "../layout/PageContainer";

export default function SpinnerFullScreen() {
  return (
    <PageContainer>
      <div className="flex min-h-dvh flex-col items-center justify-center">
        <MetaBlogLogoSvgIcon className="h-12 w-12 animate-ping duration-1000" />
      </div>
    </PageContainer>
  );
}
