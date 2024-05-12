import { PropsWithChildren } from "react";

type DefaultPageContainerProps = PropsWithChildren<{ customWidth?: string }>;

function PageContainer({
  children,
  customWidth = `100%`,
}: DefaultPageContainerProps) {
  return (
    <div className="min-h-dvh">
      <PageContainer.SvgPatternBackground customWidth={customWidth} />
      {children}
    </div>
  );
}

function SvgPatternBackground({ customWidth = `100%` }) {
  const customStyles = {
    width: customWidth,
  };

  return (
    <div
      className={`svg-pattern-background || absolute left-1/2 top-1/2 -z-50 h-[100dvh] -translate-x-1/2 -translate-y-1/2`}
      style={customStyles}
    ></div>
  );
}

PageContainer.SvgPatternBackground = SvgPatternBackground;
export default PageContainer;
