import { QueryClient, dehydrate } from "@tanstack/react-query";
import PageBody from "components/page/page-body";
import InquiryDialog from "modules/pi-capital/components/inquiry-dialog";
import type { InferGetServerSidePropsType } from "next";
import { useEffect, useState } from "react";
import { PageContext } from "components/page/page-context";
import { useSpotifyDetail } from "modules/pi-cast/api/spotify-detail";
import { useYoutubeDetail } from "modules/pi-cast/api/youtube-detail";
import { formatDistanceToNow, formatRelative, parseISO } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { useRouter } from "next/router";
import { useInfinitePiCastYoutube } from "modules/pi-cast/api/youtube-filtered";
import InfiniteScroll from "react-infinite-scroll-component";
import ShareButton from "components/icon/share-button";
import { useAds } from "modules/ads/ads";
import { FeedbackComment } from "modules/feedback/component/comment";
import { FeedbackRating } from "modules/feedback/component/rating";
import { CustomHead } from "components/custom-head/custom-head";
import { Spinner } from "components/spinner";
import MetaHead from "components/metahead/metahead";
const TYPE = "youtube";
const APP = "picast";
type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const PiCastYoutubeDetail = ({ id, adsParam }: Props) => {
  const { data } = useYoutubeDetail(id as string);
  const [inquiryDialogOpen, setInquiryDialogOpen] = useState(false);
  const {
    data: piCastYoutube,
    fetchNextPage,
    hasNextPage,
    isInitialLoading,
  } = useInfinitePiCastYoutube({
    limit: 4,
  });
  const router = useRouter();
  const { data: ads } = useAds(adsParam);
  return (
    <>
      <MetaHead title={"Youtube PiNspire"} url={`https://pinvest.co.id/${router.asPath}`} image={"/assets/img/pinvest-logo.png"} description={"Tekan Link Untuk Detail Youtube PiNspire..."} />
      <PageContext.Provider value={{ id, type: TYPE, app: APP }}>
        <InquiryDialog
          id={id}
          app={APP}
          showDialog={inquiryDialogOpen}
          onClose={function (val: boolean): void {
            setInquiryDialogOpen(val);
          }}
        />
        <PageBody>
          <div className="gap-4 px-4 xl:grid xl:grid-cols-8 xl:px-0">
            <div className="col-span-6">
              <div>
                <iframe
                  src={`https://www.youtube.com/embed/${id}`}
                  className="aspect-video w-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                />
              </div>
              <h1 className="mt-8 text-xl font-medium text-gray-600">
                {data?.items && data?.items[0]?.snippet.title}
              </h1>
              <div className="mt-4 flex">
                <img src="/assets/icon/channel_profile.png" alt="" />
                <div className="ml-2 flex-grow my-auto">
                  <p className="font-medium text-gray-600">
                    {data?.items &&
                      data?.items[0]?.snippet.channelTitle}
                  </p>
                </div>
                <div className="flex rounded-lg border-[1px] border-pv-blue-light mr-3">
                  <img
                    src="/assets/icon/thumbs-up-outline.svg"
                    className="px-2 my-auto w-[40px] h-[40px]"
                    alt=""
                  />
                  <div className="my-auto pr-2 text-pv-blue-light">
                    
                    {(data?.items &&
                      data?.items[0]?.statistics.likeCount) ??
                      "0"}
                  </div>
                </div>
                <div className="ml-2 flex rounded-lg border-[1px] border-pv-blue-light items-center">
                  <ShareButton
                    path={`/pi-cast/youtube/${id}`}
                    type="icon"
                    className="w-[40px] h-[40px]"
                  />
                </div>
              </div>
              <div className="mt-4 rounded-lg bg-pv-white-light p-4 text-gray-600">
                <p>
                  {(data?.items &&
                    data?.items[0]?.statistics.viewCount) ??
                    "0"}{" "}
                  views Premiered{" "}
                  {data?.items &&
                    data?.items[0]?.snippet.publishedAt &&
                    formatRelative(
                      parseISO(data?.items[0]?.snippet.publishedAt),
                      new Date(),
                      {
                        locale: localeId,
                      }
                    )}
                </p>
                <p className="break-words text-gray-600">
                  {data?.items && data?.items[0]?.snippet.description}
                </p>
              </div>
              <FeedbackRating
                type={TYPE}
                slug={id.toString() ?? "-"}
                app={APP}
              />

              <FeedbackComment
                type={TYPE}
                slug={id.toString() ?? "-"}
                app={APP}
              />
            </div>
            <div className="col-span-2">
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
              {isInitialLoading ? (
                <h4 className="py-4 text-center text-lg"><Spinner center /></h4>
              ) : (
                <div className="h-[600px] overflow-y-auto -mt-10">
                  <div className="relative my-4 flex justify-center whitespace-nowrap py-2 text-start text-2xl text-sky-800 transition-all before:absolute before:bottom-0 before:z-0 before:h-2 before:w-full before:rounded before:bg-sky-800">
                    Vidio Lainnya
                  </div>
                  <InfiniteScroll
                    style={{ overflow: "hidden" }}
                    dataLength={piCastYoutube?.pages.length ?? 0}
                    next={fetchNextPage}
                    hasMore={hasNextPage || false}
                    loader={
                      <h4 className="py-4 text-center text-lg"><Spinner center /></h4>
                    }
                  >
                    {piCastYoutube?.pages.map((group, gi) => (
                      <div key={gi}>
                        {group.items.map((video, i) => (
                          <div
                            key={i}
                            className="mb-2 grid cursor-pointer grid-cols-7 gap-2 hover:bg-pv-white-light"
                            onClick={() => {
                              router.push(
                                `/pi-cast/youtube/${video.id.videoId}`
                              );
                            }}
                          >
                            <div className="col-span-3">
                              <img
                                src={video.snippet.thumbnails.medium.url}
                                className="rounded-md"
                                alt=""
                              />
                            </div>
                            <div className="col-span-4">
                              <div className="pr-10 text-sm font-semibold line-clamp-2">
                                {video.snippet.title}
                              </div>
                              <div className="mb-2 text-[10px] font-light text-pv-grey-medium3">
                                {video.snippet.channelTitle}
                              </div>
                              <div className="text-xs">
                                <span>
                                  {video.videoData?.statistics.viewCount} views
                                </span>
                                <span className="px-2">•</span>
                                <span>
                                  {formatDistanceToNow(
                                    parseISO(video.snippet.publishedAt),
                                    { addSuffix: true, locale: localeId }
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </InfiniteScroll>
                </div>
              )}
            </div>
          </div>
        </PageBody>
      </PageContext.Provider>
    </>
  );
};

export default PiCastYoutubeDetail;

export const getServerSideProps = async (context: {
  query: { id: string };
}) => {
  const { id } = context.query;
  const queryClient = new QueryClient();
  const prefetchArticle = useSpotifyDetail.prefetch(queryClient, id);
  await prefetchArticle;

  const adsParam = {
    appName: APP,
  };
  const prefetchAds = useAds.prefetch(queryClient, adsParam);
  await prefetchAds;
  return {
    props: {
      id,
      adsParam,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
