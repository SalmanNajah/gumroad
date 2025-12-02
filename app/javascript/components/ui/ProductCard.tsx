import * as React from "react";

import { classNames } from "$app/utils/classNames";

type BaseProps = {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

export const ProductCard = ({ children, className, ...props }: BaseProps) => (
  <article
    className={classNames(
      "relative grid grid-rows-[auto_1fr_auto] rounded border border-border bg-background transition-all duration-150 hover:shadow",
      className,
    )}
    {...props}
  >
    {children}
  </article>
);

export const ProductCardFigure = ({ children, className, ...props }: BaseProps) => (
  <figure
    className={classNames(
      "aspect-square overflow-hidden rounded-t border-b border-border bg-(image:--product-cover) bg-cover",
      className,
    )}
    {...props}
  >
    {children}
  </figure>
);

export const ProductCardHeader = ({ children, className, ...props }: BaseProps) => (
  <header className={classNames("grid grid-rows-1 gap-3 border-b border-border p-4", className)} {...props}>
    {children}
  </header>
);

export const ProductCardSection = ({ children, className, ...props }: BaseProps) => (
  <section className={classNames("grid grid-rows-[1fr_auto] gap-0 p-0 lg:gap-8 lg:px-6 lg:py-4", className)} {...props}>
    {children}
  </section>
);
