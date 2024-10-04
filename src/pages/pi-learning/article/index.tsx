/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
import { Tab, Tabs, TabList } from "components/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/select";
import ArticleItem from "modules/pi-learning/components/landing/article-item";
import { useArticles } from "modules/pi-learning/api/articles";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { type InferGetServerSidePropsType, type NextPageContext } from "next";
import { useRouter } from "next/router";
import { APP_NAME } from "utils/constants/app";
import { useApp } from "utils/api/get-apps";
import React, { useMemo, useState } from "react";
import { Spinner } from "components/spinner";
import SectionBanner from "modules/home/components/section-banner";
import { useArticlesRelated } from "modules/pi-learning/api/articles-related";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import Button from "components/button/button";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Learning = ({ appParams }: Props) => {
  const router = useRouter();
  const app = useApp(appParams);
  const [search1, setSearch] = useState<string>();
  const [filter, setFilter] = useState<string>("new"); // Default value "new"
  const [category, setCategory] = useState<string>(""); // Default value ""

  const handleSortChange = (sort: string) => {
    setFilter(sort);
  };

  const handleCategoryChange = (category: string) => {
    setCategory(category);
  };

  const reset = () => {
    setFilter("new");
    setCategory("");
    setSearch(undefined);
  };

  const handleChangeTab = (page: number) => {
    const category = app.data?.category[page]?.alias;
    router.push({ pathname: category }, undefined, {
      shallow: true,
    });
  };

  const initActiveTab = useMemo(
    () =>
      app.data?.category.findIndex((category) => category.alias === "article"),
    [app.data?.category]
  );
  const [active, setActive] = React.useState("1");

  const articleRelated = useArticlesRelated({
    page: active,
    limit: 12,
    search: search1?.toString() ?? "",
    category: null,
    subcategory: category?.toString() ?? "",
    filter: null,
    sort: filter?.toString() ?? "",
  });
  console.log("Article", articleRelated.data);
  const total_page = articleRelated.data?.page.total_page ?? 0;
  // const [page, setPage] = useState(1);
  const subCategory = app.data?.category.find(
    (category) => category.alias === "article"
  );
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
    } as any);
  const next = () => {
    const activeNumber = Number(active);
    if (activeNumber == articleRelated?.data?.page?.total_page) return;

    setActive((activeNumber + 1).toString());
  };
  const prev = () => {
    const activeNumber = Number(active);
    if (activeNumber == 1) return;

    setActive((activeNumber - 1).toString());
  };
  console.log(total_page === Number(active));
  

  return (
    <>
      <SectionBanner tab="pilearning" />
      <section className="mx-auto mb-8 w-screen p-3 xl:max-w-[1440px] xl:px-[70px]">
        <Tabs initActiveTab={initActiveTab} onChangeTab={handleChangeTab}>
          {app.isLoading && <Spinner center />}
          <TabList>
            {app.data?.category.map((category) => (
              <Tab key={category.category_name}>{category.category_name}</Tab>
            ))}
          </TabList>

          <div className="mt-5 flex-wrap xl:flex">
            <div className="flex flex-1 justify-end">
            <Select value={filter} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Terbaru" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">Terbaru</SelectItem>
                <SelectItem value="popular">Terpopuler</SelectItem>
              </SelectContent>
            </Select>

            <Select value={category} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Semua</SelectItem>
                {subCategory?.subcategory?.map((subCat) => (
                  <SelectItem key={subCat.subcategory_name} value={subCat.subcategory_name.toLocaleLowerCase()}>
                    {subCat.subcategory_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <button onClick={reset}>Reset</button>
            </div>
          </div>

          {articleRelated.isLoading && <Spinner center />}
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {articleRelated?.data?.data?.map((article, index) => (
              <ArticleItem
                key={index}
                articleId={article.id}
                title={article.title}
                description={article.description}
                thumbnail={article.thumbnail_image}
                subcategory={article?.subcategory_name ?? ""}
                publishedAt={article.publish_at}
                rate={article.rate}
              />
            ))}
          </div>
        </Tabs>
        {total_page > 1 && (
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

              <div className="mx-4 items-center gap-2">
                {articleRelated?.data?.page?.links[0]?.label == null ? (
                  <Button {...getItemProps("1")}>
                    {articleRelated?.data?.page?.current_page}
                  </Button>
                ) : (
                  articleRelated?.data?.page?.links?.map((items) => (
                    <Button {...getItemProps(items?.label)}>{items?.label}</Button>
                  ))
                )}
              </div>
              {
                Number(active) !== total_page && (
                  <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-2 rounded-full"
                    onClick={next}
                    disabled={
                      active == articleRelated?.data?.page?.total_page.toString()
                    }
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
                {articleRelated?.data?.page?.links[0]?.label == null ? (
                  <Button {...getItemProps("1")}>
                    {articleRelated?.data?.page?.current_page}
                  </Button>
                ) : (
                  <Button
                    {...getItemProps(
                      articleRelated?.data?.page?.current_page.toString()
                    )}
                  >
                    {articleRelated?.data?.page?.current_page}
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
                    disabled={
                      active == articleRelated?.data?.page?.total_page.toString()
                    }
                  >
                    <div className="flex">
                      {/* <span className="mr-2">Selanjutnya</span> */}
                      <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                    </div>
                  </Button>
                )
              }
            </div>
          </>
        )}
      </section>
    </>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  const query = context.query;
  const queryClient = new QueryClient();

  const params = {
    page: parseInt(query.page?.toString() || "1"),
    filter: query.filter?.toString() ?? null,
    search: query.search?.toString() ?? null,
    category: query.category?.toString() ?? null,
  };
  const prefetchArticles = useArticles.prefetch(queryClient, params);

  const appParams = { appName: APP_NAME.learning };
  const prefetchApp = useApp.prefetch(queryClient, appParams);

  await Promise.all([prefetchArticles, prefetchApp]);

  return {
    props: {
      params,
      appParams,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Learning;
