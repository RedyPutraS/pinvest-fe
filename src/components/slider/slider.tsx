import React from "react";

import type { Settings } from "react-slick";
import Slider from "react-slick";

function NextArrow(props: { onClick: () => void }) {
  const { onClick } = props;
  return (
    <div
      className="absolute -right-3 bottom-0 top-0 z-10 m-auto flex h-0 w-0 cursor-pointer items-center justify-center xl:h-8 xl:w-8 xl:rounded-md xl:border xl:bg-white"
      onClick={onClick}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.2929 26.7071C10.9024 26.3166 10.9024 25.6834 11.2929 25.2929L20.5858 16L11.2929 6.70711C10.9024 6.31658 10.9024 5.68342 11.2929 5.29289C11.6834 4.90237 12.3166 4.90237 12.7071 5.29289L22.7071 15.2929C23.0976 15.6834 23.0976 16.3166 22.7071 16.7071L12.7071 26.7071C12.3166 27.0976 11.6834 27.0976 11.2929 26.7071Z"
          fill="#595959"
        />
      </svg>
    </div>
  );
}

function PrevArrow(props: { onClick: () => void }) {
  const { onClick } = props;
  return (
    <div
      className="absolute -left-5 bottom-0 top-0 z-10 m-auto flex h-0 w-0 cursor-pointer items-center justify-center xl:h-8 xl:w-8 xl:rounded-md xl:border xl:bg-white"
      onClick={onClick}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.7071 5.29289C21.0976 5.68342 21.0976 6.31658 20.7071 6.70711L11.4142 16L20.7071 25.2929C21.0976 25.6834 21.0976 26.3166 20.7071 26.7071C20.3166 27.0976 19.6834 27.0976 19.2929 26.7071L9.29289 16.7071C8.90237 16.3166 8.90237 15.6834 9.29289 15.2929L19.2929 5.29289C19.6834 4.90237 20.3166 4.90237 20.7071 5.29289Z"
          fill="#595959"
        />
      </svg>
    </div>
  );
}

export const ButtonSlider = (props: { children: React.ReactNode }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: (
      <NextArrow
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
    prevArrow: (
      <PrevArrow
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
  };
  return (
    <div className="w-screen md:px-5 xl:max-w-[1300px] xl:px-0">
      <Slider {...settings}>{props.children}</Slider>
    </div>
  );
};

export interface CardSliderProps {
  children: React.ReactNode;
  slidesToShow?: number;
  slidesToScroll?: number;
}

export const CardSlider = ({
  children,
  slidesToShow = 3,
  slidesToScroll = 3,
}: CardSliderProps) => {
  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToScroll,
    initialSlide: 0,
    nextArrow: (
      <NextArrow
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
    prevArrow: (
      <PrevArrow
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
  };
  return (
    <div className="xl:max-w-[1300px]">
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};
interface CardSlider2Props {
  children: React.ReactNode;
}
export const CardSlider2 = (props: CardSlider2Props) => {
  const { children } = props;
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    appendDots: (dots) => (
      <div
        style={{
          backgroundColor: "#ddd",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
  };
  return (
    <div className="xl:max-w-[1300px]">
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};

export const GaleriSlider = (props: { children: React.ReactNode }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: (
      <NextArrow
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
    prevArrow: (
      <PrevArrow
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
  };
  return (
    <div className="ml-2 w-[90vw] xl:ml-0 xl:w-full">
      <Slider {...settings}>{props.children}</Slider>
    </div>
  );
};

export interface PlaylistSliderProps {
  children: React.ReactNode | any;
  slidesToShow?: number;
  vidio?: any;
  slidesToScroll?: number;
}

export const PlaylistSlider = ({
  children,
  slidesToShow = 1,
  slidesToScroll = 1,
}: PlaylistSliderProps) => {
  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToScroll,
    initialSlide: 0,
    nextArrow: (
      <NextArrow
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
    prevArrow: (
      <PrevArrow
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
  };

  return (
    <div className="xl:max-w-[1300px]">
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};
