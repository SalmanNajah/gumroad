import * as React from "react";

import { Form } from "$app/components/Admin/Form";
import type { User } from "$app/components/Admin/Users/User";
import { showAlert } from "$app/components/server-components/Alert";
import { FormFieldset, FormInput } from "$app/components/ui/Form";

type AdminUserMassTransferPurchasesProps = {
  user: User;
};

const AdminUserMassTransferPurchases = ({ user }: AdminUserMassTransferPurchasesProps) => (
  <>
    <hr />
    <details>
      <summary>
        <h3>Mass-transfer purchases</h3>
      </summary>
      <Form
        url={Routes.mass_transfer_purchases_admin_user_path(user.id)}
        method="POST"
        confirmMessage="Are you sure you want to Mass Transfer purchases for this user?"
        onSuccess={() => showAlert("Successfully transferred purchases.", "success")}
      >
        {(isLoading) => (
          <FormFieldset>
            <div className="grid grid-cols-[1fr_auto] gap-3">
              <FormInput type="email" name="mass_transfer_purchases[new_email]" placeholder="New email" required />
              <button type="submit" className="button" disabled={isLoading}>
                {isLoading ? "Transferring..." : "Transfer"}
              </button>
            </div>
            <small className="text-muted">Are you sure you want to Mass Transfer purchases for this user?</small>
          </FormFieldset>
        )}
      </Form>
    </details>
  </>
);

export default AdminUserMassTransferPurchases;
