import * as React from "react";

import { Form } from "$app/components/Admin/Form";
import { showAlert } from "$app/components/server-components/Alert";
import { FormFieldset, FormInput } from "$app/components/ui/form";

type AdminResendReceiptFormProps = {
  purchase_external_id: string;
  email: string;
};

export const AdminResendReceiptForm = ({ purchase_external_id, email }: AdminResendReceiptFormProps) => (
  <Form
    url={Routes.resend_receipt_admin_purchase_path(purchase_external_id)}
    method="POST"
    confirmMessage="Are you sure you want to resend the receipt?"
    onSuccess={() => showAlert("Receipt sent successfully.", "success")}
  >
    {(isLoading) => (
      <FormFieldset>
        <div className="flex gap-2">
          <FormInput type="email" className="flex-1" name="resend_receipt[email_address]" placeholder={email} />
          <button type="submit" className="button" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send"}
          </button>
        </div>
        <small className="text-muted">This will update the purchase email to this new one!</small>
      </FormFieldset>
    )}
  </Form>
);

export default AdminResendReceiptForm;
