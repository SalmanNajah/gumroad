import * as React from "react";
import { createCast } from "ts-safe-cast";

import { register } from "$app/utils/serverComponentUtil";

import { Form } from "$app/components/server-components/Admin/Form";
import { showAlert } from "$app/components/server-components/Alert";
import { FormFieldset, FormInput, FormInputWrapper } from "$app/components/ui/Form";
import { Pill } from "$app/components/ui/Pill";

export const AdminAddCreditForm = ({ user_id }: { user_id: number }) => (
  <Form
    url={Routes.add_credit_admin_user_path(user_id)}
    method="POST"
    confirmMessage="Are you sure you want to add credits?"
    onSuccess={() => showAlert("Successfully added credits.", "success")}
  >
    {(isLoading) => (
      <FormFieldset>
        <div className="input-with-button">
          <FormInputWrapper>
            <Pill className="-ml-2 shrink-0">$</Pill>
            <FormInput
              asChild
              type="text"
              name="credit[credit_amount]"
              placeholder="10.25"
              inputMode="decimal"
              required
            />
          </FormInputWrapper>
          <button type="submit" className="button" disabled={isLoading}>
            {isLoading ? "Saving..." : "Add credits"}
          </button>
        </div>
        <small className="text-muted">Subtract credits by providing a negative value</small>
      </FormFieldset>
    )}
  </Form>
);

export default register({ component: AdminAddCreditForm, propParser: createCast() });
