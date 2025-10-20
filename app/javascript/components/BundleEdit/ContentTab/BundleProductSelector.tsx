import * as React from "react";

import { BundleProduct } from "$app/components/BundleEdit/state";
import { Thumbnail } from "$app/components/Product/Thumbnail";
export const BundleProductSelector = ({
  bundleProduct,
  selected,
  onToggle,
}: {
  bundleProduct: BundleProduct;
  selected?: boolean;
  onToggle: () => void;
}) => {

  return (
    <label role="listitem" className="grid border-t border-border first:border-t-0">
      <section className="grid grid-cols-[3.625rem_1fr_auto] gap-4 p-4 sm:grid-cols-[5rem_1fr_auto] sm:p-0 sm:pr-4">
        <figure className="bg-[url('~images/placeholders/product-cover.png')] bg-center bg-cover aspect-square border border-border rounded overflow-hidden sm:border-0 sm:border-r sm:border-border sm:rounded-none sm:h-full">
          <Thumbnail url={bundleProduct.thumbnail_url} nativeType={bundleProduct.native_type} className="w-full h-full" />
        </figure>
        <section className="flex flex-col gap-1 sm:py-4">
          <h4 className="font-bold line-clamp-2">{bundleProduct.name}</h4>
          {bundleProduct.variants ? (
            <footer className="mt-auto">
              {bundleProduct.variants.list.length} {bundleProduct.variants.list.length === 1 ? "version" : "versions"}{" "}
              available
            </footer>
          ) : null}
        </section>
        <section className="flex flex-col gap-1 sm:py-4 last:items-end justify-center">
          <input type="checkbox" checked={!!selected} onChange={onToggle} />
        </section>
      </section>
    </label>
  );
};
