import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Button from "components/button/button";
import PiCastSpotifyItem from "components/pi-cast-spotify/pi-cast-spotify-item";
import RenderHtml from "components/render-html";
import { usePiCastSpotifyDetailPlaylist } from "modules/home/api/pi-cast-spotify";
import { usePiCastSpotifyPaginate } from "modules/home/api/pi-cast-spotify-paginate";
import React from "react";
const SpotifyPaginateTabPanel = () => {
  const [active, setActive] = React.useState("1");

  const { data } = usePiCastSpotifyPaginate({
    page: active,
    limit: 5,
  });

  const total_page = data?.page.total_page ?? 0;
  // console.log("picast spotify", data);
  const { data: detail } = usePiCastSpotifyDetailPlaylist();
  
  const getItemProps = (index: string) =>
    ({
      variant: active === index ? "filled" : "text",
      color: active === index ? "bg-red-800" : "bg-blue-800",
      onClick: () => {
        if (index == "...") {
          return;
        }
        setActive(index);
      },
      className: "rounded-full",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
  const next = () => {
    const activeNumber = Number(active);
    if (activeNumber == data?.page?.total_page) return;

    setActive((activeNumber + 1).toString());
  };
  const prev = () => {
    const activeNumber = Number(active);
    if (activeNumber == 1) return;

    setActive((activeNumber - 1).toString());
  };

  console.log(data?.data);
  
  return (
    <div>
      <div className="mt-4 hidden grid-cols-4 gap-4 xl:grid">
        <div className="col-span-3">
          <h1 className="text-xl font-medium text-gray-600">Semua Episode</h1>
        </div>
        <div className="col-span-1">
          <h1 className="text-xl font-medium text-gray-600">Tentang Kami</h1>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-4">
        <div className="xl:col-span-3">
          <h1 className="text-xl font-medium text-gray-600 xl:hidden">
            Semua Episode
          </h1>
          {data?.data.tracks.items.map(
            (item: { track: { id: React.Key | null | undefined } }) => (
              <>
                <div key={item.track.id} className="relative">
                  <div className="relative inline-block w-full cursor-pointer border-pv-grey-medium2 py-4 xl:border-t-[1px]">
                    <PiCastSpotifyItem item={item as never} />
                  </div>
                </div>
              </>
            )
          )}
          {
            total_page > 1 && (
              <>
                <div className="mt-5 hidden justify-center xl:flex">
                {
                  Number(active) !== 1 && (
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
                  )
                }

                  <div className="mx-4 flex items-center gap-2">
                    {data?.page?.links[0]?.label == null ? (
                      <Button {...getItemProps("1")}>
                        {data?.page?.current_page}
                      </Button>
                    ) : (
                      data?.page?.links?.map(
                        (
                          items: {
                            label: string;
                          },
                          i: React.Key | null | undefined
                        ) => (
                          <Button key={i} {...getItemProps(items.label)}>
                            {items?.label}
                          </Button>
                        )
                      )
                    )}
                  </div>
                  {
                    Number(active) !== total_page && (
                      <Button
                        variant="text"
                        color="blue-gray"
                        className="flex items-center gap-2 rounded-full"
                        onClick={next}
                        disabled={active == data?.page?.total_page.toString()}
                      >
                        <div className="flex">
                          {/* <span className="mr-2">Selanjutnya</span> */}
                          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                        </div>
                      </Button>
                    )
                  }
                </div>
                <div className="mx-auto mt-5 flex justify-center xl:hidden">
                  {
                    Number(active) !== 1 && (
                      <Button
                        variant="text"
                        color="blue-gray"
                        className="flex items-center gap-2 rounded-full px-3 text-xs"
                        onClick={prev}
                        disabled={active === "1"}
                      >
                        <div className="flex">
                          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />{" "}
                          {/* <span className="ml-2">Sebelumnya</span> */}
                        </div>
                      </Button>
                    )
                  }

                  <div className="mx-4 flex items-center gap-2">
                    {data?.page?.links[0]?.label == null ? (
                      <Button {...getItemProps("1")}>
                        {data?.page?.current_page}
                      </Button>
                    ) : (
                      <Button {...getItemProps(data?.page?.current_page.toString())}>
                        {data?.page?.current_page}
                      </Button>
                    )}
                  </div>
                  {
                    Number(active) !== total_page && (
                      <Button
                        variant="text"
                        color="blue-gray"
                        className="flex items-center gap-2 rounded-full px-3 text-xs"
                        onClick={next}
                        disabled={active == data?.page?.total_page.toString()}
                      >
                        Next
                        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                      </Button>
                    )
                  }
                </div>
              </>
            )
          }
        </div>

        <div className="break-words xl:col-span-1">
          <h1 className="text-xl font-medium text-gray-600 xl:hidden">
            Tentang Kami
          </h1>
          <RenderHtml html={detail?.html_description} />
          <div className="h-6"></div>
          <iframe
            src={`https://open.spotify.com/embed/show/${
              "5jQrAzM0nDtQmOF21a7ZZp" || ""
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

export default SpotifyPaginateTabPanel;
