import { ReloadIcon } from "@radix-ui/react-icons";

type SpinnerProps = { className?: string };

export default function Spinner({ className }: SpinnerProps) {
  return <ReloadIcon className={`${className} mr-2 h-4 w-4 animate-spin `} />;
}
