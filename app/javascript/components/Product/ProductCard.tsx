import { classNames } from "$app/utils/classNames";
import * as React from "react";

export const ProductCardArticle = ({
  children,
  className,
  variant = "vertical",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "vertical" | "horizontal";
} & React.HTMLAttributes<HTMLElement>) => (
  <article
    className={classNames(
      "relative bg-background border border-border rounded duration-150 transition-all hover:shadow grid grid-rows-[auto_1fr_auto]",
      variant === "horizontal" && "lg:grid-rows-none lg:grid-cols-[auto_1fr]",
      className,
    )}
    {...props}
  >
    {children}
  </article>
);

export const ProductCardFigure = ({
  children,
  className,
  variant = "vertical",
  style,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  variant?: "vertical" | "horizontal";
  style?: React.CSSProperties;
} & React.HTMLAttributes<HTMLElement>) => (
  <figure
    className={classNames(
      "aspect-square bg-[url('~images/placeholders/product-cover.png')] bg-cover overflow-hidden rounded-t border-b border-border",
      variant === "horizontal" && "lg:rounded-l lg:rounded-tr-none lg:border-r lg:border-b-0",
      className,
    )}
    style={style}
    {...props}
  >
    {children}
  </figure>
);

export const ProductCardHeader = ({
  children,
  className,
  variant = "vertical",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "vertical" | "horizontal";
} & React.HTMLAttributes<HTMLElement>) => (
  <header
    className={classNames(
      "p-4 grid grid-rows-1 gap-3 border-b border-border",
      variant === "horizontal" && "lg:grid-rows-[repeat(auto-fit,minmax(0,min-content))] lg:p-0 lg:border-b-0",
      className,
    )}
    {...props}
  >
    {children}
  </header>
);

export const ProductCardSection = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLElement>) => (
  <section className={classNames("grid grid-rows-[1fr_auto] gap-0 p-0 lg:gap-8 lg:px-6 lg:py-4", className)} {...props}>
    {children}
  </section>
);
