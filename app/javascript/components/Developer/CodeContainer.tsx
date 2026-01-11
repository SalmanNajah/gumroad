import * as React from "react";

import { CopyToClipboard } from "$app/components/CopyToClipboard";
import { FormFieldset, FormLabel, FormLegend, FormTextarea } from "$app/components/ui/Form";

export const CodeContainer = ({ codeToCopy }: { codeToCopy: string }) => {
  const uid = React.useId();
  const textAreaRef = React.useRef<HTMLTextAreaElement | null>(null);
  React.useEffect(() => {
    if (!textAreaRef.current || textAreaRef.current.scrollHeight <= 0) return;

    textAreaRef.current.style.height = "1px";
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  }, [codeToCopy]);

  return (
    <FormFieldset>
      <FormLegend>
        <FormLabel htmlFor={uid}>Copy and paste this code into your website</FormLabel>
        <CopyToClipboard tooltipPosition="bottom" text={codeToCopy}>
          <button type="button" className="font-normal underline">
            Copy embed code
          </button>
        </CopyToClipboard>
      </FormLegend>
      <FormTextarea id={uid} ref={textAreaRef} aria-label="Widget code" readOnly value={codeToCopy} />
      <small className="text-muted">
        We highly recommend you have an SSL certificate to increase buyer confidence.
      </small>
    </FormFieldset>
  );
};
