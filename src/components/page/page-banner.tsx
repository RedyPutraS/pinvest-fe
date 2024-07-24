import type { ReactNode } from "react";
import { cn } from "utils";

type Props = {
  children?: ReactNode;
  className?: string;
};

function PageBanner({ children, className }: Props) {
  return (
    <div className="flex justify-center">
      <div
        className={cn(
          "flex w-screen flex-col items-center justify-center bg-pv-blue-light xl:max-w-[1440px]",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default PageBanner;
