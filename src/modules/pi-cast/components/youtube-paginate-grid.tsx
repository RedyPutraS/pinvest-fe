import { Card, CardImage, CardBody } from "components/card";
import ShareButton from "components/icon/share-button";
import { formatRelative, parseISO } from "date-fns";
import { id } from "date-fns/locale";
import { usePiCastPaginateYoutube } from "../api/youtube-pagination";
import Button from "components/button/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

type Props = {
  title: string;
  category?: string;
  type?: string;
  search?: string;
};

const YoutubePaginateGrid = ({ title, category, type, search }: Props) => {
  const [active, setActive] = React.useState("");
  const [halaman, setHalaman] = useState(1);
  const { data, isInitialLoading } = usePiCastPaginateYoutube({
    pageToken: active,
    category,
    type,
    search,
    limit: 12,
  });

  const getItemProps = (index: string) =>
    ({
      variant: active === index ? "filled" : "text",
      color: active === index ? "bg-gray-800" : "bg-white",
      onClick: () => {
        if (index == "...") {
          return;
        }
        setActive(index);
      },
      className: "rounded-full",
    } as any);

  const prev = () => {
    const activeNumber = data?.data?.prevPageToken ?? null;
    if (activeNumber !== null) {
      setActive(activeNumber);
      setHalaman(halaman - 1);
    }
    return;
  };
  const next = () => {
    const activeNumber = data?.data?.nextPageToken ?? null;
    if (activeNumber !== null) {
      setActive(activeNumber);
      setHalaman(halaman + 1);
    }
    return;
  };

  return (
    <div className="py-6">
      <div className="pb-2 text-2xl font-semibold p-2">{title}</div>
      {isInitialLoading ? (
        <h4 className="py-4 text-center text-lg">Mohon Tunggu...</h4>
      ) : (
        <div>
          <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
            {data?.data?.items.map((video, gi) => (
              <Card
                key={gi}
                className="mx-2 mt-4 w-auto bg-pv-white-pure shadow-md ring-gray-200 hover:ring-2 xl:w-auto"
              >
                <CardImage className="mb-4 h-auto w-full cursor-pointer xl:h-40 bg-slate-500">
                  <a href={`/pi-cast/youtube/${video?.id?.videoId}`}>
                    <img
                      src={video?.snippet?.thumbnails?.medium?.url}
                      alt={video?.snippet?.title}
                      className="w-full"
                    />
                  </a>
                </CardImage>
                <CardBody className="p-2 xl:p-4">
                  <div className="flex items-start justify-between">
                    <p className=" font-semibold text-gray-600 line-clamp-2">
                      {video.snippet.title}
                    </p>
                    <ShareButton
                      path={`/pi-cast/youtube/${video.id.videoId}`}
                    />
                  </div>
                  <div className="mt-4 flex">
                    <div className="w-24">
                      {video.videoData?.statistics.viewCount || 0} views
                    </div>
                    <div className="w-4">•</div>
                    {video.snippet.publishedAt &&
                      formatRelative(
                        parseISO(video.snippet.publishedAt),
                        new Date(),
                        {
                          locale: id,
                        }
                      )}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          <div className="mt-5 flex justify-center">
            <Button
              variant="text"
              color="blue-gray"
              className="flex items-center gap-2 rounded-full"
              onClick={prev}
              disabled={active === "1"}
            >
              <div className="flex">
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />{" "}
                {/* <span className="ml-2">Sebelumnya</span> */}
              </div>
            </Button>
            <div className="mx-4 flex items-center gap-2">
              <Button {...getItemProps("1")} disabled>
                {halaman}
              </Button>
            </div>
            <Button
              variant="text"
              color="blue-gray"
              className="flex items-center gap-2 rounded-full"
              onClick={next}
              disabled={active == data?.data?.nextPageToken}
            >
              <div className="flex">
                {/* <span className="mr-2">Selanjutnya</span> */}
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
              </div>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default YoutubePaginateGrid;
