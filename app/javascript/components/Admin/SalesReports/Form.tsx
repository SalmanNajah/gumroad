import { useForm } from "@inertiajs/react";
import { subMonths } from "date-fns";
import * as React from "react";
import { cast } from "ts-safe-cast";

import Errors from "$app/components/Admin/Form/Errors";
import { Input } from "$app/components/ui/Input";
import { Section } from "$app/components/ui/Section";
import { Label } from "$app/components/ui/Label";
import { Select } from "$app/components/ui/Select";
import { Button } from "$app/components/Button";

type Props = {
  countries: [string, string][];
  sales_types: [string, string][];
  authenticityToken: string;
};

type Errors = {
  authenticity_token?: string[];
  sales_report?: {
    country_code?: string[];
    start_date?: string[];
    end_date?: string[];
    sales_type?: string[];
  };
};

const AdminSalesReportsForm = ({ countries, sales_types, authenticityToken }: Props) => {
  const defaultStartDate = React.useMemo(() => subMonths(new Date(), 1).toISOString().split("T")[0], []);
  const defaultEndDate = React.useMemo(() => new Date().toISOString().split("T")[0], []);

  const form = useForm({
    authenticity_token: authenticityToken,
    sales_report: {
      country_code: "",
      start_date: defaultStartDate,
      end_date: defaultEndDate,
      sales_type: sales_types[0]?.[0],
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    form.post(Routes.admin_sales_reports_path(), {
      only: ["job_history", "errors", "flash"],
      onSuccess: () => form.resetAndClearErrors(),
    });
  };

  const errors = cast<Errors>(form.errors);

  return (
    <form onSubmit={handleSubmit}>
      <Section className="p-4 md:p-8" header="Generate sales report with custom date ranges">
        <div className="grid grid-rows-[auto_1fr] gap-3">
          <Label htmlFor="country_code">Country</Label>
          <Select
            name="sales_report[country_code]"
            id="country_code"
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              form.setData("sales_report.country_code", event.target.value)
            }
            value={form.data.sales_report.country_code}
            required
          >
            <option value="">Select country</option>
            {countries.map(([name, code]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </Select>
          <Errors errors={errors.sales_report?.country_code} label="Country code" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="grid grid-rows-[auto_1fr] gap-3">
            <Label htmlFor="start_date">Start date</Label>
            <Input
              name="sales_report[start_date]"
              id="start_date"
              type="date"
              required
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                form.setData("sales_report.start_date", event.target.value)
              }
              value={form.data.sales_report.start_date}
            />
            <Errors errors={errors.sales_report?.start_date} label="Start date" />
          </div>

          <div className="grid grid-rows-[auto_1fr] gap-3">
            <Label htmlFor="end_date">End date</Label>
            <Input
              name="sales_report[end_date]"
              id="end_date"
              type="date"
              required
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                form.setData("sales_report.end_date", event.target.value)
              }
              value={form.data.sales_report.end_date}
            />
            <Errors errors={errors.sales_report?.end_date} label="End date" />
          </div>
        </div>

        <div className="grid grid-rows-[auto_1fr] gap-3">
          <Label htmlFor="sales_type">Type of sales</Label>
          <Select
            name="sales_report[sales_type]"
            id="sales_type"
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              form.setData("sales_report.sales_type", event.target.value)
            }
            value={form.data.sales_report.sales_type}
            required
          >
            {sales_types.map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </Select>
          <Errors errors={errors.sales_report?.sales_type} label="Type of sales" />
        </div>

        <Button type="submit" color="primary" disabled={form.processing}>
          {form.processing ? "Generating..." : "Generate report"}
        </Button>

        <input type="hidden" name="authenticity_token" value={form.data.authenticity_token} />
      </Section>
    </form>
  );
};

export default AdminSalesReportsForm;
