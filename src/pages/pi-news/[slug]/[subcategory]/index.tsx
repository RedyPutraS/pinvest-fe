import { QueryClient, dehydrate } from "@tanstack/react-query";
import Image from "next/image";
import type {
  InferGetServerSidePropsType,
  NextPage,
  NextPageContext,
} from "next";
import { useNewsDetail } from "modules/pi-news/api/news-detail";
import { useAds } from "modules/ads/ads";
import { Card, CardBody, CardImage } from "components/card";
import Link from "next/link";
import { cn } from "utils";
import { useNews } from "modules/pi-news/api/news-mini";
import { useNewsRelated } from "modules/pi-news/api/news-related";
import { useRating } from "modules/feedback/api/rating";
import { useRatingList } from "modules/feedback/api/rating-list";
import { Tabs } from "components/tabs";
import { TabListHeader } from "components/tabs/tab-list-header";
import { TabDropdown } from "components/tabs/tab-dropdown";
import { useApps } from "utils/api/get-apps";
import { APP_NAME } from "utils/constants";
import { useRouter } from "next/router";
import PopupBanner from "components/popup-banner";
import PageBody from "components/page/page-body";

const APP = "pinews";
type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
const NewsDetail: NextPage<Props> = ({ adsParam }) => {
  const { data: ads } = useAds(adsParam);
  const newsArticle = useNews({ start: 0, limit: 3, sortBy: "asc" });
  const router = useRouter();
  const parameter = router.query.subcategory;
  const newsRelated = useNewsRelated({
    start: 0,
    limit: 50,
    subCat: "" + parameter,
  });

  const appList = useApps();
  const appData = appList.data;
  const appName = appData?.find(
    (app) => app.app_name.trim() === APP_NAME.news.trim()
  );

  return (
    <>
      <div className="sticky left-0 right-0 top-14 z-20 flex h-16 justify-center bg-white xl:top-20">
        <PopupBanner app={APP} />
        <Tabs>
          <TabListHeader>
            {appName?.category.map((category, i) => (
              <TabDropdown
                key={i}
                subcategorys={category?.subcategory}
                alias={category?.alias}
              >
                <div className="text-md xl:text-xl xl:font-medium">
                  {category?.category_name}
                </div>
              </TabDropdown>
            ))}
          </TabListHeader>
        </Tabs>
      </div>

      <PageBody>
        <div className="mb-8 grid grid-cols-7 gap-6 pt-3 lg:w-2/3 xl:w-full">
          <div className="mx-auto w-full md:col-span-5">
            <div className="flex-1">
              {newsRelated.data
                ?.filter((v) => v.id)
                .map((g, i) => {
                  if (i == 0) {
                    return (
                      <div
                        key={i}
                        className="text-md xl:text-xl xl:font-medium"
                      >
                        <Link
                          href={`/pi-news/${g.id}`}
                          key={g.id}
                          className={cn("md:col-span-2", "md:row-span-2")}
                        >
                          <Card className="max-w-auto min-h-full">
                            <CardImage>
                              <Image
                                fill
                                quality={100}
                                src={g.thumbnail_image ?? ""}
                                alt={`Thumbnail ${g.title}`}
                                style={{ objectFit: "fill" }}
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
                <div className="px-auto grid grid-cols-1 gap-4 py-4 md:grid-cols-6">
                  {newsRelated.data
                    ?.filter((v) => v.id)
                    .map((item, index) => {
                      if (index == 0) {
                      } else {
                        return (
                          <Link
                            href={`/pi-news/${item.id}`}
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
                                <p className="mb-4 truncate text-gray-600">
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
              <div className="mx-auto w-full rounded ">
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
                    Latest News
                  </div>
                  <div>
                    {newsArticle.data
                      ?.filter((v) => v.publish_at)
                      .map((item, index) => {
                        const isLarge = index === 1;
                        return (
                          <Link
                            href={`/pi-news/${item.id}`}
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
                                  <p className="mb-4 truncate text-gray-600">
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
          <div className="hidden md:flex ">
            <div className="">
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
                  Latest News
                </div>
                <div>
                  {newsArticle.data
                    ?.filter((v) => v.publish_at)
                    .map((item, index) => {
                      const isLarge = index === 1;
                      return (
                        <Link
                          href={`/pi-news/${item.id}`}
                          key={item.id}
                          className={cn(
                            isLarge && "md:col-span-2",
                            isLarge && "md:row-span-2"
                          )}
                        >
                          <Card className="my-4 w-full xl:w-80">
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
                                <p className="mb-4 truncate text-gray-600">
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
      </PageBody>
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
  const prefetchDetail = useNewsDetail.prefetch(queryClient, params);
  const prefetchRating = useRating.prefetch(queryClient, params);
  const prefetchRatingList = useRatingList.prefetch(queryClient, params);

  await Promise.all([prefetchDetail, prefetchRating, prefetchRatingList]);

  await useNewsDetail.prefetch(queryClient, params);
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
