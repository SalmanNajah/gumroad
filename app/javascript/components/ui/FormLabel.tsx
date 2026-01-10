import * as React from "react";

import { classNames } from "$app/utils/classNames";

export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, children, ...props }, ref) => (
    <label
      ref={ref}
      className={classNames(
        "inline-flex gap-2 cursor-pointer has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-30",
        className,
      )}
      {...props}
    >
      {children}
    </label>
  ),
);
FormLabel.displayName = "FormLabel";
