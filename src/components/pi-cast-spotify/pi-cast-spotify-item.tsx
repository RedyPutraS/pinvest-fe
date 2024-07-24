import ShareButton from "components/icon/share-button";
import type { SpotifyItem } from "modules/home/api/pi-cast-spotify";
import { useRouter } from "next/router";
type Props = {
  item: SpotifyItem;
};
export default function PiCastSpotifyItem({ item }: Props) {
  const { track } = item;
  const router = useRouter();
  return (
    <div className="relative flex-shrink-0 shadow-md">
      <div className="flex items-start justify-start">
        <div className="relative flex-1 rounded-xl bg-pv-white-pure opacity-90 hover:opacity-100 xl:w-auto">
          <iframe
            src={track.external_urls.spotify.replace(
              "episode",
              "embed/episode"
            )}
            width="100%"
            height="352"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
          <div
            className="absolute top-0 z-10 h-full w-full cursor-pointer "
            onClick={() => router.push(`/pi-cast/spotify/${item.track.id}`)}
          />
          <ShareButton
            className="absolute right-4 top-4 xl:right-2 xl:top-2 xl:h-9 xl:w-9"
            path={`/pi-cast/spotify/${item.track.id}`}
          />
        </div>
      </div>
    </div>
  );
}
