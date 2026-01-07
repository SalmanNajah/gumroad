import * as React from "react";

import { classNames } from "$app/utils/classNames";

import { Icon } from "$app/components/Icons";

const checkboxBaseStyles =
  "appearance-none size-[calc(1lh+0.125rem)] aspect-square border border-border bg-background text-base leading-[1.4] shrink-0 cursor-pointer disabled:cursor-not-allowed disabled:opacity-30 checked:bg-accent checked:text-accent-foreground rounded-lg peer";

export interface FormCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

export const FormCheckbox = React.forwardRef<HTMLInputElement, FormCheckboxProps>(({ className, ...props }, ref) => (
  <span className="relative inline-flex items-center justify-center shrink-0">
    <input ref={ref} type="checkbox" className={classNames(checkboxBaseStyles, className)} {...props} />
    <Icon
      name="outline-check"
      className="pointer-events-none absolute hidden! text-accent-foreground peer-checked:block!"
    />
  </span>
));
FormCheckbox.displayName = "FormCheckbox";

const radioBaseStyles =
  "appearance-none size-[calc(1lh+0.125rem)] aspect-square border border-border bg-background text-base leading-[1.4] shrink-0 cursor-pointer disabled:cursor-not-allowed disabled:opacity-30 rounded-full checked:bg-accent checked:p-[calc(var(--spacer-2)-2*var(--border-width))] checked:after:content-[''] checked:after:block checked:after:h-full checked:after:bg-accent-foreground checked:after:rounded-full";

export interface FormRadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

export const FormRadio = React.forwardRef<HTMLInputElement, FormRadioProps>(({ className, ...props }, ref) => (
  <input ref={ref} type="radio" className={classNames(radioBaseStyles, className)} {...props} />
));
FormRadio.displayName = "FormRadio";

export interface FormRadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export const FormRadioGroup = React.forwardRef<HTMLDivElement, FormRadioGroupProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} role="radiogroup" className={classNames("grid gap-4", className)} {...props}>
      {children}
    </div>
  ),
);
FormRadioGroup.displayName = "FormRadioGroup";
