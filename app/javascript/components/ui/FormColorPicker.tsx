import * as React from "react";

import { classNames } from "$app/utils/classNames";

export interface FormColorPickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  containerClassName?: string;
}

export const FormColorPicker = React.forwardRef<HTMLInputElement, FormColorPickerProps>(
  ({ className, containerClassName, ...props }, ref) => (
    <div
      className={classNames(
        "relative overflow-hidden p-4 border border-border rounded-full max-w-fit",
        containerClassName,
      )}
    >
      <input
        ref={ref}
        type="color"
        className={classNames(
          "absolute h-[200%] w-[200%] max-w-none -top-1/2 -left-1/2 border-none cursor-pointer",
          className,
        )}
        {...props}
      />
    </div>
  ),
);
FormColorPicker.displayName = "FormColorPicker";
