import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { classNames } from "$app/utils/classNames";

import { Icon } from "$app/components/Icons";

declare module "react" {
  export interface CSSProperties {
    "--range-bg"?: string;
  }
}

const inputStyles = classNames(
  "font-[inherit] py-3 px-4 text-base leading-[1.4]",
  "border border-border rounded block w-full bg-background text-foreground placeholder:text-muted focus:outline-2 focus:outline-accent focus:outline-offset-0",
  "disabled:cursor-not-allowed disabled:opacity-30",
);

const inputWrapperChildStyles = "border-none flex-1 bg-transparent shadow-none outline-none -mx-4 max-w-none";

export const FormInput = React.forwardRef<
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
FormInput.displayName = "FormInput";

const textareaBaseStyles =
  "px-4 py-3 font-[inherit] text-base leading-[1.4] border border-border rounded block w-full bg-background text-foreground placeholder:text-muted focus:outline-2 focus:outline-offset-0 focus:outline-accent disabled:cursor-not-allowed disabled:opacity-30 resize-y";

export const FormTextarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, readOnly, ...props }, ref) => (
    <textarea
      ref={ref}
      readOnly={readOnly}
      className={classNames(textareaBaseStyles, readOnly && "cursor-default bg-body focus:outline-none", className)}
      {...props}
    />
  ),
);
FormTextarea.displayName = "FormTextarea";

const selectBaseStyles =
  "font-[inherit] text-base leading-[1.4] px-4 py-3 border border-border rounded block w-full bg-background placeholder:text-muted focus:outline-2 focus:outline-offset-0 focus:outline-accent disabled:cursor-not-allowed disabled:opacity-30 appearance-none bg-no-repeat pr-10";

export const FormSelect = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, style, children, ...props }, ref) => (
    <select
      ref={ref}
      className={classNames(selectBaseStyles, className)}
      style={{
        backgroundImage: `linear-gradient(45deg, transparent 50%, currentColor 50%, var(--color-background) calc(50% + 2px)),
          linear-gradient(315deg, transparent 50%, currentColor 50%, var(--color-background) calc(50% + 2px))`,
        backgroundPosition: "calc(100% - 1rem - 0.5em) center, calc(100% - 1rem) center",
        backgroundSize: "0.5em 0.5em",
        ...style,
      }}
      {...props}
    >
      {children}
    </select>
  ),
);
FormSelect.displayName = "FormSelect";

export const FormLabel = React.forwardRef<
  HTMLLabelElement,
  { children: React.ReactNode } & React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, children, ...props }, ref) => (
  <label
    ref={ref}
    className={classNames(
      "inline-flex cursor-pointer gap-2 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-30",
      className,
    )}
    {...props}
  >
    {children}
  </label>
));
FormLabel.displayName = "FormLabel";

