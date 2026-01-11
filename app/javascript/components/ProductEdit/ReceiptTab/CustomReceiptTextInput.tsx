import * as React from "react";

import { FormFieldset, FormLabel, FormTextarea } from "$app/components/ui/Form";

export const CustomReceiptTextInput = ({
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
      <FormLabel htmlFor={uid}>Custom message</FormLabel>
      <FormTextarea
        id={uid}
        maxLength={maxLength}
        placeholder="Add any additional information you'd like to include on the receipt."
        value={value ?? ""}
        onChange={(evt) => onChange(evt.target.value)}
        rows={3}
      />
    </FormFieldset>
  );
};
