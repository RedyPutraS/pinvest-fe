import InfiniteScroll from "react-infinite-scroll-component";
import { useInfinitePiCastYoutube } from "../api/youtube-filtered";
import { Card, CardImage, CardBody } from "components/card";
import ShareButton from "components/icon/share-button";
import { formatRelative, parseISO } from "date-fns";
import { id } from "date-fns/locale";

type Props = {
  title: string;
  category?: string;
  type?: string;
  search?: string;
};

const YoutubeInfiniteGrid = ({ title, category, type, search }: Props) => {
  const { data, fetchNextPage, hasNextPage, isInitialLoading } =
    useInfinitePiCastYoutube({
      category,
      type,
      search,
      limit: 4,
    });
  return (
    <div className="py-6">
      <div className="pb-2 text-2xl font-semibold">{title}</div>
      {isInitialLoading ? (
        <h4 className="py-4 text-center text-lg">Mohon Tunggu...</h4>
      ) : (
        <InfiniteScroll
          style={{ overflow: "hidden" }}
          dataLength={data?.pages.length ?? 0}
          next={fetchNextPage}
          hasMore={hasNextPage || false}
          loader={<h4 className="py-4 text-center text-lg">Mohon Tunggu...</h4>}
        >
          {data?.pages.map((group, gi) => (
            <div key={gi} className="grid grid-cols-4 gap-4">
              {group.items.map((video, i) => (
                <Card
                  key={i}
                  className="mx-2 mt-4 w-[240px] bg-pv-white-pure ring-gray-200 hover:ring-2 xl:w-auto shadow-md"
                >
                  <CardImage className="mb-4 h-40 w-full cursor-pointer">
                    <a href={`/pi-cast/youtube/${video.id.videoId}`}>
                      <img
                        src={video.snippet.thumbnails.medium.url}
                        alt={video.snippet.title}
                        className="object-contain"
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
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default YoutubeInfiniteGrid;
