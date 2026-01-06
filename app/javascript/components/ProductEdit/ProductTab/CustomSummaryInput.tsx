import * as React from "react";

import { FormFieldset, FormInput, FormLabel } from "$app/components/ui/form";

export const CustomSummaryInput = ({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (value: string) => void;
}) => {
  const uid = React.useId();
  return (
    <FormFieldset>
      <FormLabel htmlFor={uid}>Summary</FormLabel>
      <FormInput
        id={uid}
        type="text"
        placeholder="You'll get..."
        value={value ?? ""}
        onChange={(evt) => onChange(evt.target.value)}
      />
    </FormFieldset>
  );
};
