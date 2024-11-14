import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Button from "components/button/button";
import { CardSlider } from "components/slider/slider";
import Typo from "components/typo/typo";
import Link from "next/link";
import type { ReactNode } from "react";
interface Props {
  children: ReactNode;
  data: any,
  href: string,
  activeTab: any
}

export function PiCircleCardSlider(props: Props) {
  return (
    <>
      {/* mobile */}
      <div className="flex xl:hidden">
        <div className="w-full bg-pv-white-pure md:px-0">
          <CardSlider slidesToScroll={2} slidesToShow={2}>
            {props.children}
          </CardSlider>
        </div>
      </div>
      {/* desktop */}
      <div className="hidden xl:flex">
        <div className="xl:mb-2 w-full bg-pv-white-pure md:px-0">
          <CardSlider>{props.children}</CardSlider>
        </div>
      </div>

      {props.data && props.data.length > 0 && (
        <>
          <div className="flex items-center justify-end xl:hidden">
            <Link href={`${props.href}${props.activeTab}`}>
              <Typo.S2 className="mt-2 font-semibold text-gray-600">
                <Button
                  variant="text"
                  color="blue-gray"
                  className="text-[10px] md:text-base flex items-center gap-1 md:gap-2 rounded-md text-gray-600 px-3"
                >
                  Lihat semua
                  <ArrowRightIcon strokeWidth={2} className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
              </Typo.S2>
            </Link>
          </div>

          <div className="mr-2 hidden items-center justify-end xl:flex">
            <Link href={`${props.href}${props.activeTab}`}>
              <Typo.H6 className="m-0 font-semibold text-gray-600 hover:opacity-60 xl:mt-3">
                <Button
                  variant="text"
                  color="blue-gray"
                  className="flex items-center gap-2 rounded-md text-gray-600"
                >
                  Lihat semua
                  <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </Button>
              </Typo.H6>
            </Link>
          </div>
        </>
      )}
    </>
  );
}
