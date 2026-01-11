import * as React from "react";

import { CopyToClipboard } from "$app/components/CopyToClipboard";
import { useCurrentSeller } from "$app/components/CurrentSeller";
import { FormFieldset, FormInput, FormInputWrapper, FormLabel, FormLegend } from "$app/components/ui/Form";
import { Pill } from "$app/components/ui/Pill";

export const CustomPermalinkInput = ({
  value,
  onChange,
  uniquePermalink,
  url,
}: {
  value: string | null;
  onChange: (value: string | null) => void;
  uniquePermalink: string;
  url: string;
}) => {
  const uid = React.useId();
  const currentSeller = useCurrentSeller();

  if (!currentSeller) return null;

  return (
    <FormFieldset>
      <FormLegend>
        <FormLabel htmlFor={uid}>URL</FormLabel>
        <CopyToClipboard text={url}>
          <button type="button" className="font-normal underline">
            Copy URL
          </button>
        </CopyToClipboard>
      </FormLegend>
      <FormInputWrapper>
        <Pill className="-ml-2 shrink-0">{`${currentSeller.subdomain}/l/`}</Pill>
        <FormInput
          id={uid}
          type="text"
          placeholder={uniquePermalink}
          value={value ?? ""}
          onChange={(evt) => onChange(evt.target.value.replace(/\s/gu, "") || null)}
        />
      </FormInputWrapper>
    </FormFieldset>
  );
};
