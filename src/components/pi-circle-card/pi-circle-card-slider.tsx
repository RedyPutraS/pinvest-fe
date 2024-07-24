import { CardSlider } from "components/slider/slider";
import type { ReactNode } from "react";
interface Props {
  children: ReactNode;
}

export function PiCircleCardSlider(props: Props) {
  return (
    <>
      {/* mobile */}
      <div className="flex xl:hidden">
        <div className="mb-8 w-full bg-pv-white-pure md:px-0">
          <CardSlider slidesToScroll={2} slidesToShow={2}>
            {props.children}
          </CardSlider>
        </div>
      </div>
      {/* desktop */}
      <div className="hidden lg:flex">
        <div className="mb-8 w-full bg-pv-white-pure md:px-0">
          <CardSlider>{props.children}</CardSlider>
        </div>
      </div>
    </>
  );
}
