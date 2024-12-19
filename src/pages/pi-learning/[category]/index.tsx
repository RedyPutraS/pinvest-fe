/* eslint-disable react/jsx-key */
import { Tab, Tabs, TabList } from "components/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/select";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { type InferGetServerSidePropsType, type NextPageContext } from "next";
import { useRouter } from "next/router";
import { APP_NAME } from "utils/constants/app";
import { useApp } from "utils/api/get-apps";
import { useEvents } from "modules/pi-learning/api/events";
import React, { useMemo, useState } from "react";
import { Spinner } from "components/spinner";
import { WebinarCard } from "components/pi-learning-card/webinar-card";
import SectionBanner from "modules/home/components/section-banner";
import PopupBanner from "components/popup-banner";
import Button from "components/button/button";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Learning = ({ params, appParams }: Props) => {
  const router = useRouter();
  const app = useApp(appParams);

  const [search1, setSearch] = useState<string>();
  const [sort, setSort] = useState<string>("new");
  const [subcategory, setSubcategory] = useState<string>("");

  const [active, setActive] = React.useState("1");

  const events = useEvents({
    ...params,
    page: "1",
    search: search1?.toString() ?? "",
    sort: sort?.toString() ?? "",
    subcategory: subcategory?.toString() ?? "",
    category: router.query.category?.toString() ?? params.category,
  });
  const total_page = events.data?.page.total_page ?? 0;
  
  const handleSortChange = (sort: string) => {
    setSort(sort);
  };

  const handleCategoryChange = (subcategory: string) => {
    setSubcategory(subcategory);
  };

  const reset = () => {
    setSort("new");
    setSubcategory("");
    setSearch(undefined);
  };
  const handleChangeTab = (page: number) => {
    const { query } = router;
    const category = app.data?.category[page]?.alias;
    if (category === "article") {
      return router.push({ pathname: "/pi-learning/article" }, undefined, {
        shallow: true,
      });
    } else if (category === "onlinecourse") {
      return router.push({ pathname: "/pi-learning/onlinecourse" }, undefined, {
        shallow: true,
      });
    }

    router.push({ query: { ...query, category } }, undefined, {
      shallow: true,
    });
  };

  const initActiveTab = useMemo(
    () =>
      app.data?.category.findIndex(
        (category) => category.alias === router.query.category
      ),
    [app.data?.category, router.query.category]
  );
  const subCategory = app.data?.category.find(
    (category) => category.alias === router.query.category
  );
  

  const APP = "pilearning";
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
    if (activeNumber == events?.data?.page?.total_page) return;

    setActive((activeNumber + 1).toString());
  };
  const prev = () => {
    const activeNumber = Number(active);
    if (activeNumber == 1) return;

    setActive((activeNumber - 1).toString());
  };

  return (
    <>
      <SectionBanner tab="pilearning" />
      <PopupBanner app={APP} />
      <section className="mx-auto mb-8 w-screen p-3 xl:max-w-[1440px] xl:px-[70px]">
        <Tabs initActiveTab={initActiveTab} onChangeTab={handleChangeTab}>
          {app.isLoading && <Spinner center />}
          <TabList>
            {app.data?.category.map((category) => (
              <Tab key={category.category_name}>{category.category_name}</Tab>
            ))}
          </TabList>

          <div className="mt-5 flex-wrap xl:flex xl:gap-5">
            <div className="flex flex-1 justify-end xl:gap-5">
              <Select value={sort} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Terbaru" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">Terbaru</SelectItem>
                  <SelectItem value="popular">Terpopuler</SelectItem>
                  {/* <SelectItem value="title-asc">A-Z</SelectItem>
                  <SelectItem value="title-desc">Z-A</SelectItem> */}
                </SelectContent>
              </Select>

              <Select value={subcategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Semua</SelectItem>
                  {subCategory?.subcategory?.map((subcat) => (
                    <SelectItem value={subcat.alias}>
                      {subcat.subcategory_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <button onClick={reset} className="ml-2">Reset</button>
            </div>

            {/* <div className="w-full min-w-[50px] max-w-full  xl:w-[450px]">
              <SearchInput onChangeText={handleSearch} />
            </div> */}
          </div>
          {events.isLoading && <Spinner center />}
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {/* {events.data?.data?.map((event, index) => (
              <WebinarCard
                className="w-full"
                key={index}
                event={event as never}
                category={`${router.query.category}` || "webinar"}
              />
            ))} */}
            {events.data?.data?.map((event, index) => (
              <WebinarCard
              className="w-full"
              key={index}
              event={event as never}
              category={`${router.query.category}` || "webinar"}
            />
            ))}
          </div>
        </Tabs>
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
                  {events?.data?.page?.links[0]?.label == null ? (
                    <Button
                      {...getItemProps("1")}
                      className="rounded-3xl w-[30px] h-[30px] flex justify-center items-center text-xs p-0 min-w-0"
                    >
                      {events?.data?.page?.current_page}
                    </Button>
                  ) : (
                    (() => {
                      const currentPage = Number(active);  // Halaman aktif
                      const totalPages = events?.data?.page?.total_page;  // Total halaman
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
                    disabled={active == events?.data?.page?.total_page.toString()}
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
      </section>
    </>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  const query = context.query;
  const queryClient = new QueryClient();

  const params = {
    page: query.page?.toString() || "1",
    filter: query.filter?.toString() ?? null,
    sort: query.sort?.toString() ?? "new",
    search: query.search?.toString() ?? null,
    subcategory: query.subcategory?.toString() ?? "",
    category: query.category?.toString() ?? "webinar",
    time: "week",
  };
  const prefetchEvents = useEvents.prefetch(queryClient, params);

  const appParams = { appName: APP_NAME.learning };
  const prefetchApp = useApp.prefetch(queryClient, appParams);

  await Promise.all([prefetchApp, prefetchEvents]);

  return {
    props: {
      params,
      appParams,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Learning;
