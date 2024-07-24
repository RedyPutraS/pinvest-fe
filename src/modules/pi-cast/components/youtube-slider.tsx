import { Card, CardImage, CardBody } from "components/card";
import ShareButton from "components/icon/share-button";
import { CardSlider } from "components/slider/slider";
import { usePiCastYoutube } from "modules/home/api/pi-cast-youtube";
import { memo } from "react";
import { formatRelative, parseISO } from "date-fns";
import id from "date-fns/locale/id";
import Link from "next/link";
type Props = {
  title: string;
  type: string;
};

const YoutubeSlider = ({ title, type }: Props) => {
  const piCastYoutube = usePiCastYoutube({ type });
  return (
    <div className="py-6">
      <div className="pb-2 text-2xl font-semibold">{title}</div>
      <div className="hidden xl:block">
        <CardSlider slidesToShow={4}>
          {piCastYoutube.data?.map(function (video, i) {
            const { thumbnails, title, publishedAt } = video.snippet;
            return (
              <div key={i}>
                <Card className="mx-2 mt-4 w-[240px] bg-pv-white-pure ring-gray-200 hover:ring-2 xl:w-auto shadow-md">
                  <CardImage className="mb-4 h-40 w-full cursor-pointer">
                    <Link href={`/pi-cast/youtube/${video.id.videoId}`}>
                      <img
                        src={thumbnails.medium.url}
                        alt={title}
                        className="object-contain"
                      />
                    </Link>
                  </CardImage>
                  <CardBody className="p-2 xl:p-4">
                    <div className="flex items-start justify-between">
                      <p className=" font-semibold text-gray-600 line-clamp-2">
                        <Link href={`/pi-cast/youtube/${video.id.videoId}`}>
                          {title}
                        </Link>
                      </p>
                      <ShareButton
                        path={`/pi-cast/youtube/${video.id.videoId}`}
                        className="lg:h-[28px]"
                      />
                    </div>
                    <div className="mt-4 flex">
                      <div className="w-24">
                        {video.videoData?.statistics.viewCount || 0} views
                      </div>
                      <div className="w-4">•</div>
                      {publishedAt &&
                        formatRelative(parseISO(publishedAt), new Date(), {
                          locale: id,
                        })}
                    </div>
                  </CardBody>
                </Card>
              </div>
            );
          })}
        </CardSlider>
      </div>
      <div className="grid grid-cols-2 gap-4 xl:hidden">
        {piCastYoutube.data?.map(function (video, i) {
          const { thumbnails, title, publishedAt } = video.snippet;
          return (
            <div key={i}>
              <Card className="bg-pv-white-pure ring-gray-200 hover:ring-2 shadow-md">
                <CardImage className="w-full cursor-pointer bg-black">
                  <Link href={`/pi-cast/youtube/${video.id.videoId}`}>
                    <img
                      src={thumbnails.medium.url}
                      alt={title}
                      className="w-full object-cover"
                    />
                  </Link>
                </CardImage>
                <CardBody className="p-2">
                  <div className="flex items-start justify-between">
                    <p className=" font-semibold text-gray-600 line-clamp-2">
                      <Link
                        className="text-xs"
                        href={`/pi-cast/youtube/${video.id.videoId}`}
                      >
                        {title}
                      </Link>
                    </p>
                    <ShareButton
                      className="mt-2 h-5 lg:h-[28px]"
                      path={`/pi-cast/youtube/${video.id.videoId}`}
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="w-[40%] text-xs">
                      {video.videoData?.statistics.viewCount || 0} views
                    </div>
                    <div className="text-xs">
                      <span className="mr-1">•</span>
                      {publishedAt &&
                        formatRelative(parseISO(publishedAt), new Date(), {
                          locale: id,
                        })}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(YoutubeSlider);
