import * as React from "react";

import { FormFieldset, FormInput, FormLabel, FormSmall } from "$app/components/ui/form";

export const CustomViewContentButtonTextInput = ({
  value,
  onChange,
  maxLength,
}: {
  value: string | null;
  onChange: (value: string) => void;
  maxLength: number;
}) => {
  const uid = React.useId();
  return (
    <FormFieldset>
      <FormLabel htmlFor={uid}>Button text</FormLabel>
      <FormInput
        id={uid}
        type="text"
        placeholder="View content"
        value={value ?? ""}
        onChange={(evt) => onChange(evt.target.value)}
        maxLength={maxLength}
      />
      <FormSmall>
        Customize the download button text on receipts and product pages (max {maxLength} characters).
      </FormSmall>
    </FormFieldset>
  );
};
