import { classNames } from "$app/utils/classNames";
import * as React from "react";

import { CardProduct, Ratings } from "$app/parsers/product";
import { formatOrderOfMagnitude } from "$app/utils/formatOrderOfMagnitude";

import { Icon } from "$app/components/Icons";
import { AuthorByline } from "$app/components/Product/AuthorByline";
import { PriceTag } from "$app/components/Product/PriceTag";
import { Ribbon } from "$app/components/Product/Ribbon";
import { Thumbnail } from "$app/components/Product/Thumbnail";

export const Card = ({
  product,
  badge,
  footerAction,
  eager,
}: {
  product: CardProduct;
  badge?: React.ReactNode;
  footerAction?: React.ReactNode;
  eager?: boolean | undefined;
}) => (
  <article className="relative bg-background border border-border rounded grid grid-rows-[auto_1fr_auto] duration-transition-duration transition-all hover:shadow">
    <figure className="aspect-square rounded-t bg-[url('~images/placeholders/product-cover.png')] bg-cover border-b border-border overflow-hidden">
      <Thumbnail url={product.thumbnail_url} nativeType={product.native_type} eager={eager} className="h-full w-full object-cover" />
    </figure>
    <Ribbon quantityRemaining={product.quantity_remaining} />
    <header className="p-4 grid grid-rows-1 gap-3 border-b border-border">
      <a href={product.url} className="stretched-link">
        <h4 itemProp="name" className="line-clamp-4 lg:text-xl">
          {product.name}
        </h4>
      </a>
      {product.seller ? (
        <AuthorByline
          name={product.seller.name}
          profileUrl={product.seller.profile_url}
          avatarUrl={product.seller.avatar_url ?? undefined}
        />
      ) : null}
      {product.ratings?.count ? <Rating ratings={product.ratings} /> : null}
    </header>
    <footer className="flex">
      <div className="p-4 flex-1 border-r border-border">
        <PriceTag
          url={product.url}
          currencyCode={product.currency_code}
          price={product.price_cents}
          isPayWhatYouWant={product.is_pay_what_you_want}
          isSalesLimited={product.is_sales_limited}
          recurrence={
            product.recurrence ? { id: product.recurrence, duration_in_months: product.duration_in_months } : undefined
          }
          creatorName={product.seller?.name}
        />
      </div>
      {footerAction}
    </footer>
    {badge}
  </article>
);

export const HorizontalCard = ({ product, big, eager }: { product: CardProduct; big?: boolean; eager?: boolean }) => (
  <article className={classNames("relative bg-background border border-border rounded grid duration-transition-duration transition-all hover:shadow",
    "lg:grid-rows-none lg:grid-cols-[auto_1fr]"
  )}>
    <figure className={classNames(
      "aspect-square border-b border-border bg-[url('~images/placeholders/product-cover.png')] bg-cover rounded-t overflow-hidden",
      "lg:border-r lg:border-b-0 lg:rounded-l lg:rounded-tr-none"
    )}>
      <Thumbnail url={product.thumbnail_url} nativeType={product.native_type} eager={eager} className="lg:h-0 lg:min-h-full w-full object-cover" />
    </figure>
    <Ribbon quantityRemaining={product.quantity_remaining} />
    <section className="grid grid-rows-[1fr_auto] lg:gap-6 lg:p-4 lg:px-5">
      <header className={classNames("p-4 grid grid-rows-1 gap-3 border-b border-border",
        "lg:grid-rows-[repeat(auto-fit,minmax(0,min-content))] lg:p-0 lg:border-b-0"
      )}>
        <a href={product.url} className="stretched-link" draggable="false">
          {big ? (
            <h2 itemProp="name" className="line-clamp-3 gap-3">
              {product.name}
            </h2>
          ) : (
            <h3 itemProp="name" className="truncate">
              {product.name}
            </h3>
          )}
        </a>
        <small className={classNames(
          "hidden lg:block text-muted truncate",
          big && "lg:line-clamp-4"
        )}>
          {product.description}
        </small>
        {product.seller ? (
          <AuthorByline
            name={product.seller.name}
            profileUrl={product.seller.profile_url}
            avatarUrl={product.seller.avatar_url ?? undefined}
          />
        ) : null}
      </header>
      <footer className="flex items-center">
        <div className="p-4 border-r border-border flex-1 lg:p-0 lg:border-r-0">
          <PriceTag
            url={product.url}
            currencyCode={product.currency_code}
            price={product.price_cents}
            isPayWhatYouWant={product.is_pay_what_you_want}
            isSalesLimited={product.is_sales_limited}
            recurrence={
              product.recurrence ? { id: product.recurrence, duration_in_months: product.duration_in_months } : undefined
            }
            creatorName={product.seller?.name}
          />
        </div>
        {product.ratings?.count ? (
          <div className="p-4 lg:p-0">
            <Rating ratings={product.ratings} />
          </div>
        ) : null}
      </footer>
    </section>
  </article>
);

const Rating = ({ ratings, style }: { ratings: Ratings; style?: React.CSSProperties }) => (
  <div className="flex shrink-0 items-center gap-1" aria-label="Rating" style={style}>
    <Icon name="solid-star" />
    <span className="rating-average">{ratings.average.toFixed(1)}</span>
    <span title={`${ratings.average} ${ratings.average === 1 ? "rating" : "ratings"}`}>
      {`(${formatOrderOfMagnitude(ratings.count, 1)})`}
    </span>
  </div>
);
