import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<{
  variant: "primary" | "transparent" | "secondary";
}> &
  ComponentPropsWithoutRef<"button">;

const buttonVariants = {
  defaultStyles: "cursor-pointer",
  primary:
    "[background:var(--gradient-primary)] font-bold px-6 py-3 rounded-full",
  secondary: "p-2",
  transparent: "",
};

function Button({
  children,
  variant,
  className,
  ...props
}: ButtonProps): JSX.Element {
  return (
    <button
      className={`${buttonVariants[variant]} ${buttonVariants.defaultStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
