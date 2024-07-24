import { QueryClient, dehydrate } from "@tanstack/react-query";
import RenderHtml from "components/render-html";
import { useRating } from "modules/feedback/api/rating";
import { useRatingList } from "modules/feedback/api/rating-list";
import { FeedbackComment } from "modules/feedback/component/comment";
import { FeedbackRating } from "modules/feedback/component/rating";
import { useArticleDetail } from "modules/pi-learning/api/articles";
import { useArticlesRelated } from "modules/pi-learning/api/articles-related";
import Author from "modules/pi-learning/components/detail/author";
import Cover from "modules/pi-learning/components/detail/cover";
import { type InferGetServerSidePropsType, type NextPageContext } from "next";
import { useAds } from "modules/ads/ads";
import { Card, CardBody, CardImage } from "components/card";
import Link from "next/link";
import Image from "next/image";
import { cn } from "utils";
import { Tabs } from "components/tabs";
import { useApps } from "utils/api/get-apps";
import { APP_NAME } from "utils/constants";
import { TabListHeader } from "components/tabs/tab-list-header";
import { TabCategory } from "components/tabs/tab-category";
import PopupBanner from "components/popup-banner";
import { CustomHead } from "components/custom-head/custom-head";

const APP = "pilearning";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
const Detail = ({ params, adsParam }: Props) => {
  const article = useArticleDetail(params);
  const { data: ads } = useAds(adsParam);
  const articleLatest = useArticlesRelated({
    category: "article",
    filter: "asc",
    limit: 3,
    page: "",
    search: null,
    subcategory: null,
    sort: null,
  });
  const subCategorys = article.data?.subcategory_name;
  const subString = subCategorys?.toLowerCase();

  const articleRelated = useArticlesRelated({
    category: null,
    filter: "popular",
    limit: 3,
    page: "",
    search: null,
    subcategory: subString?.toString() ?? "",
    sort: null,
  });
  const { author, publish_at, subcategory_name, meta_title, cover_image } =
    article.data ?? {};

  const appList = useApps();
  const appData = appList.data;
  const appName = appData?.find(
    (app) => app.app_name.trim() === APP_NAME.learning.trim()
  );

  const onChangeTab = (tab: number, subcategory: string): void => {
    if (tab === 0) {
      setNewPiArticleParams({
        subcategory: subcategory,
        limit: 3,
      });
    }
  };

  return (
    <>
      <CustomHead title={meta_title} image={cover_image} />
      <div className="sticky left-0 right-0 top-14 z-20 flex h-16 justify-center bg-white xl:top-20">
        <Tabs
          onChangeTab={(tab) => {
            const category = "article" || "";
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

      <section>
        <section className="mx-auto w-screen p-3 xl:max-w-[1440px] xl:px-[70px]">
          <h1 className="text-center text-2xl text-sky-800 md:mb-4 lg:text-4xl xl:text-6xl">
            {article?.data?.title}
          </h1>
          <Cover coverUrl={cover_image} />
        </section>
        <div className="mx-auto mb-8 flex w-full gap-8 p-3 pt-3 xl:flex  xl:max-w-[1440px] xl:px-[70px]">
          <div className="flex-1">
            <Author
              author={author ?? ""}
              publishedAt={publish_at}
              subcategory={subcategory_name}
            />
            <RenderHtml
              className="mt-6"
              html={article?.data?.description ?? ""}
            />

            <div className="sm:flex md:hidden">
              <div className="mx-auto  h-full rounded">
                <div className="items-center mt-3">
                  {ads
                    ?.filter((v) => v.type === "vertical")
                    .map((ad, i) => (
                      <div key={i} className="mb-6">
                        <a href={ad.url}>
                          <img
                            className="mx-auto  w-full"
                            src={ad.image}
                            alt=""
                          />
                        </a>
                      </div>
                    ))}
                </div>
                <div className="items-center">
                  <div className="relative my-4 flex justify-center whitespace-nowrap py-2 text-start text-2xl text-sky-800 transition-all before:absolute before:bottom-0 before:z-0 before:h-2 before:w-full before:rounded before:bg-sky-800">
                    Berita Terbaru
                  </div>
                  <div>
                    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-6">
                      {articleLatest.data?.data?.map((item, index) => {
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
                            <Card className="mx-auto my-4 xl:w-80">
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
            </div>
            <div className="relative my-4 flex whitespace-nowrap py-2 text-start text-2xl text-sky-800 transition-all before:absolute before:bottom-0 before:z-0 before:h-2 before:w-1/5 before:rounded before:bg-sky-800">
              Artikel Terkait
            </div>
            <div className="flex">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
                {articleRelated.data?.data?.map((item) => {
                  return (
                    <Link
                      href={`/pi-learning/article/${item.id}`}
                      key={item.id}
                      className={cn("md:col-span-2", "md:row-span-2")}
                    >
                      <Card className="min-h-full w-[900px] max-w-full">
                        <CardImage>
                          <Image
                            fill
                            src={item.thumbnail_image}
                            alt={`Thumbnail ${item.title}`}
                            style={{ objectFit: "cover" }}
                          />
                        </CardImage>
                        <CardBody>
                          <p className="h-14 text-xl text-sky-800 line-clamp-2">
                            {item.title}
                          </p>
                          <p className="mb-4 text-gray-400 line-clamp-3">
                            {item.description}
                          </p>
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
            <FeedbackRating
              type={params.type}
              slug={params.slug}
              app={params.app}
            />

            <FeedbackComment
              type={params.type}
              slug={params.slug}
              app={params.app}
            />
            <div className="mt-8 items-center">
              {ads
                ?.filter((v) => v.type === "horizontal")
                .map((ad, i) => (
                  <div key={i} className="mb-6">
                    <a href={ad.url}>
                      <img className="mx-auto  w-full" src={ad.image} alt="" />
                    </a>
                  </div>
                ))}
            </div>
          </div>

          <div className="hidden md:flex">
            <div className="mx-auto h-full w-80 rounded">
              <div className="items-center">
                {ads
                  ?.filter((v) => v.type === "vertical")
                  .map((ad, i) => (
                    <div key={i} className="mb-6">
                      <a href={ad.url}>
                        <img
                          className="mx-auto  w-full"
                          src={ad.image}
                          alt=""
                        />
                      </a>
                    </div>
                  ))}
              </div>
              <div className="items-center">
                <div className="relative my-4 flex justify-center whitespace-nowrap py-2 text-start text-2xl text-sky-800 transition-all before:absolute before:bottom-0 before:z-0 before:h-2 before:w-full before:rounded before:bg-sky-800 ">
                  Berita Terbaru
                </div>
                <div>
                  {articleLatest.data?.data?.map((item, index) => {
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
                        <Card className="my-4 w-80">
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
                            <p className="mb-4 text-gray-400 line-clamp-2">
                              {item.description}
                            </p>
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
    app: "pilearning",
  };

  const prefetchDetail = useArticleDetail.prefetch(queryClient, params);
  const prefetchRating = useRating.prefetch(queryClient, params);
  const prefetchRatingList = useRatingList.prefetch(queryClient, params);

  await Promise.all([prefetchDetail, prefetchRating, prefetchRatingList]);

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

export default Detail;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function setNewPiArticleParams(_arg0: { subcategory: string; limit: number }) {
  try {
    throw "";
  } catch (e) {}
}
