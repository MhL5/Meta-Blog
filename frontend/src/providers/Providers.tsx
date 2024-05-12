import { PropsWithChildren } from "react";

import DarkModeProvider from "@/features/theme/DarkModeContext";

type ProviderProps = PropsWithChildren;
export default function Providers({ children }: ProviderProps) {
  return <DarkModeProvider>{children}</DarkModeProvider>;
}
