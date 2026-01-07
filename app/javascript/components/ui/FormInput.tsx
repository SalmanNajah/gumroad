import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { classNames } from "$app/utils/classNames";

const inputVariants = cva(
  [
    "font-[inherit]",
    "py-3 px-4",
    "text-base leading-[1.4]",
    "border border-border",
    "rounded",
    "block w-full",
    "bg-background text-foreground",
    "placeholder:text-muted",
    "focus:outline-2 focus:outline-accent focus:outline-offset-0",
    "disabled:cursor-not-allowed disabled:opacity-30",
  ],
  {
    variants: {
      state: {
        default: "",
        success: "border-success",
        danger: "border-danger",
        warning: "border-warning",
        info: "border-info",
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);

export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, state, readOnly, ...props }, ref) => (
    <input
      ref={ref}
      readOnly={readOnly}
      className={classNames(
        inputVariants({ state }),
        readOnly && "cursor-default bg-body focus:outline-none",
        className,
      )}
      {...props}
    />
  ),
);
FormInput.displayName = "FormInput";
