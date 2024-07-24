import { ButtonSlider } from "components/slider/slider";
import type { ReactNode } from "react";
interface Props {
  children: ReactNode;
}

export function ProgramMenuSlider(props: Props) {
  return (
    <>
      <div className="flex w-full touch-auto justify-center gap-1 overflow-x-auto bg-pv-white-light p-4 no-scrollbar md:hidden">
        <ButtonSlider>{props.children}</ButtonSlider>
      </div>

      <div className="flex justify-center">
        <div className="hidden w-full justify-center bg-pv-white-pure md:flex md:px-0 xl:max-w-[1440px] xl:px-[70px]">
          <ButtonSlider>{props.children}</ButtonSlider>
        </div>
      </div>
    </>
  );
}
