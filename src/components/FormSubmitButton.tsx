"use client";

import { PropsWithChildren, ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "./ui/button";

type FormSubmitButtonProps = PropsWithChildren<{
  pendingLabel: ReactNode;
  className?: string;
}> &
  ButtonProps;

export default function FormSubmitButton({
  children,
  pendingLabel,
  className,
  ...props
}: FormSubmitButtonProps) {
  const { pending } = useFormStatus();

  let text = children;
  if (pendingLabel && pending) text = pendingLabel;

  return (
    <Button
      {...props}
      type="submit"
      disabled={pending}
      className={`${className} disabled:cursor-not-allowed w-full`}
    >
      {text}
    </Button>
  );
}
