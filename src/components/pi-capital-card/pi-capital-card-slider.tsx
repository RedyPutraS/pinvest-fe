import type { ReactNode } from "react";
import { cn } from "utils";
interface Props {
  children: ReactNode;
  className?: string;
}

export function PiCapitalCardSlider({
  children,
  className = "bg-pv-white-light",
}: Props) {
  return (
    <>
      {/* mobile */}
      <div className={cn("mt-4 grid grid-cols-2 gap-4 md:hidden", className)}>
        {children}
      </div>
      {/* desktop */}
      <div className={cn("mt-8 hidden grid-cols-4 gap-6 pb-4 md:grid")}>
        {children}
      </div>

      {/* mobile */}
      {/* <div className="flex xl:hidden">
        <div className="mb-8 w-full bg-pv-white-pure">
          <CardSlider slidesToScroll={1} slidesToShow={3}>
            {children}
          </CardSlider>
        </div>
      </div> */}
      {/* desktop */}
      {/* <div className="hidden md:flex">
        <div className="mb-8 w-full bg-pv-white-pure">
          <CardSlider slidesToScroll={1} slidesToShow={3}>
            {children}
          </CardSlider>
        </div>
      </div> */}
    </>
  );
}
