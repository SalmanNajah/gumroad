import * as React from "react";

import { Form } from "$app/components/Admin/Form";
import type { User } from "$app/components/Admin/Users/User";
import { showAlert } from "$app/components/server-components/Alert";
import { Pill } from "$app/components/ui/Pill";
import { InputGroup } from "$app/components/ui/InputGroup";
import { Input } from "$app/components/ui/Input";
import { Fieldset } from "$app/components/ui/Fieldset";

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
          <Fieldset>
            <div className="flex gap-2">
              <InputGroup className="flex-1">
                <Pill className="-ml-2 shrink-0">$</Pill>
                <Input type="text" name="credit[credit_amount]" placeholder="10.25" inputMode="decimal" required />
              </InputGroup>

              <button type="submit" className="button" disabled={isLoading}>
                {isLoading ? "Saving..." : "Add credits"}
              </button>
            </div>

            <small className="text-muted">Subtract credits by providing a negative value</small>
          </Fieldset>
        )}
      </Form>
    </details>
  </>
);

export default AdminUserAddCredit;
