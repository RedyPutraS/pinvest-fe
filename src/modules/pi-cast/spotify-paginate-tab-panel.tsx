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
  
  return (
    <div>
      <div className="mt-4 hidden grid-cols-4 gap-4 xl:grid xl:-mt-4">
        <div className="col-span-3">
          <h1 className="text-xl font-medium text-gray-600">Semua Episode</h1>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid xl:mt-2">
        <div className="xl:col-span-3 -mt-5">
          <h1 className="text-xl md:text-[25px] font-medium text-gray-600 xl:hidden">
            Semua Episode
          </h1>
          <hr />
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
                <div className="mt-5 flex justify-center">
                  {/* Tombol Sebelumnya */}
                  {Number(active) !== 1 && (
                    <Button
                      variant="text"
                      color="blue-gray"
                      className="flex items-center justify-center rounded-full w-[40px] h-[30px] p-0 min-w-0 text-sm font-bold"
                      onClick={prev}
                      disabled={active === "1"}
                    >
                      <div className="flex">
                        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                      </div>
                    </Button>
                  )}

                  {/* Pagination Buttons */}
                  <div className="mx-4 flex items-center gap-1 md:gap-2">
                    {data?.page?.links[0]?.label == null ? (
                      <Button
                        {...getItemProps("1")}
                        className="rounded-3xl w-[30px] h-[30px] flex justify-center items-center text-xs p-0 min-w-0"
                      >
                        {data?.page?.current_page}
                      </Button>
                    ) : (
                      (() => {
                        const currentPage = Number(active);  // Halaman aktif
                        const totalPages = data?.page?.total_page;  // Total halaman
                        const pagesToShow = [];

                        // Menentukan halaman mulai dan akhir yang akan ditampilkan
                        let startPage = Math.max(1, currentPage - 1);  // Halaman dimulai 1 halaman sebelumnya
                        let endPage = Math.min(totalPages, currentPage + 1);  // Halaman berakhir 1 halaman setelahnya

                        // Jika halaman aktif adalah halaman pertama
                        if (currentPage === 1) {
                          startPage = 1;
                          endPage = Math.min(3, totalPages);  // Tampilkan sampai halaman ketiga (jika ada)
                        }

                        // Jika halaman aktif adalah halaman terakhir
                        if (currentPage === totalPages) {
                          startPage = Math.max(1, totalPages - 2);  // Tampilkan dari halaman terakhir ke belakang
                          endPage = totalPages;
                        }

                        // Menambahkan halaman sebelumnya, halaman aktif, dan halaman berikutnya
                        for (let i = startPage; i <= endPage; i++) {
                          pagesToShow.push(i);
                        }

                        // Pastikan hanya 3 tombol yang ditampilkan
                        if (pagesToShow.length > 3) {
                          if (currentPage > 2) {
                            pagesToShow.shift();  // Hapus halaman pertama jika ada lebih dari 3
                          }
                          if (pagesToShow.length < 3 && currentPage < totalPages - 1) {
                            pagesToShow.push(currentPage + 2);  // Tambahkan halaman berikutnya jika kurang dari 3
                          }
                        }

                        return pagesToShow.map((page) => (
                          <Button
                            key={page}
                            {...getItemProps(page.toString())}
                            className={`${
                              page.toString() === active ? "bg-blue-300" : ""
                            } rounded-3xl w-[40px] h-[30px] flex justify-center items-center text-xs p-0 min-w-0`}
                          >
                            {page}
                          </Button>
                        ));
                      })()
                    )}
                  </div>

                  {/* Tombol Selanjutnya */}
                  {Number(active) !== total_page && (
                    <Button
                      variant="text"
                      color="blue-gray"
                      className="flex items-center gap-1 rounded-full w-[40px] h-[30px] justify-center p-0 min-w-0"
                      onClick={next}
                      disabled={active == data?.page?.total_page.toString()}
                    >
                      <div className="flex">
                        <ArrowRightIcon
                          strokeWidth={2}
                          className="h-4 w-4" // Ganti hidden md:block
                        />
                      </div>
                    </Button>
                  )}
                </div>
              </>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default SpotifyPaginateTabPanel;
