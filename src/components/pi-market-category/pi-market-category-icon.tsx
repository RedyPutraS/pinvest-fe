import Typo from "components/typo/typo";
import React from "react";

interface PiMarketCategoryIconProps {
  image: string;
  label: string;
}

export default function PiMarketCategoryIcon(props: PiMarketCategoryIconProps) {
  const { image, label } = props;
  return (
    <div className="flex h-[114px] w-[114px] flex-col items-center gap-2 rounded-lg bg-pv-white-light py-3 px-6 lg:h-[196px]  lg:w-[196px] lg:py-[27px]">
      <div className="h-16 w-16 rounded-lg bg-pv-grey-light3 lg:h-[110px] lg:w-[110px]">
        <img src={image} alt={image} className="h-full w-full" />
      </div>
      <Typo.S1 className="font-semibold">{label}</Typo.S1>
    </div>
  );
}
