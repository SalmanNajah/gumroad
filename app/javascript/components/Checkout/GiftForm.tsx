import * as React from "react";

import { Button } from "$app/components/Button";
import { useState, getErrors } from "$app/components/Checkout/payment";
import { Modal } from "$app/components/Modal";
import { Alert } from "$app/components/ui/Alert";
import { FormFieldset, FormInput, FormLabel, FormLegend, FormSwitch, FormTextarea } from "$app/components/ui/form";

export const GiftForm = ({ isMembership }: { isMembership: boolean }) => {
  const giftEmailUID = React.useId();
  const giftNoteUID = React.useId();
  const [cancellingPresetGift, setCancellingPresetGift] = React.useState(false);

  const [state, dispatch] = useState();
  const { gift } = state;
  const hasError = getErrors(state).has("gift");

  return (
    <div className="flex flex-col gap-4">
      <FormLabel className="flex w-full items-center gap-4">
        <FormSwitch
          checked={!!gift}
          onChange={(e) => {
            if (gift?.type === "anonymous") {
              e.preventDefault();
              setCancellingPresetGift(true);
            } else {
              dispatch({ type: "set-value", gift: gift ? null : { type: "normal", email: "", note: "" } });
            }
          }}
        />
        <h4>Give as a gift?</h4>
      </FormLabel>

      {gift ? (
        <div className="flex w-full flex-col gap-4">
          {isMembership ? (
            <Alert variant="info">
              Note: Free trials will be charged immediately. The membership will not auto-renew. The recipient must
              update the payment method to renew the membership.
            </Alert>
          ) : null}
          {gift.type === "normal" ? (
            <FormFieldset state={hasError ? "danger" : undefined}>
              <FormLegend>
                <FormLabel htmlFor={giftEmailUID}>Recipient email</FormLabel>
              </FormLegend>
              <FormInput
                id={giftEmailUID}
                type="email"
                value={gift.email}
                onChange={(evt) => dispatch({ type: "set-value", gift: { ...gift, email: evt.target.value } })}
                placeholder="Recipient email address"
                aria-invalid={hasError}
              />
            </FormFieldset>
          ) : (
            <Alert variant="info">
              {gift.name}'s email has been hidden for privacy purposes.{" "}
              <button className="underline" onClick={() => setCancellingPresetGift(true)}>
                Cancel gift option
              </button>
              <Modal
                open={cancellingPresetGift}
                onClose={() => setCancellingPresetGift(false)}
                footer={
                  <>
                    <Button onClick={() => setCancellingPresetGift(false)}>No, cancel</Button>
                    <Button
                      color="primary"
                      onClick={() => {
                        dispatch({ type: "set-value", gift: null });
                        setCancellingPresetGift(false);
                      }}
                    >
                      Yes, reset
                    </Button>
                  </>
                }
                title="Reset gift option?"
              >
                You are about to switch off the gift option. To gift this wishlist again, you will need to return to the
                wishlist page and select "Gift this product".
              </Modal>
            </Alert>
          )}
          <FormFieldset className="w-full">
            <FormLegend>
              <FormLabel htmlFor={giftNoteUID}>Message</FormLabel>
            </FormLegend>
            <FormTextarea
              id={giftNoteUID}
              value={gift.note}
              onChange={(evt) => dispatch({ type: "set-value", gift: { ...gift, note: evt.target.value } })}
              placeholder="A personalized message (optional)"
              className="w-full"
            />
          </FormFieldset>
        </div>
      ) : null}
    </div>
  );
};
