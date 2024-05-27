import { PropsWithChildren } from "react";

type DefaultPageContainerProps = PropsWithChildren<{ customWidth?: string }>;

function PageContainer({ children, customWidth }: DefaultPageContainerProps) {
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
      className="svg-pattern-background || absolute h-dvh -z-50"
      style={customStyles}
    ></div>
  );
}

PageContainer.SvgPatternBackground = SvgPatternBackground;
export default PageContainer;
