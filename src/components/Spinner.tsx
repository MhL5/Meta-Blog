import { LoaderCircle } from "lucide-react";

export default function Spinner({ size }: { size: "sm" | "md" }) {
  let spinnerClass = "spinner";
  if (size === "sm") spinnerClass = "spinner-mini";

  return <LoaderCircle className={spinnerClass} />;
}
