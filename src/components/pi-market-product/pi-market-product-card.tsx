import Typo from "components/typo/typo";
import React from "react";

export interface PiMarketProductCardProps {
  image: string;
  label: string;
  price: number;
  sold: number;
}

export default function PiMarketProductCard(props: PiMarketProductCardProps) {
  const { image, label, price, sold } = props;
  return (
    <div className="w-[176px] rounded-lg border md:w-[306px]">
      <div className="h-[176px] w-[176px] p-5 md:h-[306px] md:w-[306px] md:p-[36px]">
        <img src={image} alt={image} className="h-full w-full" />
      </div>
      <div className="flex flex-col md:hidden">
        <div className="text-center">
          <Typo.Caption>{label}</Typo.Caption>
        </div>
        <div className="flex items-center justify-between p-2">
          <div className="text-pv-cyan">
            <Typo.B1>Rp{price}</Typo.B1>
          </div>
          <div className="text-pv-grey-medium2">
            <Typo.Caption>{sold} terjual</Typo.Caption>
          </div>
        </div>
      </div>

      <div className="hidden flex-col md:flex">
        <div className="px-4 text-left">
          <Typo.B1>{label}</Typo.B1>
        </div>
        <div className="flex items-center justify-between p-4">
          <div className="text-pv-cyan">
            <Typo.H5>Rp{price}</Typo.H5>
          </div>
          <div className="text-pv-grey-medium2">
            <Typo.B1>{sold} terjual</Typo.B1>
          </div>
        </div>
      </div>
    </div>
  );
}
