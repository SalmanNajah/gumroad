import * as React from "react";

export const Ribbon = ({ children }: { children: React.ReactNode }) => {

  return (
    <div
      className="absolute top-0 left-[-1.464rem] bg-accent border border-border text-sm text-center w-20 -translate-y-full origin-bottom-right -rotate-45"
      style={{
        clipPath: 'polygon(calc(1lh + 2 * var(--border-width)) 0, calc(100% - (1lh + 2 * var(--border-width))) 0, 100% 100%, 0 100%)'
      }}
    >
      {children}
    </div>
  );
};
