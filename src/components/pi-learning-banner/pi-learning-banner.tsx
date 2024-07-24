import type { Banner } from "modules/home/api/banner";
type Props = {
  banner?: Banner;
};
export function PiLearningBanner({ banner }: Props) {
  return (
    <div className="relative xl:my-3 xl:mt-8 xl:h-[400px] xl:max-w-[1440px]">
      <img
        className="w-full rounded-lg object-cover xl:h-full xl:object-none"
        src={banner?.slider_image || ""}
        alt={banner?.title}
      />
      {banner?.url && (
        <button className="absolute bottom-2 right-2 rounded-lg bg-white p-1 text-[10px] font-semibold text-pv-blue-dark xl:bottom-4 xl:right-4 xl:py-2 xl:px-10 xl:text-sm">
          Lihat semua
        </button>
      )}
    </div>
  );
}
