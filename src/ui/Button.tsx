import { PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<{
  type: "primary" | "transparent" | "secondary";
}>;

const buttonVariants = {
  defaultStyles: "cursor-pointer",
  primary:
    "[background:var(--gradient-primary)] font-bold px-6 py-3 rounded-full",
  secondary: "p-2",
  transparent: "",
};

function Button({ children, type }: ButtonProps): JSX.Element {
  if (type === "primary")
    return (
      <button
        className={`${buttonVariants[type]} ${buttonVariants.defaultStyles}`}
      >
        {children}
      </button>
    );
  if (type === "secondary")
    return (
      <button
        className={`${buttonVariants[type]} ${buttonVariants.defaultStyles}`}
      >
        {children}
      </button>
    );
  if (type === "transparent")
    return (
      <button
        className={`${buttonVariants[type]} ${buttonVariants.defaultStyles}`}
      >
        {children}
      </button>
    );

  return <button>test</button>;
}

export default Button;
