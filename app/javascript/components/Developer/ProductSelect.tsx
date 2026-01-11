import * as React from "react";

import { FormFieldset, FormLabel, FormLegend, FormSelect } from "$app/components/ui/Form";

export type Product = {
  name: string;
  script_base_url: string;
  url: string;
  gumroad_domain_url: string;
};

export const ProductSelect = ({
  products,
  affiliatedProducts,
  selectedProductUrl,
  onProductSelectChange,
}: {
  products: Product[];
  affiliatedProducts: Product[];
  selectedProductUrl: string;
  onProductSelectChange: (product: Product) => void;
}) => {
  const uid = React.useId();

  const dispatchChangeEvent = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    const product =
      products.find((product) => product.url === evt.target.value) ||
      affiliatedProducts.find((product) => product.url === evt.target.value);
    if (product) onProductSelectChange(product);
    return true;
  };

  return (
    <FormFieldset>
      <FormLegend>
        <FormLabel htmlFor={uid}>Choose your product</FormLabel>
      </FormLegend>
      <FormSelect id={uid} value={selectedProductUrl} onChange={dispatchChangeEvent}>
        <optgroup label="Your products">
          {products.map((product) => (
            <option key={product.url} value={product.url}>
              {product.name}
            </option>
          ))}
        </optgroup>

        {affiliatedProducts.length !== 0 ? (
          <optgroup label="Affiliated products">
            {affiliatedProducts.map((affiliatedProduct) => (
              <option key={affiliatedProduct.url} value={affiliatedProduct.url}>
                {affiliatedProduct.name}
              </option>
            ))}
          </optgroup>
        ) : null}
      </FormSelect>
    </FormFieldset>
  );
};
