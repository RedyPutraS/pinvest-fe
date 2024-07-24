import Section from "components/section/section";
import { memo } from "react";
import type { ItemProps } from "components/image-slider/image-slider";
import type { PiSpaceParams } from "../api/pi-space";
import { usePiSpace } from "../api/pi-space";
import { PiSpace } from "./program-menu-icon";
import SectionBanner from "./section-banner";
const SectionPiSpace = () => {
  const piSpaceParams: PiSpaceParams = {
    page: 1,
    limit: 4,
  };
  const piSpace = usePiSpace(piSpaceParams);
  const imageSliderItems:
    | ItemProps[]
    | { id?: string; image: string; content: JSX.Element }[] = [];
  piSpace.data?.map((article) => {
    const item = {
      id: article.id.toString(),
      image: article.thumbnail_image,
      content: <></>,
    };
    imageSliderItems.push(item);
  });
  return (
    <Section
      title="PiSpace"
      variant="white"
      href="/pi-space"
      icon={<PiSpace />}
    >
      <SectionBanner tab="pispace" rounded />
      <div className="h-4" />
    </Section>
  );
};
export default memo(SectionPiSpace);
