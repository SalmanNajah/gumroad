import * as React from "react";

import { classNames } from "$app/utils/classNames";

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

export const Form = React.forwardRef<HTMLFormElement, FormProps>(({ className, children, ...props }, ref) => (
  <form ref={ref} className={classNames(className)} {...props}>
    {children}
  </form>
));
Form.displayName = "Form";

export interface FormSectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  twoColumn?: boolean;
}

/**
 * FormSection component for sections within a form.
 * Includes grid layout, padding, and borders.
 *
 * Set twoColumn={true} for 2-column layout at lg breakpoint.
 */
export const FormSection = React.forwardRef<HTMLElement, FormSectionProps>(
  ({ className, children, twoColumn, ...props }, ref) => (
    <section
      ref={ref}
      className={classNames(
        "grid gap-6",
        "border-t border-border py-7",
        "first-of-type:border-t-0 first-of-type:pt-0",
        "[role=separator]+&:border-t-0",
        twoColumn && "lg:grid-cols-[25%_1fr] lg:gap-x-8 lg:gap-y-0 lg:[&>*]:col-start-2 lg:[&>*]:mb-6",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  ),
);
FormSection.displayName = "FormSection";

export interface FormSectionHeaderProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  twoColumn?: boolean;
}

/**
 * Header within a FormSection.
 * Set twoColumn={true} when parent FormSection uses twoColumn layout.
 */
export const FormSectionHeader = React.forwardRef<HTMLElement, FormSectionHeaderProps>(
  ({ className, children, twoColumn, ...props }, ref) => (
    <header
      ref={ref}
      className={classNames(
        "grid content-start gap-3",
        twoColumn && "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-[10] lg:mb-0",
        className,
      )}
      {...props}
    >
      {children}
    </header>
  ),
);
FormSectionHeader.displayName = "FormSectionHeader";
