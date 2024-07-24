import type { PiCastYoutubePlaylistParams } from "modules/home/api/pi-cast-youtube-playlist";
import { usePiCastYoutubePlaylist } from "modules/home/api/pi-cast-youtube-playlist";
import { usePiCastYoutubeByPlaylistId } from "modules/home/api/pi-cast-youtube-playlist-item";
import { useState, useEffect } from "react";
import YoutubeSlider from "./components/youtube-slider";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/select";
import { useYoutubeCategory } from "./api/youtube-category";
import { useAds } from "modules/ads/ads";
import YoutubePlaylistSlider from "./components/youtube-playlist-slider";
import YoutubePaginateGrid from "./components/youtube-paginate-grid";

const YouTubeTabPanel = () => {
  const piCastYoutubePlaylistParams: PiCastYoutubePlaylistParams = {
    page: 1,
    limit: 1,
  };
  const piCastYoutubePlaylist = usePiCastYoutubePlaylist(
    piCastYoutubePlaylistParams
  );

  const piCastYoutubeByPlaylistId = usePiCastYoutubeByPlaylistId({
    playlistId: "UULFx2roASBNqBRKieH9kRm0IA",
  });

  const { data: categories } = useYoutubeCategory();

  const [videoId, setVideoId] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [sort, setSort] = useState<string>();
  const [search, setSearch] = useState<string>();
  useEffect(() => {
    if (piCastYoutubeByPlaylistId.data && piCastYoutubeByPlaylistId.data[0]) {
      setVideoId(
        piCastYoutubeByPlaylistId.data[0].snippet?.resourceId?.videoId ?? ""
      );
    }
  }, [piCastYoutubeByPlaylistId.data]);

  const handleSortChange = (sort: string) => {
    setSort(sort);
  };

  const handleCategoryChange = (category: string) => {
    setCategory(category);
  };

  const reset = () => {
    setSort(undefined);
    setCategory(undefined);
    setSearch(undefined);
  };

  const filtered = category || sort || search;

  const { data: ads } = useAds({ appName: "picast" });
  return (
    <div>
      <div className="mt-5 flex gap-5 md:flex-wrap">
        <div className="flex flex-1 justify-end xl:gap-5">
          <Select onValueChange={handleSortChange}>
            <SelectTrigger className="w-fit">
              <SelectValue placeholder="Terbaru" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">Terbaru</SelectItem>
              <SelectItem value="popular">Terpopuler</SelectItem>
              {/* <SelectItem value="title-asc">A-Z</SelectItem>
              <SelectItem value="title-desc">Z-A</SelectItem> */}
            </SelectContent>
          </Select>

          <Select onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-fit">
              <SelectValue placeholder="Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Semua</SelectItem>
              {categories?.items.map((category, i) => (
                <SelectItem key={i} value={category.id}>
                  {category.snippet.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <button onClick={reset}>
            <span className="text-xs font-medium text-pv-blue-dark xl:text-base p-2">
              Reset
            </span>
          </button>
        </div>

        {/* <div className="hidden w-full min-w-[250px] xl:block xl:w-fit">
          <SearchInput onChangeText={handleSearchChange} />
        </div> */}
      </div>
      {/* <div className="mt-4 w-full xl:hidden xl:w-fit">
        <SearchInput onChangeText={handleSearchChange} />
      </div> */}
      {filtered ? (
        // <YoutubeInfiniteGrid
        //   title={"Result"}
        //   category={category}
        //   type={sort}
        //   search={search}
        // />
        <YoutubePaginateGrid
          title={"Hasil"}
          category={category}
          type={sort}
          search={search}
        />
      ) : (
        <>
          {piCastYoutubeByPlaylistId.data &&
            piCastYoutubeByPlaylistId.data[0] && (
              <div className="mt-8 w-full md:mb-4 md:grid md:h-[400px] md:grid-cols-3 md:gap-4">
                <div className="relative mb-4 aspect-video rounded-md bg-pv-grey-dark2 md:col-span-2 md:mb-0">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  ></iframe>
                </div>
                <div className="col-span-3 h-[300px] overflow-y-auto rounded-md bg-pv-grey-dark2 md:col-span-1 xl:h-[480px]">
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
                        <YoutubePlaylistSlider
                          key={idx}
                          video={video}
                          setCurrentPlay={() => {
                            setVideoId(video.snippet.resourceId?.videoId ?? "");
                          }}
                        />
                      )
                  )}
                </div>
              </div>
            )}
          <YoutubeSlider title={"Video Popular"} type={"popular"} />
          <YoutubeSlider title={"Video Terbaru"} type={"new"} />
          <div className="mt-6 xl:px-2">
            {ads
              ?.filter((v) => v.type === "horizontal")
              .map((ad, i) => (
                <div key={i} className="mb-6">
                  <a href={ad.url}>
                    <img src={ad.image} alt="" />
                  </a>
                </div>
              ))}
          </div>
          <YoutubeSlider title={"Video Rekomendasi"} type={"recommendation"} />
        </>
      )}
    </div>
  );
};

export default YouTubeTabPanel;
