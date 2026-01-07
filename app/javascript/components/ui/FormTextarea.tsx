import * as React from "react";

import { classNames } from "$app/utils/classNames";

export interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const textareaBaseStyles =
  "px-4 py-3 font-[inherit] text-base leading-[1.4] border border-border rounded block w-full bg-background text-foreground placeholder:text-muted focus:outline-2 focus:outline-offset-0 focus:outline-accent disabled:cursor-not-allowed disabled:opacity-30 resize-y";

export const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
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
