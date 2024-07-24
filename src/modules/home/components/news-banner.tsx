import Jumbotron from "components/jumbotron/jumbotron";
import type { BannerParams } from "../api/banner";
import { useBanner } from "../api/banner";
import { Spinner } from "components/spinner";

type Props = {
  tab?: string;
  bannerIndex?: number;
};

const NewsBanner = ({ tab = "pinews", bannerIndex }: Props) => {
  const params: BannerParams = {
    tab,
  };
  const res = useBanner(params);
  const imageSliderItems: { image: string | undefined }[] = [];
  res.data?.map((banner) => {
    const item = {
      id: banner.url || undefined,
      image: banner.slider_image,
      content: <Jumbotron banner={banner as never} />,
    };
    imageSliderItems.push(item);
  });
  const index = bannerIndex ?? 0;
  return (
    <>
      {res.isLoading ? (
        <Spinner center />
      ) : (
        <img
          className="mx-auto w-screen"
          src={imageSliderItems[index]?.image}
          alt="banner"
        />
      )}
    </>
  );
};

export default NewsBanner;
