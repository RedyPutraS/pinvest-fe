import { CardSlider } from "components/slider/slider";
import type { ReactNode } from "react";
interface Props {
  children: ReactNode;
}

export function PiMarketCategorySlider(props: Props) {
  return (
    <>
      {/* mobile */}
      <div className="flex w-full touch-auto gap-3 overflow-x-auto bg-pv-white-pure  pt-4 no-scrollbar md:hidden">
        {props.children}
      </div>
      {/* desktop */}
      <div className="hidden justify-center py-[36px] md:flex">
        <div className="mb-8  w-full bg-pv-white-pure md:px-0">
          <CardSlider slidesToShow={6} slidesToScroll={1}>
            {props.children}
          </CardSlider>
        </div>
      </div>
    </>
  );
}
