import * as React from "react";

import { type Product } from "$app/components/Analytics";
import { Button } from "$app/components/Button";
import { Icon } from "$app/components/Icons";
import { Popover } from "$app/components/Popover";
import { FormCheckbox, FormFieldset, FormInputWrapper, FormLabel } from "$app/components/ui/Form";
import { Card, CardContent } from "$app/components/ui/Card";

export type ProductOption = Product & { selected: boolean };

export const ProductsPopover = ({
  products,
  setProducts,
}: {
  products: ProductOption[];
  setProducts: React.Dispatch<React.SetStateAction<ProductOption[]>>;
}) => (
  <Popover
    dropdownClassName="p-0!"
    trigger={
      <FormInputWrapper>
        <div className="flex-1">Select products...</div>
        <Icon name="outline-cheveron-down" />
      </FormInputWrapper>
    }
  >
    <Card className="border-none shadow-none">
      <CardContent>
        <FormFieldset className="grow basis-0">
          <FormLabel>
            <FormCheckbox
              checked={products.filter((product) => product.selected).length === products.length}
              onChange={(event) =>
                setProducts((prevProducts) =>
                  prevProducts.map((product) => ({ ...product, selected: event.target.checked })),
                )
              }
            />
            All products
          </FormLabel>
          {products.map(({ id, name, unique_permalink, selected }) => (
            <FormLabel key={id}>
              <FormCheckbox
                checked={selected}
                onChange={(event) =>
                  setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                      product.unique_permalink === unique_permalink
                        ? { ...product, selected: event.target.checked }
                        : product,
                    ),
                  )
                }
              />
              {name}
            </FormLabel>
          ))}
        </FormFieldset>
      </CardContent>
      <CardContent>
        <Button
          onClick={() =>
            setProducts((prevProducts) => prevProducts.map((product) => ({ ...product, selected: !product.selected })))
          }
          className="grow basis-0"
        >
          Toggle selected
        </Button>
      </CardContent>
    </Card>
  </Popover>
);
