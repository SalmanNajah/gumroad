import * as React from "react";

import { classNames } from "$app/utils/classNames";

const inputStyles = classNames(
  "font-[inherit] py-3 px-4 text-base leading-[1.4]",
  "border border-border rounded block w-full bg-background text-foreground placeholder:text-muted focus:outline-2 focus:outline-accent focus:outline-offset-0",
  "disabled:cursor-not-allowed disabled:opacity-30",
);

export const inputWrapperChildStyles = "border-none flex-1 bg-transparent shadow-none outline-none -mx-4 max-w-none";

export const Input = React.forwardRef<
  HTMLInputElement,
  { asChild?: boolean } & React.InputHTMLAttributes<HTMLInputElement>
>(({ className, readOnly, asChild, ...props }, ref) => (
  <input
    ref={ref}
    readOnly={readOnly}
    className={classNames(
      inputStyles,
      readOnly && "cursor-default bg-body focus:outline-none",
      asChild && inputWrapperChildStyles,
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";
