import { PropsWithChildren, type ReactElement } from "react";

type DefaultPageContainerProps = PropsWithChildren<{ customWidth?: string }>;

function DefaultPageContainer({
  children,
  customWidth = `100%`,
}: DefaultPageContainerProps): ReactElement {
  const customStyles = {
    width: customWidth,
  };

  return (
    <div className="min-h-dvh">
      <div
        className={`svg-pattern-background || absolute left-1/2 top-1/2 -z-50 h-[100dvh] -translate-x-1/2 -translate-y-1/2`}
        style={customStyles}
      ></div>
      {children}
    </div>
  );
}

export default DefaultPageContainer;
