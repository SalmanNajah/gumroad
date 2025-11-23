import { classNames } from "$app/utils/classNames";
import * as React from "react";

type BaseProps = {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

export const ProductCard = ({ children, className, ...props }: BaseProps) => (
  <article
    className={classNames(
      "relative bg-background border border-border rounded duration-150 transition-all hover:shadow grid grid-rows-[auto_1fr_auto]",
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
      "aspect-square bg-[url('~images/placeholders/product-cover.png')] bg-cover overflow-hidden rounded-t border-b border-border",
      className,
    )}
    {...props}
  >
    {children}
  </figure>
);

export const ProductCardHeader = ({ children, className, ...props }: BaseProps) => (
  <header
    className={classNames(
      "p-4 grid grid-rows-1 gap-3 border-b border-border",
      className,
    )}
    {...props}
  >
    {children}
  </header>
);

export const ProductCardSection = ({ children, className, ...props }: BaseProps) => (
  <section className={classNames("grid grid-rows-[1fr_auto] gap-0 p-0 lg:gap-8 lg:px-6 lg:py-4", className)} {...props}>
    {children}
  </section>
);
