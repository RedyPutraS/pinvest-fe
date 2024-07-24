import PiCastSpotifyItem from "components/pi-cast-spotify/pi-cast-spotify-item";
import RenderHtml from "components/render-html";
import {
  useInfinitePiCastSpotify,
  usePiCastSpotifyDetailPlaylist,
} from "modules/home/api/pi-cast-spotify";
import type { Key } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
const SpotifyTabPanel = () => {
  const { data, fetchNextPage, hasNextPage } = useInfinitePiCastSpotify(3);
  const { data: detail } = usePiCastSpotifyDetailPlaylist();
  return (
    <div>
      <div className="mt-4 hidden grid-cols-4 gap-4 xl:grid">
        <div className="col-span-3">
          <h1 className="text-xl font-medium">Semua Episode</h1>
        </div>
        <div className="col-span-1">
          <h1 className="text-xl font-medium">Tentang Kami</h1>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-4">
        <div className="xl:col-span-3">
          <h1 className="text-xl font-medium xl:hidden">Semua Episode</h1>
          <InfiniteScroll
            style={{ overflow: "hidden" }}
            dataLength={data?.pages.length ?? 0}
            next={fetchNextPage}
            hasMore={hasNextPage || false}
            loader={<h4 className="text-center">Loading...</h4>}
          >
            {data?.pages.flatMap((group) => (
              <>
                {group.map(
                  (item: { track: { id: Key | null | undefined } }) => (
                    <div key={item.track.id} className="relative">
                      <div className="relative inline-block w-full cursor-pointer border-pv-grey-medium2 py-4 xl:border-t-[1px]">
                        <PiCastSpotifyItem item={item as never} />
                      </div>
                    </div>
                  )
                )}
              </>
            ))}
          </InfiniteScroll>
        </div>
        <div className="break-words xl:col-span-1">
          <h1 className="text-xl font-medium xl:hidden">Tentang Kami</h1>
          <RenderHtml html={detail?.html_description} />
          <div className="h-6"></div>
          <iframe
            src={`https://open.spotify.com/embed/show/${
              detail?.id || ""
            }?utm_source=generator&theme=0`}
            width="100%"
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default SpotifyTabPanel;
