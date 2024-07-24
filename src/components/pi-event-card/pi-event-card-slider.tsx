import { CardSlider } from "components/slider/slider";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function PiEventCardSlider({ children }: Props) {
  return (
    <>
      {/* mobile */}
      <div className="flex xl:hidden">
        <div className="mb-8 w-full bg-pv-white-pure md:px-0">
          <CardSlider slidesToScroll={2} slidesToShow={2}>
            {children}
          </CardSlider>
        </div>
      </div>
      {/* desktop */}
      <div className="hidden md:flex">
        <div className="mb-8 w-full bg-pv-white-pure md:px-0">
          <CardSlider>{children}</CardSlider>
        </div>
      </div>
    </>
  );
}
