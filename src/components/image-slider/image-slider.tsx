import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export interface ImageSliderProps {
  items: ItemProps[];
  rounded?: true | boolean;
  onClick?: (id: string) => void;
}

export interface ItemProps {
  id?: string;
  image: string;
  content?: React.ReactNode;
}

export default function ImageSlider(props: ImageSliderProps) {
  const { items, rounded } = props;
  return (
    <div className="flex justify-center">
      {/* <div className="w-screen xl:max-w-[1440px]"> yang lama */}
      <div className="w-screen">
        <Carousel
          interval={3000}
          autoPlay
          infiniteLoop
          showIndicators={items.length > 1}
          showThumbs={false}
          showStatus={false}
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <button
                type="button"
                onClick={onClickHandler}
                title={label}
                className="absolute top-0 bottom-0 left-4 z-[2] m-auto flex h-2 w-2 cursor-pointer items-center justify-center leading-8 md:h-8 md:w-8"
              >
                <svg
                  className="h-1 w-1 md:h-3 md:w-3"
                  viewBox="0 0 12 22"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.7071 0.292893C12.0976 0.683417 12.0976 1.31658 11.7071 1.70711L2.41421 11L11.7071 20.2929C12.0976 20.6834 12.0976 21.3166 11.7071 21.7071C11.3166 22.0976 10.6834 22.0976 10.2929 21.7071L0.292893 11.7071C-0.0976311 11.3166 -0.0976311 10.6834 0.292893 10.2929L10.2929 0.292893C10.6834 -0.0976311 11.3166 -0.0976311 11.7071 0.292893Z"
                    fill="white"
                  />
                </svg>
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <button
                type="button"
                onClick={onClickHandler}
                title={label}
                className="absolute top-0 bottom-0 right-4 z-[2] m-auto flex h-2 w-2 cursor-pointer items-center justify-center leading-8 md:h-8 md:w-8"
              >
                <svg
                  className="h-1 w-1 md:h-3 md:w-3"
                  viewBox="0 0 12 22"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.292893 21.7071C-0.0976314 21.3166 -0.0976313 20.6834 0.292894 20.2929L9.58579 11L0.292895 1.70711C-0.0976296 1.31658 -0.0976296 0.683417 0.292895 0.292891C0.683419 -0.0976324 1.31658 -0.0976324 1.70711 0.292892L11.7071 10.2929C12.0976 10.6834 12.0976 11.3166 11.7071 11.7071L1.70711 21.7071C1.31658 22.0976 0.683417 22.0976 0.292893 21.7071Z"
                    fill="white"
                  />
                </svg>
              </button>
            )
          }
          renderIndicator={(onClickHandler, isSelected, index, label) => {
            if (isSelected) {
              return (
                <li
                  className="mx-1 -mb-2 inline-block h-0.5 w-6 rounded-full bg-pv-cyan md:mx-2 md:mb-0  md:h-1  md:w-16"
                  aria-label={`Selected: ${label} ${index + 1}`}
                  title={`Selected: ${label} ${index + 1}`}
                />
              );
            }
            return (
              <li
                className="mx-1 -mb-2 inline-block h-0.5 w-6 rounded-full bg-pv-grey-light3 md:mx-2 md:mb-0 md:h-1 md:w-16"
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
          {items.map((item, i) => {
            return (
              <div
                className={`relative w-full  ${item.id && `cursor-pointer`} `}
                key={i}
              >
                <img
                  src={item.image}
                  className={`h-full w-full object-contain md:h-[350px] md:object-cover ${
                    rounded && `rounded-lg`
                  } `}
                  alt={item.image}
                  style={{ height: '100%', width: '100%' }}
                />
                <div className="absolute top-0 h-full w-full bg-transparent text-white">
                  {item.content}
                </div>
                {item.id && (
                  <div
                    className="absolute top-0 h-2/3 w-full bg-transparent"
                    onClick={() => {
                      item.id && props.onClick && props.onClick(item.id);
                    }}
                  ></div>
                )}
                {item.id && (
                  <div
                    className="absolute bottom-0 h-full w-1/3 bg-transparent"
                    onClick={() => {
                      item.id && props.onClick && props.onClick(item.id);
                    }}
                  ></div>
                )}
                {item.id && (
                  <div
                    className="absolute bottom-0 right-0 h-full w-1/3 bg-transparent"
                    onClick={() => {
                      item.id && props.onClick && props.onClick(item.id);
                    }}
                  ></div>
                )}
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}
