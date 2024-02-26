import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<{
  variant: "primary" | "transparent" | "secondary";
}> &
  ComponentPropsWithoutRef<"button">;

const buttonVariants = {
  defaultStyles: "cursor-pointer font-bold px-6 py-3 rounded-full",
  primary: "[background:var(--gradient-primary)]",
  secondary: "p-2 bg-black",
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
