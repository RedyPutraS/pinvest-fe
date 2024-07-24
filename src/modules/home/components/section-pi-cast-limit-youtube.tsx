import Section from "components/section/section";
import type { PiCastSpotifyParams } from "../api/pi-cast-spotify";
import { usePiCastSpotify } from "../api/pi-cast-spotify";
import { usePiCastYoutubeByPlaylistId } from "../api/pi-cast-youtube-playlist-item";
import type { PiCastYoutubePlaylistParams } from "../api/pi-cast-youtube-playlist";
import { usePiCastYoutubePlaylist } from "../api/pi-cast-youtube-playlist";
import type { PiNewsParams } from "../api/pi-news";
import { usePiNews } from "../api/pi-news";
import { PiCast } from "./program-menu-icon";
import PiCastSpotifyItem from "components/pi-cast-spotify/pi-cast-spotify-item";
import PinspireHeadlineCard from "components/pi-news-card/pinspire-headline-card";
import PiNspireCard from "components/pi-news-card/pi-inspire-card";
import type { Key } from "react";
import { useState, useEffect, memo } from "react";

const SectionPiCastLimitYoutube = () => {
  const piCastYoutubePlaylistParams: PiCastYoutubePlaylistParams = {
    page: 1,
    limit: 1,
  };
  const piCastSpotifyParams: PiCastSpotifyParams = {
    page: 1,
    limit: 4,
  };
  const piCastSpotify = usePiCastSpotify(piCastSpotifyParams);
  const piCastYoutubePlaylist = usePiCastYoutubePlaylist(
    piCastYoutubePlaylistParams
  );
  const piCastYoutubeByPlaylistId = usePiCastYoutubeByPlaylistId({
    playlistId: "UULFx2roASBNqBRKieH9kRm0IA",
  });
  const [videoId, setVideoId] = useState<string>();
  useEffect(() => {
    if (piCastYoutubeByPlaylistId.data && piCastYoutubeByPlaylistId.data[0]) {
      setVideoId(
        piCastYoutubeByPlaylistId.data[0].snippet?.resourceId?.videoId ?? ""
      );
    }
  }, [piCastYoutubeByPlaylistId.data]);

  const piNewsParams: PiNewsParams = {
    page: 1,
    limit: 4,
    category: "pinspire",
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [newPiNewsParams] = useState(piNewsParams);
  const piNews = usePiNews(newPiNewsParams);
  console.log(piNews.data);
  
  return (
    <Section title="PiCast" href="/pi-cast?category=youtube" icon={<PiCast />}>
      <div className="mt-8 w-full md:mb-4 md:grid md:grid-cols-3 md:gap-4 ">
        <div className="mb-4 rounded-md md:col-span-12 lg:md:col-span-2 md:mb-0">
          <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-4">
            <div className="col-span-3 lg:col-span-3 md:h-[750px] lg:h-auto">
              {piNews.data && piNews.data[0] && (
                <PinspireHeadlineCard
                  article={piNews.data[0] as never}
                  descHeight="xl:h-[110px]"
                />
              )}
            </div>
            <div className="hidden overflow-y-auto no-scrollbar xl:block">
              {piNews.data?.map(
                (article, index) =>
                  index !== 0 && (
                    <PiNspireCard
                      key={article.id}
                      article={article as never}
                      withDescription={false}
                      isHomePage
                    />
                  )
              )}
            </div>
            <div className="hidden overflow-y-auto no-scrollbar md:block xl:hidden md:h-[800px]">
              {piNews.data?.slice(1, 4).map((article) => (
                <PiNspireCard
                  key={article.id}
                  article={article as never}
                  imgClassName="h-[50px] md:h-auto"
                />
              ))}
              {/* {piNews.data?.map(
                (article, index) =>
                  index !== 0 && (
                    <PiNspireCard
                      key={article.id}
                      article={article as never}
                      withDescription={false}
                      isHomePage
                    />
                  )
              )} */}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:hidden xl:hidden mt-3">
            {piNews.data?.map((article) => (
              <PiNspireCard
                key={article.id}
                article={article as never}
                imgClassName="h-[100px] md:h-[200px] xl:h-auto"
              />
            ))}
          </div>
        </div>

        {piCastYoutubeByPlaylistId.data &&
          piCastYoutubeByPlaylistId.data[0] && (
            <div className="col-span-3 md:col-span-12 lg:col-span-1">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              </div>
              <div className="mt-4 h-[349px] overflow-y-auto bg-pv-grey-dark2 shadow-md">
                <div className="px-6 py-3 pt-6">
                  <div className="text-lg font-normal text-white">
                    {piCastYoutubePlaylist.data &&
                      piCastYoutubePlaylist.data[0] &&
                      piCastYoutubePlaylist.data[0].snippet.title}
                  </div>
                  <div className="text-sm font-light text-white">
                    {piCastYoutubePlaylist.data &&
                      piCastYoutubePlaylist.data[0] &&
                      piCastYoutubePlaylist.data[0].snippet.channelTitle}
                  </div>
                </div>
                {piCastYoutubeByPlaylistId.data.map(
                  (video, idx) =>
                    idx !== 0 && (
                      <div
                        key={idx}
                        className="mx-4 mb-2 grid cursor-pointer grid-cols-6 gap-4 text-white hover:bg-pv-grey-dark1"
                        onClick={() => {
                          setVideoId(video.snippet?.resourceId?.videoId ?? "");
                        }}
                      >
                        <div className="col-span-2">
                          <img
                            src={video.snippet.thumbnails.medium.url}
                            className="rounded-md"
                            alt=""
                          />
                        </div>
                        <div className="col-span-4">
                          <div className="pr-10 text-[14px] font-light line-clamp-2">
                            {video.snippet.title}
                          </div>
                          <div className="text-[10px] font-light text-pv-grey-medium1">
                            {video.snippet.videoOwnerChannelTitle}
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          )}
      </div>
      <div className="flex w-full gap-4 overflow-x-auto py-4 no-scrollbar xl:hidden">
        {piCastSpotify.data &&
          piCastSpotify.data.map(
            (item: { track: { id: Key | null | undefined } }) => (
              <PiCastSpotifyItem key={item.track.id} item={item as never} />
            )
          )}
      </div>
      <div className="hidden w-full pb-4 xl:grid xl:grid-cols-4 xl:gap-4 ">
        {piCastSpotify.data?.map(
          (item: { track: { id: Key | null | undefined } }) => (
            <PiCastSpotifyItem key={item.track.id} item={item as never} />
          )
        )}
      </div>
    </Section>
  );
};

export default memo(SectionPiCastLimitYoutube);
