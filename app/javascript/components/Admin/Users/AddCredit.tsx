import * as React from "react";

import { Form } from "$app/components/Admin/Form";
import type { User } from "$app/components/Admin/Users/User";
import { showAlert } from "$app/components/server-components/Alert";
import { FormFieldset, FormInput, FormInputWrapper } from "$app/components/ui/Form";
import { Pill } from "$app/components/ui/Pill";

type AdminUserAddCreditProps = {
  user: User;
};

const AdminUserAddCredit = ({ user }: AdminUserAddCreditProps) => (
  <>
    <hr />
    <details>
      <summary>
        <h3>Add credits</h3>
      </summary>
      <Form
        url={Routes.add_credit_admin_user_path(user.external_id)}
        method="POST"
        confirmMessage="Are you sure you want to add credits?"
        onSuccess={() => showAlert("Successfully added credits.", "success")}
      >
        {(isLoading) => (
          <FormFieldset>
            <div className="flex gap-2">
              <FormInputWrapper className="flex-1">
                <Pill className="-ml-2 shrink-0">$</Pill>
                <FormInput type="text" name="credit[credit_amount]" placeholder="10.25" inputMode="decimal" required />
              </FormInputWrapper>

              <button type="submit" className="button" disabled={isLoading}>
                {isLoading ? "Saving..." : "Add credits"}
              </button>
            </div>

            <small className="text-muted">Subtract credits by providing a negative value</small>
          </FormFieldset>
        )}
      </Form>
    </details>
  </>
);

export default AdminUserAddCredit;
