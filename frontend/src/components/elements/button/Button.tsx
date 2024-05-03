import {
  ComponentPropsWithoutRef,
  PropsWithChildren,
  ReactElement,
} from "react";
import { NavLink } from "react-router-dom";

type ButtonType = PropsWithChildren<{
  variant: "primary" | "transparent" | "secondary";
  el: "button";
}> &
  ComponentPropsWithoutRef<"button">;
type AnchorType = PropsWithChildren<{
  el: "anchor";
  variant: "primary" | "transparent" | "secondary";
  to: string;
}> &
  ComponentPropsWithoutRef<"a">;

type ButtonProps = ButtonType | AnchorType;

const buttonVariants = {
  defaultStyles:
    "cursor-pointer font-bold px-6 py-3 rounded-full custom-hover hover:text-opacity-70 text-gray-100",
  primary: "[background:var(--gradient-primary)] ",
  secondary: "p-2 bg-black ",
  transparent: "",
};

function Button(props: ButtonProps): ReactElement {
  if (props.el === "anchor") {
    const { to, variant, className, children, ...otherProps } = props;
    return (
      <NavLink
        to={to}
        className={`${buttonVariants[variant]} ${buttonVariants.defaultStyles} ${className}`}
        {...otherProps}
      >
        {children}
      </NavLink>
    );
  }

  const { variant, className, children, ...otherProps } = props;
  return (
    <button
      className={`${buttonVariants[variant]} ${buttonVariants.defaultStyles} ${className}`}
      {...otherProps}
    >
      {children}
    </button>
  );
}

export default Button;
