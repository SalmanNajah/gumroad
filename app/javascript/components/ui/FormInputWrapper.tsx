import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { classNames } from "$app/utils/classNames";

const inputWrapperVariants = cva(
  [
    "inline-flex items-center w-full gap-2 relative py-0 px-4 min-h-[3.025rem] border border-border rounded bg-background text-foreground focus-within:outline-2 focus-within:outline-accent focus-within:outline-offset-0",
    "[&_input]:border-none [&_input]:flex-1 [&_input]:bg-transparent [&_input]:shadow-none [&_input]:outline-none [&_input]:-mx-4 [&_input]:max-w-none",
    "[&>.icon]:text-muted",
  ],
  {
    variants: {
      disabled: {
        true: "cursor-not-allowed opacity-30 [&_input]:opacity-100",
        false: "",
      },
      readOnly: {
        true: "bg-body",
        false: "",
      },
    },
    defaultVariants: {
      disabled: false,
      readOnly: false,
    },
  },
);

export interface FormInputWrapperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof inputWrapperVariants> {}

export const FormInputWrapper = React.forwardRef<HTMLDivElement, FormInputWrapperProps>(
  ({ className, disabled, readOnly, children, ...props }, ref) => (
    <div ref={ref} className={classNames(inputWrapperVariants({ disabled, readOnly }), className)} {...props}>
      {children}
    </div>
  ),
);
FormInputWrapper.displayName = "FormInputWrapper";
