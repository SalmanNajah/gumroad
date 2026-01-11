import * as React from "react";

import { FormSwitch } from "$app/components/ui/Form";

export const Toggle = ({
  value,
  onChange,
  id,
  disabled,
  children,
  ariaLabel,
}: {
  value: boolean;
  onChange?: ((newValue: boolean) => void) | undefined;
  id?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  ariaLabel?: string;
}) => (
  <FormSwitch
    id={id}
    checked={value}
    onChange={(evt) => onChange?.(evt.target.checked)}
    disabled={disabled}
    aria-label={ariaLabel}
    label={children}
  />
);
