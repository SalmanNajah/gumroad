import * as React from "react";

import { classNames } from "$app/utils/classNames";

export interface FormSwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "role"> {
  label?: React.ReactNode;
}

export const FormSwitch = React.forwardRef<HTMLInputElement, FormSwitchProps>(
  ({ className, label, disabled, ...props }, ref) => (
    <label
      className={classNames(
        "inline-flex cursor-pointer items-center gap-2",
        disabled && "cursor-not-allowed opacity-30",
      )}
    >
      <input
        ref={ref}
        type="checkbox"
        role="switch"
        disabled={disabled}
        className={classNames(
          "cursor-pointer appearance-none",
          "text-[1rem]",
          "h-[1.25em] w-[calc(2.5em-0.375rem)]",
          "border border-border",
          "rounded-full",
          "bg-background",
          "relative",
          "transition-all duration-150",
          "checked:bg-accent",
          "disabled:cursor-not-allowed disabled:opacity-30",
          "after:content-['']",
          "after:absolute",
          "after:top-[0.125rem]",
          "after:left-[0.1875rem]",
          "after:h-[calc(1.25em-0.375rem)]",
          "after:w-[calc(1.25em-0.375rem)]",
          "after:rounded-lg",
          "after:bg-foreground",
          "after:transition-all",
          "after:duration-150",
          "checked:after:left-[calc(100%-1.25em+0.1875rem)]",
          "checked:after:bg-accent-foreground",
          className,
        )}
        {...props}
      />
      {label ? <span>{label}</span> : null}
    </label>
  ),
);
FormSwitch.displayName = "FormSwitch";
