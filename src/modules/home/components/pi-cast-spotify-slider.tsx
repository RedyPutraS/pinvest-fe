import { CardSlider } from "components/slider/slider";
import type { ReactNode } from "react";
interface Props {
  children: ReactNode;
}

export function PiCastSpotifySlider(props: Props) {
  return (
    <>
      {/* mobile */}
      <div className="flex md:hidden">
        <div className="my-4 w-full bg-pv-white-pure md:px-0">
          <CardSlider slidesToShow={2} slidesToScroll={2}>
            {props.children}
          </CardSlider>
        </div>
      </div>
      {/* desktop */}
      <div className="hidden md:flex">
        <div className="my-4 w-full bg-pv-white-pure md:px-0">
          <CardSlider>{props.children}</CardSlider>
        </div>
      </div>
      {/* <div className="hidden grid-cols-3 gap-2 md:grid">{props.children}</div> */}
    </>
  );
}
