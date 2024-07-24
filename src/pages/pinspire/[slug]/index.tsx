import { QueryClient, dehydrate } from "@tanstack/react-query";
import RenderHtml from "components/render-html";
import Image from "next/image";
import type {
  InferGetServerSidePropsType,
  NextPage,
  NextPageContext,
} from "next";
import Head from "next/head";
import { useNewsDetail } from "modules/pi-news/api/news-detail";
import { useAds } from "modules/ads/ads";
import { Card, CardBody, CardImage } from "components/card";
import Link from "next/link";
import { cn } from "utils";
import { useNews } from "modules/pi-news/api/news-mini";
import { useNewsRelated } from "modules/pi-news/api/news-related";
import Author from "modules/pi-learning/components/detail/author";
import { FeedbackRating } from "modules/feedback/component/rating";
import { FeedbackComment } from "modules/feedback/component/comment";
import { useRating } from "modules/feedback/api/rating";
import { useRatingList } from "modules/feedback/api/rating-list";
import PopupBanner from "components/popup-banner";
import Cover from "modules/pi-learning/components/detail/cover";
const APP = "pinews";
type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
const NewsDetail: NextPage<Props> = ({ params, adsParam }) => {
  const news = useNewsDetail(params);
  const { data: ads } = useAds(adsParam);
  const newsArticle = useNews({ start: 0, limit: 3, sortBy: "asc" });
  const subCategorys = news.data?.subcategory_name;
  const subString = subCategorys?.toLowerCase();
  const newsRelated = useNewsRelated({
    start: 0,
    limit: 3,
    subCat: subString,
  });

  const { author, publish_at, subcategory_name } = news.data ?? {};

  return (
    <>
      <PopupBanner app={APP} />

      <Head>
        <title>{news.data?.title ?? ""}</title>
      </Head>
      <section className="container mx-auto my-10 px-4">
        {/* <div className="relative mt-10 aspect-video overflow-hidden rounded-lg">
          <Image
            fill
            src={news.data?.cover_image ?? ""}
            alt={`Thumbnail ${news.data?.title}`}
            style={{ objectFit: "cover" }}
          />
        </div> */}
        <section className="mx-auto mt-4 w-full p-3 xl:max-w-[1440px] xl:px-[70px]">
          <h1 className="my-4 text-center text-2xl text-sky-800 lg:text-4xl xl:text-6xl">
            {news.data?.title}
          </h1>

          {/* <p className="my-4 text-center text-pv-grey-medium2">
            {format(
              parse(
                news.data?.publish_at ?? "2023-05-06 23:20:18",
                "yyyy-MM-dd HH:mm:ss",
                new Date()
              ),
              "iiii, dd MMMM yyyy, H:mm"
            )}
          </p> */}
          <Cover coverUrl={news.data?.cover_image ?? ""} />
        </section>
        <div className="mx-auto mb-8 flex w-full gap-8 p-3 pt-3 xl:flex  xl:max-w-[1440px] xl:px-[70px]">
          <div className="flex-1">
            <Author
              author={author ?? "Tidak Diketahui"}
              publishedAt={publish_at}
              subcategory={subcategory_name || ""}
            />
            <RenderHtml className="my-6" html={news?.data?.description ?? ""} />

            <div className="sm:flex md:hidden">
              <div className="mx-auto h-full rounded">
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
                  <div className="relative my-4 flex justify-center whitespace-nowrap py-2 text-start text-2xl text-sky-800 transition-all before:absolute before:bottom-0 before:z-0 before:h-2 before:w-full before:rounded before:bg-sky-800">
                    Latest News
                  </div>
                  <div>
                    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-6">
                      {newsArticle.data?.map((item, index) => {
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
              Berita Terkait
            </div>
            <div className="flex">
              <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-6">
                {newsRelated.data?.map((item, index) => {
                  const isLarge = index === 1;
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
                          <p className="text-xl text-sky-800">{item.title}</p>
                          {isLarge && (
                            <p className="mb-4 truncate">{item.description}</p>
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
            <div className="mx-auto h-full w-72 rounded">
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
                  {newsArticle.data?.map((item, index) => {
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
