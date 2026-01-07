import * as React from "react";
import { createCast } from "ts-safe-cast";

import { register } from "$app/utils/serverComponentUtil";

import { Form } from "$app/components/server-components/Admin/Form";
import { showAlert } from "$app/components/server-components/Alert";
import { FormFieldset, FormInput, FormSmall } from "$app/components/ui/form";

export const AdminResendReceiptForm = ({ purchase_id, email }: { purchase_id: number; email: string }) => (
  <Form
    url={Routes.resend_receipt_admin_purchase_path(purchase_id)}
    method="POST"
    confirmMessage="Are you sure you want to resend the receipt?"
    onSuccess={() => showAlert("Receipt sent successfully.", "success")}
  >
    {(isLoading) => (
      <FormFieldset>
        <div className="input-with-button">
          <FormInput type="email" name="resend_receipt[email_address]" placeholder={email} />
          <button type="submit" className="button" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send"}
          </button>
        </div>
        <FormSmall>This will update the purchase email to this new one!</FormSmall>
      </FormFieldset>
    )}
  </Form>
);

export default register({ component: AdminResendReceiptForm, propParser: createCast() });
