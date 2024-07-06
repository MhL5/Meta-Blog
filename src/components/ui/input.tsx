import * as React from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const inputClassNames = `flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    if (type === "password")
      return (
        <PasswordInput
          type={type}
          className={cn(inputClassNames, className)}
          ref={ref}
          {...props}
        />
      );

    return (
      <input
        type={type}
        className={cn(inputClassNames, className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [type, setType] = React.useState<"password" | "text">("password");

    return (
      <div className="relative">
        <label
          className="absolute right-[2%] top-[50%] -translate-y-1/2  cursor-pointer aspect-square rounded-full p-2 hover:bg-secondary/80 duration-300"
          onClick={() =>
            setType((t) => (t === "password" ? "text" : "password"))
          }
        >
          {type === "password" ? (
            <Eye className="scale-[.7]" />
          ) : (
            <EyeOff className="scale-[.7]" />
          )}
        </label>
        <input
          id={type + className}
          className={cn(inputClassNames, className)}
          ref={ref}
          {...props}
          type={type}
        />
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { Input };
