import { classNames } from "$app/utils/classNames";
import * as React from "react";

import { CardProduct, Ratings } from "$app/parsers/product";
import { formatOrderOfMagnitude } from "$app/utils/formatOrderOfMagnitude";

import { Icon } from "$app/components/Icons";
import { AuthorByline } from "$app/components/Product/AuthorByline";
import { PriceTag } from "$app/components/Product/PriceTag";
import {
  ProductCard,
  ProductCardFigure,
  ProductCardHeader,
  ProductCardSection,
} from "$app/components/ui/ProductCard";
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
  <ProductCard>
    <ProductCardFigure>
      <Thumbnail url={product.thumbnail_url} nativeType={product.native_type} eager={eager} className="h-full w-full object-cover" />
    </ProductCardFigure>
    <Ribbon quantityRemaining={product.quantity_remaining} />
    <ProductCardHeader>
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
    </ProductCardHeader>
    <footer className="flex *:not-last:border-r *:not-last:border-border">
      <div className="flex-1 p-4">
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
  </ProductCard>
);

export const HorizontalCard = ({ product, big, eager }: { product: CardProduct; big?: boolean; eager?: boolean }) => (
  <ProductCard className="lg:grid-rows-none lg:grid-cols-[auto_1fr]">
    <ProductCardFigure className="lg:rounded-l lg:rounded-tr-none lg:border-r lg:border-b-0">
      <Thumbnail url={product.thumbnail_url} nativeType={product.native_type} eager={eager} className="lg:h-0 lg:min-h-full w-full object-cover" />
    </ProductCardFigure>
    <Ribbon quantityRemaining={product.quantity_remaining} />
    <ProductCardSection>
      <ProductCardHeader className="lg:grid-rows-[repeat(auto-fit,minmax(0,min-content))] lg:p-0 lg:border-b-0">
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
      </ProductCardHeader>
      <footer className="flex items-center">
        <div className="flex-1 p-4 border-r border-border lg:p-0 lg:border-r-0">
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
    </ProductCardSection>
  </ProductCard>
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
