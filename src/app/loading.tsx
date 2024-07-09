import Logo from "@/components/Logo";

export default function loading() {
  return (
    <div className="min-h-[80dvh] grid place-items-center">
      <Logo className="animate-ping duration-1000 scale-150" />
    </div>
  );
}
