/* eslint-disable @typescript-eslint/no-explicit-any */

import { Carousel } from "react-responsive-carousel";
import PiEventMenuButton from "./pi-event-menu-button";

type Props = {
  categories: {
    id: number;
    alias: string;
    category_name: string;
  }[];
  onClick: (category: any) => void;
};

export default function PiEventMenuSlider({ categories, onClick }: Props) {
  const perChunk = 4; // items per chunk
  const result = categories.reduce((resultArray: any[], item, index) => {
    const chunkIndex = Math.floor(index / perChunk);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);
  const slides: any = [];
  result.forEach((container, i) => {
    const buttons: any = [];
    container.forEach((category: any, i: number) => {
      buttons.push(
        <PiEventMenuButton
          key={i}
          onClick={() => {
            onClick(category);
          }}
          category={category}
        />
      );
    });
    slides.push(
      <div className="grid grid-cols-2 gap-3 pb-7" key={i}>
        {buttons}
      </div>
    );
  });

  return (
    <>
      <div className="md:hidden">
        <Carousel
          interval={3000}
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          renderIndicator={(onClickHandler, isSelected, index, label) => {
            if (isSelected) {
              return (
                <li
                  className="mx-1 -mb-2 inline-block h-2  w-2 rounded-full bg-pv-cyan text-gray-600 md:mx-2 md:mb-0  md:h-6  md:w-6"
                  aria-label={`Selected: ${label} ${index + 1}`}
                  title={`Selected: ${label} ${index + 1}`}
                />
              );
            }
            return (
              <li
                className="mx-1 -mb-2 inline-block h-2 w-2 rounded-full bg-pv-grey-light3 text-gray-600 md:mx-2 md:mb-0 md:h-6  md:w-6"
                onClick={onClickHandler}
                onKeyDown={onClickHandler}
                value={index}
                key={index}
                role="button"
                tabIndex={0}
                title={`${label} ${index + 1}`}
                aria-label={`${label} ${index + 1}`}
              />
            );
          }}
        >
          {slides}
        </Carousel>
      </div>
      <div className="hidden grid-cols-4 gap-6 text-gray-600 md:grid">
        {categories.map((category, i) => (
          <PiEventMenuButton
            onClick={() => {
              onClick(category);
            }}
            key={i}
            category={category}
          />
        ))}
      </div>
    </>
  );
}
