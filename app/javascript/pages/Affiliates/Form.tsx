import * as React from "react";

import { NumberInput } from "$app/components/NumberInput";
import { FormFieldset, FormInput, FormInputWrapper, FormLabel, FormSection, FormSwitch } from "$app/components/ui/Form";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "$app/components/ui/Table";

export type AffiliateProduct = {
  id: number;
  name: string;
  enabled: boolean;
  fee_percent: number | null;
  destination_url: string | null;
  referral_url: string;
};

export type AffiliateFormData = {
  email: string;
  products: AffiliateProduct[];
  fee_percent: number | null;
  apply_to_all_products: boolean;
  destination_url: string | null;
};

type Props = {
  data: AffiliateFormData;
  errors: Record<string, string>;
  processing: boolean;
  applyToAllProducts: boolean;
  uid: string;
  emailField: React.ReactNode;
  headerText: string;
  onToggleAllProducts: (checked: boolean) => void;
  onUpdateFeePercent: (value: number | null) => void;
  onUpdateDestinationUrl: (value: string) => void;
  onUpdateProduct: (productId: number, updates: Partial<AffiliateProduct>) => void;
};

export const AffiliateForm = ({
  data,
  errors,
  processing,
  applyToAllProducts,
  uid,
  emailField,
  headerText,
  onToggleAllProducts,
  onUpdateFeePercent,
  onUpdateDestinationUrl,
  onUpdateProduct,
}: Props) => (
  <FormSection
    className="p-4! md:p-8!"
    header={
      <span
        dangerouslySetInnerHTML={{
          __html: `${headerText} <a href='/help/article/333-affiliates-on-gumroad' target='_blank' rel='noreferrer'>Learn more</a>`,
        }}
      />
    }
  >
    {emailField}
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Enable</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Commission</TableHead>
          <TableHead>
            <a href="/help/article/333-affiliates-on-gumroad" target="_blank" rel="noreferrer">
              Destination URL (optional)
            </a>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <FormSwitch
              id={`${uid}enableAllProducts`}
              checked={applyToAllProducts}
              onChange={(e) => onToggleAllProducts(e.target.checked)}
              aria-label="Enable all products"
            />
          </TableCell>
          <TableCell>
            <FormLabel htmlFor={`${uid}enableAllProducts`}>All products</FormLabel>
          </TableCell>
          <TableCell>
            <FormFieldset state={errors["affiliate.fee_percent"] ? "danger" : undefined}>
              <NumberInput onChange={(value) => onUpdateFeePercent(value)} value={data.fee_percent}>
                {(inputProps) => (
                  <FormInputWrapper disabled={processing || !applyToAllProducts}>
                    <FormInput
                      asChild
                      type="text"
                      autoComplete="off"
                      placeholder="Commission"
                      disabled={processing || !applyToAllProducts}
                      {...inputProps}
                    />
                    <div className="pill">%</div>
                  </FormInputWrapper>
                )}
              </NumberInput>
            </FormFieldset>
          </TableCell>
          <TableCell>
            <FormFieldset state={errors["affiliate.destination_url"] ? "danger" : undefined}>
              <FormInput
                type="url"
                value={data.destination_url || ""}
                placeholder="https://link.com"
                onChange={(e) => onUpdateDestinationUrl(e.target.value)}
                disabled={processing || !applyToAllProducts}
              />
            </FormFieldset>
          </TableCell>
        </TableRow>
        {data.products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              <FormSwitch
                checked={product.enabled}
                onChange={(e) => onUpdateProduct(product.id, { enabled: e.target.checked })}
                disabled={processing}
                aria-label="Enable product"
              />
            </TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>
              <NumberInput
                onChange={(value) => onUpdateProduct(product.id, { fee_percent: value })}
                value={product.fee_percent}
              >
                {(inputProps) => (
                  <FormInputWrapper disabled={processing || !product.enabled}>
                    <FormInput
                      asChild
                      type="text"
                      autoComplete="off"
                      placeholder="Commission"
                      disabled={processing || !product.enabled}
                      {...inputProps}
                    />
                    <div className="pill">%</div>
                  </FormInputWrapper>
                )}
              </NumberInput>
            </TableCell>
            <TableCell>
              <FormInput
                type="text"
                placeholder="https://link.com"
                value={product.destination_url || ""}
                onChange={(e) => onUpdateProduct(product.id, { destination_url: e.target.value })}
                disabled={processing || !product.enabled}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </FormSection>
);
