import * as React from "react";
import { createCast, cast } from "ts-safe-cast";

import { request, ResponseError, assertResponseError } from "$app/utils/request";
import { register } from "$app/utils/serverComponentUtil";

import { Layout } from "$app/components/Authentication/Layout";
import { Button } from "$app/components/Button";
import { PasswordInput } from "$app/components/PasswordInput";
import { showAlert } from "$app/components/server-components/Alert";
import { FormFieldset, FormLabel, FormLegend } from "$app/components/ui/form";

export const PasswordResetPage = ({ reset_password_token }: { reset_password_token: string }) => {
  const uid = React.useId();
  const [password, setPassword] = React.useState("");
  const [passwordConfirmation, setPasswordConfirmation] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await request({
        method: "PUT",
        accept: "json",
        url: Routes.user_password_path(),
        data: {
          user: {
            password,
            password_confirmation: passwordConfirmation,
            reset_password_token,
          },
        },
      });
      if (!response.ok) {
        const json = cast<{ error_message?: string }>(await response.json());
        throw new ResponseError(json.error_message || "Failed to reset password");
      }
      window.location.href = Routes.root_path();
    } catch (e) {
      assertResponseError(e);
      showAlert(e.message, "error");
      setSubmitting(false);
    }
  };

  return (
    <Layout header={<h1>Reset your password</h1>} headerActions={<a href={Routes.login_path()}>Log in</a>}>
      <form onSubmit={(e) => void handleSubmit(e)}>
        <section className="grid gap-8 pb-12">
          <FormFieldset>
            <FormLegend>
              <FormLabel htmlFor={`${uid}-password`}>Enter a new password</FormLabel>
            </FormLegend>
            <PasswordInput
              id={`${uid}-password`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              autoFocus
              autoComplete="new-password"
            />
          </FormFieldset>
          <FormFieldset>
            <FormLegend>
              <FormLabel htmlFor={`${uid}-password-confirmation`}>Enter same password to confirm</FormLabel>
            </FormLegend>
            <PasswordInput
              id={`${uid}-password-confirmation`}
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              placeholder="Password (to confirm)"
              required
              autoComplete="new-password"
            />
          </FormFieldset>
          <Button color="primary" type="submit" disabled={submitting}>
            Reset password
          </Button>
        </section>
      </form>
    </Layout>
  );
};

export default register({ component: PasswordResetPage, propParser: createCast() });
