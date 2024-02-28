import { PropsWithChildren, type ReactElement } from "react";

type DefaultPageContainerProps = PropsWithChildren;

function DefaultPageContainer({
  children,
}: DefaultPageContainerProps): ReactElement {
  return (
    <div className="min-h-dvh">
      <div className="svg-pattern-background ||| absolute left-1/2 top-1/2 -z-50 h-[100dvh] w-[99.1vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden"></div>
      {children}
    </div>
  );
}

export default DefaultPageContainer;