const inputWrapperVariants = cva(
  [
    "inline-flex items-center w-full gap-2 relative py-0 px-4 min-h-[3.025rem] border border-border rounded bg-background text-foreground focus-within:outline-2 focus-within:outline-accent focus-within:outline-offset-0",
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

export const FormInputWrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof inputWrapperVariants>
>(({ className, disabled, readOnly, children, ...props }, ref) => (
  <div ref={ref} className={classNames(inputWrapperVariants({ disabled, readOnly }), className)} {...props}>
    {children}
  </div>
));
FormInputWrapper.displayName = "FormInputWrapper";

export const FormColorPicker = React.forwardRef<
  HTMLInputElement,
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">
>(({ className, ...props }, ref) => (
  <div className="relative max-w-fit overflow-hidden rounded-full border border-border p-4">
    <input
      ref={ref}
      type="color"
      className={classNames(
        "absolute -top-1/2 -left-1/2 h-[200%] w-[200%] max-w-none cursor-pointer border-none",
        className,
      )}
      {...props}
    />
  </div>
));
FormColorPicker.displayName = "FormColorPicker";

const switchBaseStyles =
  "cursor-pointer appearance-none h-5 min-h-5 w-[2.125rem] min-w-[2.125rem] border border-border rounded-full bg-background relative transition-all duration-150 checked:bg-accent disabled:cursor-not-allowed disabled:opacity-30 after:content-[''] after:absolute after:top-[0.125rem] after:left-[0.1875rem] after:size-[0.875rem] after:rounded-lg after:bg-foreground after:transition-all after:duration-150 checked:after:left-[calc(100%-1.0625rem)] checked:after:bg-accent-foreground";

export const FormSwitch = React.forwardRef<
  HTMLInputElement,
  { label?: React.ReactNode } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "role">
>(({ className, label, disabled, ...props }, ref) => (
  <label className={classNames("inline-flex cursor-pointer gap-2", disabled && "cursor-not-allowed opacity-30")}>
    <input
      ref={ref}
      type="checkbox"
      role="switch"
      disabled={disabled}
      className={classNames(switchBaseStyles, className)}
      {...props}
    />
    {label ? <span>{label}</span> : null}
  </label>
));
FormSwitch.displayName = "FormSwitch";

export const FormSection = ({
  header,
  children,
  className,
}: {
  header?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) => (
  <section
    className={classNames(
      "grid gap-8 border-t border-border py-12 first:border-t-0 first:pt-0 lg:grid-cols-[25%_1fr] lg:gap-x-16 lg:gap-y-0 lg:pb-4",
      className,
    )}
  >
    {header ? <header className="grid content-start gap-3 lg:col-span-1 lg:row-span-[10]">{header}</header> : null}
    <div className="grid gap-8 lg:col-start-2 lg:gap-0 [&>*]:lg:mb-8">{children}</div>
  </section>
);

const rangeStyles = classNames(
  "appearance-none bg-transparent h-[0.3125rem] grow",
  "[&::-webkit-slider-runnable-track]:h-[0.3125rem] [&::-webkit-slider-runnable-track]:w-full [&::-webkit-slider-runnable-track]:cursor-pointer [&::-webkit-slider-runnable-track]:rounded-[0.25rem] [&::-webkit-slider-runnable-track]:[background:var(--range-bg)]",
  "[&::-moz-range-track]:h-[0.3125rem] [&::-moz-range-track]:w-full [&::-moz-range-track]:cursor-pointer [&::-moz-range-track]:rounded-[0.25rem] [&::-moz-range-track]:[background:var(--range-bg)]",
  "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:size-[1em] [&::-webkit-slider-thumb]:[background:rgb(var(--color))] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:[margin-top:calc(0.5*(0.3125rem-1em))]",
  "[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:size-[1em] [&::-moz-range-thumb]:[background:rgb(var(--color))] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer",
);

export const FormRange = React.forwardRef<
  HTMLInputElement,
  { progress?: number } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">
>(({ className, progress = 0, style, ...props }, ref) => (
  <input
    ref={ref}
    type="range"
    className={classNames(rangeStyles, className)}
    style={{
      "--range-bg": `linear-gradient(to right, currentColor ${progress}%, rgb(var(--color) / 0.2) ${progress}%)`,
      ...style,
    }}
    {...props}
  />
));
FormRange.displayName = "FormRange";

const checkboxBaseStyles =
  "appearance-none size-[calc(1lh+0.125rem)] aspect-square border border-border bg-background text-base leading-[1.4] shrink-0 cursor-pointer disabled:cursor-not-allowed disabled:opacity-30 checked:bg-accent checked:text-accent-foreground rounded-lg peer";

export const FormCheckbox = React.forwardRef<
  HTMLInputElement,
  { wrapperClassName?: string } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">
>(({ className, wrapperClassName, ...props }, ref) => (
  <span className={classNames("relative inline-flex shrink-0 items-center justify-center", wrapperClassName)}>
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

export const FormRadio = React.forwardRef<HTMLInputElement, Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">>(
  ({ className, ...props }, ref) => (
    <input ref={ref} type="radio" className={classNames(radioBaseStyles, className)} {...props} />
  ),
);
FormRadio.displayName = "FormRadio";

const fieldsetVariants = cva("flex flex-col border-none gap-2 [&[role=group]_label_input]:ml-auto", {
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
});

export const FormFieldset = React.forwardRef<
  HTMLFieldSetElement,
  React.FieldsetHTMLAttributes<HTMLFieldSetElement> & VariantProps<typeof fieldsetVariants>
>(({ className, state, children, ...props }, ref) => (
  <fieldset ref={ref} className={classNames(fieldsetVariants({ state }), className)} {...props}>
    {children}
  </fieldset>
));
FormFieldset.displayName = "FormFieldset";

export const FormLegend = React.forwardRef<
  HTMLLegendElement,
  { children: React.ReactNode } & React.HTMLAttributes<HTMLLegendElement>
>(({ className, children, ...props }, ref) => (
  <legend
    ref={ref}
    className={classNames(
      "relative mb-2 flex w-full items-center text-base leading-[1.4] font-bold",
      "[&_a]:font-normal [&_label]:font-normal",
      "[&>:last-child:not(:only-child)]:ml-auto",
      className,
    )}
    {...props}
  >
    {children}
  </legend>
));
FormLegend.displayName = "FormLegend";
