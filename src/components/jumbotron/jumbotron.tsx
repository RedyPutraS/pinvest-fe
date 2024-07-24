import Typo from "components/typo/typo";
import type { Banner } from "modules/home/api/banner";
type Props = {
  banner: Banner;
};
export default function Jumbotron({ banner }: Props) {
  return (
    <>
      <div className="hidden h-full w-1/2 flex-col items-start justify-center  px-[70px] md:flex">
        <Typo.H4 className="mb-2 w-[300px] text-left text-[48px] font-semibold">
          {banner.title}
        </Typo.H4>
        <div className="mb-3 w-[450px] text-left">
          <span className="font-light">{banner.description}</span>
        </div>
      </div>

      <div className="flex h-full w-1/2 flex-col items-start justify-center  py-3 px-4 md:hidden">
        <Typo.H6 className="font-semibold">{banner.title}</Typo.H6>
        <div className="w-[450px] text-left">
          <Typo.Caption>{banner.description}</Typo.Caption>
        </div>
      </div>
    </>
  );
}
