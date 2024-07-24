import { QueryClient, dehydrate } from "@tanstack/react-query";
import Image from "next/image";
import type {
  InferGetServerSidePropsType,
  NextPage,
  NextPageContext,
} from "next";
import { useAds } from "modules/ads/ads";
import { Card, CardBody, CardImage } from "components/card";
import Link from "next/link";
import { cn } from "utils";
import { useRating } from "modules/feedback/api/rating";
import { useRatingList } from "modules/feedback/api/rating-list";
import { Tabs } from "components/tabs";
import { TabListHeader } from "components/tabs/tab-list-header";
import { useApps } from "utils/api/get-apps";
import { APP_NAME } from "utils/constants";
import { useRouter } from "next/router";
import {
  useArticleDetail,
  useArticlesRelated,
} from "modules/pi-learning/api/articles-related";
import { useArticles } from "modules/pi-learning/api/articles";
import { TabCategory } from "components/tabs/tab-category";
import PopupBanner from "components/popup-banner";

const APP = "pilearning";
type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
const NewsDetail: NextPage<Props> = ({ adsParam }) => {
  const { data: ads } = useAds(adsParam);
  const newsArticle = useArticles({
    limit: 3,
    page: 0,
    filter: "",
    search: "",
    category: "",
  });
  const router = useRouter();
  const parameter = router.query.subcategory;

  const newsRelated = useArticlesRelated({
    page: "",
    limit: 50,
    filter: "",
    search: "",
    category: "",
    subcategory: parameter?.toString() ?? "",
    sort: "",
  });

  const appList = useApps();
  const appData = appList.data;
  const appName = appData?.find(
    (app) => app.app_name.trim() === APP_NAME.learning.trim()
  );

  const onChangeTab = (tab: number, subcategory: string): void => {
    if (tab === 0) {
      setNewsArticleParams({
        subcategory: subcategory,
        limit: 3,
      });
    }
  };

  return (
    <>
      <div className="sticky left-0 right-0 top-14 z-20 flex h-14 justify-center bg-white xl:top-20">
        <Tabs
          onChangeTab={(tab) => {
            const category = appName?.category[tab]?.alias || "";
            onChangeTab(tab, category);
          }}
        >
          <TabListHeader>
            {appName?.category
              .filter((v) => v.alias === "article")
              .map((category, i) => (
                <TabCategory
                  key={i}
                  category={category}
                  subcategorys={category.subcategory}
                  alias={category.alias}
                >
                  <div className="text-md xl:text-xl xl:font-medium">
                    {category.category_name}
                  </div>
                </TabCategory>
              ))}
          </TabListHeader>
        </Tabs>
      </div>
      <PopupBanner app={APP} />

      <section className="container mx-auto my-4 px-4 xl:my-6">
        <div className="mb-8 flex gap-8 pt-3 lg:w-2/3 xl:w-full">
          <div className="mx-auto w-full xl:w-3/4">
            <div className="flex-1">
              {newsRelated.data?.data
                ?.filter((v) => v.publish_at)
                .map((g, i) => {
                  if (i == 0) {
                    return (
                      <div
                        key={i}
                        className="text-md xl:text-xl xl:font-medium"
                      >
                        <Link
                          href={`/pi-learning/article/${g.id}`}
                          key={g.id}
                          className={cn("md:col-span-2", "md:row-span-2")}
                        >
                          <Card className="max-w-auto min-h-full">
                            <CardImage>
                              <Image
                                fill
                                src={g.thumbnail_image ?? ""}
                                alt={`Thumbnail ${g.title}`}
                                style={{ objectFit: "cover" }}
                              />
                            </CardImage>
                            <CardBody>
                              <p className="text-xl text-sky-800">{g.title}</p>
                              <p className="mb-4 truncate text-gray-600">
                                {g.description}
                              </p>
                              <p className="text-sm text-green-500">
                                {g.subcategory_name}
                              </p>
                            </CardBody>
                          </Card>
                        </Link>
                      </div>
                    );
                  } else {
                  }
                })}
              <div className="flex">
                <div className="px-auto grid grid-cols-1 gap-4 py-4 md:grid-cols-4 lg:grid-cols-6">
                  {newsRelated?.data?.data?.map((item, index) => {
                    if (index == 0) {
                    } else {
                      return (
                        <Link
                          href={`/pi-learning/article/${item.id}`}
                          key={item.id}
                          className={cn("md:col-span-2", "md:row-span-2")}
                        >
                          <Card className="min-h-full max-w-2xl">
                            <CardImage>
                              <Image
                                fill
                                src={item.thumbnail_image}
                                alt={`Thumbnail ${item.title}`}
                                style={{ objectFit: "cover" }}
                              />
                            </CardImage>
                            <CardBody>
                              <p className="text-xl text-sky-800">
                                {item.title}
                              </p>
                              <p className="mb-4 truncate">
                                {item.description}
                              </p>
                              <p className="text-sm text-green-500">
                                {item.subcategory_name}
                              </p>
                            </CardBody>
                          </Card>
                        </Link>
                      );
                    }
                  })}
                </div>
              </div>
            </div>

            <div className="sm:flex md:hidden">
              <div className="mx-auto h-full rounded">
                <div className="items-center">
                  {ads
                    ?.filter((v) => v.type === "vertical")
                    .map((ad, i) => (
                      <div key={i} className="mb-6">
                        <a href={ad.url}>
                          <img
                            className="mx-auto w-full"
                            src={ad.image}
                            alt=""
                          />
                        </a>
                      </div>
                    ))}
                </div>

                <div className="items-center">
                  <div className="relative my-4 flex justify-center whitespace-nowrap py-2 text-start text-2xl text-sky-800 transition-all before:absolute before:bottom-0 before:z-0 before:h-2 before:w-full before:rounded before:bg-sky-800">
                    Artikel Terbaru
                  </div>
                  <div>
                    {newsArticle.data?.map((item, index) => {
                      const isLarge = index === 1;
                      return (
                        <Link
                          href={`/pi-learning/article/${item.id}`}
                          key={item.id}
                          className={cn(
                            isLarge && "md:col-span-2",
                            isLarge && "md:row-span-2"
                          )}
                        >
                          <Card className="mx-auto my-4 w-full">
                            <CardImage>
                              <Image
                                fill
                                src={item.thumbnail_image}
                                alt={`Thumbnail ${item.title}`}
                                style={{ objectFit: "cover" }}
                              />
                            </CardImage>
                            <CardBody>
                              <p className="text-xl text-sky-800">
                                {item.title}
                              </p>
                              {isLarge && (
                                <p className="mb-4 truncate">
                                  {item.description}
                                </p>
                              )}
                              <p className="text-sm text-green-500">
                                {item.subcategory_name}
                              </p>
                            </CardBody>
                          </Card>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:flex">
            <div className="mx-auto h-full w-72 rounded md:w-full">
              <div className="items-center">
                {ads
                  ?.filter((v) => v.type === "vertical")
                  .map((ad, i) => (
                    <div key={i} className="mb-6">
                      <a href={ad.url}>
                        <img className="mx-auto w-full" src={ad.image} alt="" />
                      </a>
                    </div>
                  ))}
              </div>

              <div className="items-center">
                <div className="relative my-4 flex justify-center whitespace-nowrap py-2 text-start text-2xl text-sky-800 transition-all before:absolute before:bottom-0 before:z-0 before:h-2 before:w-full before:rounded before:bg-sky-800">
                  Artikel Terbaru
                </div>
                <div>
                  {newsArticle.data?.map((item, index) => {
                    const isLarge = index === 1;
                    return (
                      <Link
                        href={`/pi-learning/article/${item.id}`}
                        key={item.id}
                        className={""}
                      >
                        <Card className="my-4 w-72 md:w-full lg:w-72">
                          <CardImage>
                            <Image
                              fill
                              src={item.thumbnail_image}
                              alt={`Thumbnail ${item.title}`}
                              style={{ objectFit: "cover" }}
                            />
                          </CardImage>
                          <CardBody>
                            <p className="text-xl text-sky-800">{item.title}</p>
                            {isLarge && (
                              <p className="mb-4 truncate">
                                {item.description}
                              </p>
                            )}
                            <p className="text-sm text-green-500">
                              {item.subcategory_name}
                            </p>
                          </CardBody>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>
    </>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  const query = context.query;
  const queryClient = new QueryClient();

  const params = {
    slug: query.slug?.toString() || "",
    type: "article",
    app: "pinews",
  };
  const prefetchDetail = useArticleDetail.prefetch(queryClient, params);
  const prefetchRating = useRating.prefetch(queryClient, params);
  const prefetchRatingList = useRatingList.prefetch(queryClient, params);

  await Promise.all([prefetchDetail, prefetchRating, prefetchRatingList]);

  await useArticleDetail.prefetch(queryClient, params);
  const adsParam = {
    appName: APP,
  };
  const prefetchAds = useAds.prefetch(queryClient, adsParam);
  await prefetchAds;
  return {
    props: {
      params,
      adsParam,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default NewsDetail;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function setNewsArticleParams(_arg0: { subcategory: string; limit: number }) {
  try {
    throw "";
  } catch (e) {}
}
