import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { classNames } from "$app/utils/classNames";

const fieldsetVariants = cva(
  "flex flex-col border-none gap-2 [&[role=group]_label]:w-full [&[role=group]_label_input]:ml-auto [&[role=group]_label>span:last-child]:ml-auto",
  {
    variants: {
      state: {
        default: "",
        success: "[&_input]:border-success [&_select]:border-success [&_small]:text-success",
        danger: "[&_input]:border-danger [&_select]:border-danger [&_small]:text-danger",
        warning: "[&_input]:border-warning [&_select]:border-warning [&_small]:text-warning",
        info: "[&_input]:border-info [&_select]:border-info [&_small]:text-info",
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);

export interface FormFieldsetProps
  extends React.FieldsetHTMLAttributes<HTMLFieldSetElement>,
    VariantProps<typeof fieldsetVariants> {}

export const FormFieldset = React.forwardRef<HTMLFieldSetElement, FormFieldsetProps>(
  ({ className, state, children, ...props }, ref) => (
    <fieldset ref={ref} className={classNames(fieldsetVariants({ state }), className)} {...props}>
      {children}
    </fieldset>
  ),
);
FormFieldset.displayName = "FormFieldset";

export interface FormLegendProps extends React.HTMLAttributes<HTMLLegendElement> {
  children: React.ReactNode;
}

export const FormLegend = React.forwardRef<HTMLLegendElement, FormLegendProps>(
  ({ className, children, ...props }, ref) => (
    <legend
      ref={ref}
      className={classNames(
        "relative flex items-center",
        "font-bold",
        "mb-2 w-full",
        "text-base leading-[1.4]",
        "[&_a]:font-normal [&_label]:font-normal",
        "[&>:last-child:not(:only-child)]:ml-auto",
        className,
      )}
      {...props}
    >
      {children}
    </legend>
  ),
);
FormLegend.displayName = "FormLegend";

export interface FormSmallProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const FormSmall = React.forwardRef<HTMLElement, FormSmallProps>(({ className, children, ...props }, ref) => (
  <small ref={ref} className={classNames("text-muted", className)} {...props}>
    {children}
  </small>
));
FormSmall.displayName = "FormSmall";
