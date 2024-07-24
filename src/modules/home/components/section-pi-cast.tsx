import Section from "components/section/section";
import type { PiCastSpotifyParams } from "../api/pi-cast-spotify";
import { usePiCastSpotify } from "../api/pi-cast-spotify";
import { usePiCastYoutubeByPlaylistId } from "../api/pi-cast-youtube-playlist-item";
import type { PiCastYoutubePlaylistParams } from "../api/pi-cast-youtube-playlist";
import { usePiCastYoutubePlaylist } from "../api/pi-cast-youtube-playlist";
import type { Key } from "react";
import { memo, useEffect, useState } from "react";
import type { PiNewsParams } from "../api/pi-news";
import { usePiNews } from "../api/pi-news";
import PiNewsCard from "components/pi-news-card/pi-news-card";
import { PiCast } from "./program-menu-icon";
import PiNewsHeadlineCard from "components/pi-news-card/pi-news-headline-card";
import PiCastSpotifyItem from "components/pi-cast-spotify/pi-cast-spotify-item";

const SectionPiCast = () => {
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
    playlistId: "PL9RBUFRu3J0Thu7lR2ADcAIfxtfCNLOix",
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
  return (
    <Section title="PiCast" href="/pi-cast?category=youtube" icon={<PiCast />}>
      {piCastYoutubeByPlaylistId.data && piCastYoutubeByPlaylistId.data[0] && (
        <div className="mt-8 w-full md:mb-4 md:grid md:h-[620px] md:grid-cols-3 md:gap-4">
          <div className="mb-4 rounded-md md:col-span-2 md:mb-0">
            <div className="grid gap-4 xl:grid-cols-4">
              <div className="col-span-3">
                {piNews.data && piNews.data[0] && (
                  <PiNewsHeadlineCard
                    article={piNews.data[0] as never}
                    descHeight="xl:h-[113px]"
                  />
                )}
              </div>
              <div className="hidden overflow-y-auto no-scrollbar md:block">
                {piNews.data?.map(
                  (article, index) =>
                    index !== 0 && (
                      <PiNewsCard
                        key={article.id}
                        article={article as never}
                        withDescription={false}
                      />
                    )
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 md:hidden">
              {piNews.data?.map((article) => (
                <PiNewsCard
                  key={article.id}
                  article={article as never}
                  imgClassName="h-[100px] xl:h-auto"
                />
              ))}
            </div>
          </div>
          <div className="col-span-3 md:col-span-1">
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            </div>
            <div className="mt-4 h-[380px] overflow-y-auto bg-pv-grey-dark2">
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
        </div>
      )}
      {/* <PiCastSpotifySlider>
        {piCastSpotify.data &&
          piCastSpotify.data.map((item) => (
            <PiCastSpotifyItem key={item.track.id} item={item as never} />
          ))}
      </PiCastSpotifySlider> */}
      <div className="flex w-full gap-4 overflow-x-auto py-4 no-scrollbar md:hidden ">
        {piCastSpotify.data &&
          piCastSpotify.data.map(
            (item: { track: { id: Key | null | undefined } }) => (
              <PiCastSpotifyItem key={item.track.id} item={item as never} />
            )
          )}
      </div>
      <div className="hidden w-full pb-4 xl:grid xl:grid-cols-4 xl:gap-4">
        {piCastSpotify.data?.map(
          (item: { track: { id: Key | null | undefined } }) => (
            <PiCastSpotifyItem key={item.track.id} item={item as never} />
          )
        )}
      </div>
    </Section>
  );
};

export default memo(SectionPiCast);
