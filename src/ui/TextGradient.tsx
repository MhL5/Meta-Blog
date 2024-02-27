import { ReactElement, ReactNode } from "react";

function TextGradient({ children }: { children: ReactNode }): ReactElement {
  return (
    <span className="bg-gradient-to-r from-gradientColorOne to-gradientColorTwo bg-clip-text text-transparent">
      {children}
    </span>
  );
}

export default TextGradient;
