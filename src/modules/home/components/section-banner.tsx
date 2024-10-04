import type { ItemProps } from "components/image-slider/image-slider";
import ImageSlider from "components/image-slider/image-slider";
import Jumbotron from "components/jumbotron/jumbotron";
import type { BannerParams } from "../api/banner";
import { useBanner } from "../api/banner";
import { Spinner } from "components/spinner";
import { useRouter } from "next/router";
import { useEffect } from "react";

type Props = {
  tab?: string;
  rounded?: boolean;
};

const SectionBanner = ({ tab = "homepage", rounded }: Props) => {
  const router = useRouter();
  const params: BannerParams = {
    tab,
  };
  const res = useBanner(params);
  const imageSliderItems:
    | ItemProps[]
    | { id?: string; image: string; content: JSX.Element }[] = [];
  res.data?.map((banner) => {
    const item = {
      id: banner.url || undefined,
      image: banner.slider_image,
      content: <Jumbotron banner={banner as never} />,
    };
    imageSliderItems.push(item);
  });
  return (
    <>
      {res.isLoading ? (
        <Spinner center />
      ) : (
        <ImageSlider
          rounded={rounded || false}
          items={imageSliderItems}
          onClick={(url) => {
            router.push(url);
          }}
        />
      )}
    </>
  );
};

export default SectionBanner;
