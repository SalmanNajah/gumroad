import * as React from "react";

import { classNames } from "$app/utils/classNames";

const radioBaseStyles =
  "appearance-none size-[calc(1lh+0.125rem)] aspect-square border border-border bg-background text-base leading-[1.4] shrink-0 cursor-pointer disabled:cursor-not-allowed disabled:opacity-30 rounded-full checked:bg-accent checked:p-[calc(var(--spacer-2)-2*var(--border-width))] checked:after:content-[''] checked:after:block checked:after:h-full checked:after:bg-accent-foreground checked:after:rounded-full";

export const Radio = React.forwardRef<HTMLInputElement, Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">>(
  ({ className, ...props }, ref) => (
    <input ref={ref} type="radio" className={classNames(radioBaseStyles, className)} {...props} />
  ),
);
Radio.displayName = "Radio";
