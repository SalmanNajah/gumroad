import { FastAverageColor } from "fast-average-color";
import * as React from "react";
import { cast } from "ts-safe-cast";

import useLazyLoadingProps from "$app/hooks/useLazyLoadingProps";
import { formatOrderOfMagnitude } from "$app/utils/formatOrderOfMagnitude";
import { getCssVariable } from "$app/utils/styles";

import { Icon } from "$app/components/Icons";
import { AuthorByline } from "$app/components/Product/AuthorByline";
import { useFollowWishlist } from "$app/components/Wishlist/FollowButton";
import { classNames } from "$app/utils/classNames";

const nativeTypeThumbnails = require.context("$assets/images/native_types/thumbnails/");

export type CardWishlist = {
  id: string;
  url: string;
  name: string;
  description: string | null;
  seller: { id: string; name: string; profile_url: string; avatar_url: string };
  thumbnails: { url: string | null; native_type: string }[];
  product_count: number;
  follower_count: number;
  following: boolean;
  can_follow: boolean;
};

type CardProps = {
  wishlist: CardWishlist;
  hideSeller?: boolean;
  eager?: boolean;
};

export const Card = ({ wishlist, hideSeller, eager }: CardProps) => {
  const { isFollowing, isLoading, toggleFollowing } = useFollowWishlist({
    wishlistId: wishlist.id,
    wishlistName: wishlist.name,
    initialValue: wishlist.following,
  });
  const lazyLoadingProps = useLazyLoadingProps({ eager });

  const thumbnailUrl = wishlist.thumbnails.find((thumbnail) => thumbnail.url)?.url;
  const [backgroundColor, setBackgroundColor] = React.useState<string>(thumbnailUrl ? "transparent" : "var(--pink)");
  React.useEffect(() => {
    const updateBackgroundColor = async () => {
      if (!thumbnailUrl) return;
      const validColors = ["--pink", "--purple", "--green", "--orange", "--red", "--yellow"].map((color) =>
        getCssVariable(color),
      );

      const {
        value: [r, g, b],
      } = await new FastAverageColor().getColorAsync(thumbnailUrl);

      const distances = validColors.map((hex) => {
        const [vr, vg, vb] = cast<[number, number, number]>(
          hex
            .slice(1)
            .match(/.{2}/gu)
            ?.map((x) => parseInt(x, 16)),
        );
        return Math.sqrt((r - vr) ** 2 + (g - vg) ** 2 + (b - vb) ** 2);
      });
      const closestValidColor = validColors[distances.indexOf(Math.min(...distances))];
      if (closestValidColor) {
        setBackgroundColor(closestValidColor);
      }
    };
    void updateBackgroundColor();
  }, [thumbnailUrl]);

  return (
    <article className="relative bg-filled border border-border rounded transition-all duration-transition-duration ease-out hover:shadow grid grid-rows-[auto_1fr_auto] lg:flex lg:flex-row">
      <figure
        className={classNames(
          "aspect-square bg-accent border-b border-border overflow-hidden rounded-t grid gap-1 p-2 bg-no-repeat lg:h-full lg:flex-[1] lg:border-r lg:border-b-0 lg:rounded-l lg:rounded-tr-none",
          wishlist.thumbnails.length >= 2 && "grid-cols-2",
        )}
        style={{ backgroundColor }}
      >
        {wishlist.thumbnails.map(({ url, native_type }, index) => (
          <img
            key={index}
            src={url ?? cast(nativeTypeThumbnails(`./${native_type}.svg`))}
            role="presentation"
            crossOrigin="anonymous"
            className="aspect-square bg-[url('~images/placeholders/product-cover.png')] bg-cover rounded border border-border w-full h-full object-cover"
            {...lazyLoadingProps}
          />
        ))}
        {wishlist.thumbnails.length === 0 ? <img role="presentation" className="w-full h-full object-cover" /> : null}
      </figure>
      <section className="grid grid-rows-[1fr_auto] lg:flex-[2] lg:gap-8 lg:py-4 lg:px-6">
        <header className="p-4 grid grid-rows-1 gap-3 border-b border-border lg:grid-rows-[repeat(auto-fit,minmax(0,min-content))] lg:p-0 lg:border-b-0">
          <a className="stretched-link no-underline" href={wishlist.url}>
            <h3 className="truncate">{wishlist.name}</h3>
          </a>
          {wishlist.description ? (
            <small className="hidden lg:block text-muted truncate">
              {wishlist.description}
            </small>
          ) : null}
          {hideSeller ? null : (
            <AuthorByline
              name={wishlist.seller.name}
              profileUrl={wishlist.seller.profile_url}
              avatarUrl={wishlist.seller.avatar_url}
            />
          )}
        </header>
        <footer className="flex">
          <div className="p-4 flex-1 flex items-center gap-3 lg:p-0">
            <span className="hidden lg:inline">
              <span className="icon icon-file-text-fill" /> {wishlist.product_count}{" "}
              {wishlist.product_count === 1 ? "product" : "products"}
            </span>
            <span>
              <span className="icon icon-bookmark-fill" /> {formatOrderOfMagnitude(wishlist.follower_count, 1)}{" "}
              {wishlist.follower_count === 1 ? "follower" : "followers"}
            </span>
          </div>
          {/* // need to check this part  */}
          {wishlist.can_follow ? (
            <a
              onClick={() => void toggleFollowing()}
              className="p-4 text-xl border-r border-border last:border-r-0 lg:p-0"
              role="button"
              aria-disabled={isLoading}
            >
              <Icon name={isFollowing ? "bookmark-check-fill" : "bookmark-plus"} />
            </a>
          ) : null}
        </footer>
      </section>
    </article>
  );
};

// once verify all the above ones with product.scss and after this think of putting the article and figure into one component instead of repeating the same code again and again

export const CardGrid = ({ children }: { children: React.ReactNode }) => (
  <div className="@container">
    <div className="grid gap-4 @lg:grid-cols-2">{children}</div>
  </div>
);

export const DummyCardGrid = ({ count }: { count: number }) => (
  <CardGrid>
    {Array(count)
      .fill(0)
      .map((_, i) => (
        <div key={i} className="dummy" style={{ aspectRatio: "3 / 1", paddingBottom: 0 }} />
      ))}
  </CardGrid>
);
