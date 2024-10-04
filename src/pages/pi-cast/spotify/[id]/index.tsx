/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryClient, dehydrate } from "@tanstack/react-query";
import PageBody from "components/page/page-body";
import PageHeader from "components/page/page-header";
import InquiryDialog from "modules/pi-capital/components/inquiry-dialog";
import type { InferGetServerSidePropsType } from "next";
import React, { useEffect, useState } from "react";
import { PageContext } from "components/page/page-context";
import RenderHtml from "components/render-html";
import { useSpotifyDetail } from "modules/pi-cast/api/spotify-detail";
import { format, formatDuration, parse } from "date-fns";
import { id as localeId } from "date-fns/locale";
import PiCastSpotifyItem from "components/pi-cast-spotify/pi-cast-spotify-item";
import { useAds } from "modules/ads/ads";
import { FeedbackComment } from "modules/feedback/component/comment";
import { FeedbackRating } from "modules/feedback/component/rating";
import ShareButton from "components/icon/share-button";
import { usePiCastSpotifyPaginate } from "modules/home/api/pi-cast-spotify-paginate";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Button from "components/button/button";
import { useRouter } from "next/router";
import { CustomHead } from "components/custom-head/custom-head";
const TYPE = "spotify";
const APP = "picast";
type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const PiCastSpotifyDetail = ({ id, adsParam }: Props) => {
  const { data } = useSpotifyDetail(id as string);
  // console.log(id);
  
  const [inquiryDialogOpen, setInquiryDialogOpen] = useState(false);
  const { data: ads } = useAds(adsParam);
  
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();
  const [active, setActive] = React.useState("1");
  
  const { data: datas } = usePiCastSpotifyPaginate({
    page: active,
    limit: 5,
  });
  
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
    if (activeNumber == datas?.page?.total_page) return;

    setActive((activeNumber + 1).toString());
  };
  const prev = () => {
    const activeNumber = Number(active);
    if (activeNumber == 1) return;

    setActive((activeNumber - 1).toString());
  };
  // useEffect(() => {
  //   console.log(data);
  // }, [data])
  console.log(data);
  return (
    <>
      <CustomHead title={data?.name} image={data?.images[0]?.url} />
      <PageContext.Provider value={{ id, type: TYPE, app: APP }}>
        <InquiryDialog
          id={id}
          app={APP}
          showDialog={inquiryDialogOpen}
          onClose={function (val: boolean): void {
            setInquiryDialogOpen(val);
          }}
        />
        <PageHeader className="w-screen xl:max-w-[1300px] p-5 lg:p-0">
          <iframe
            src={`https://open.spotify.com/embed/episode/${id}`}
            width="100%"
            height="352"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </PageHeader>
        <PageBody>
          <div className="p-4 xl:grid xl:grid-cols-4 xl:gap-4 xl:p-0">
            <div className="text-gray-600 xl:col-span-3">
              {data?.release_date &&
                format(
                  parse(data.release_date, "yyyy-MM-dd", new Date()),
                  "MMM dd"
                )}{" "}
              •{" "}
              {formatDuration(
                {
                  seconds: Math.floor((data?.duration_ms || 1000) / 1000),
                },
                {
                  format: ["hours", "minutes", "seconds"],
                  zero: true,
                  locale: localeId,
                }
              )}
              <div className="flex items-center justify-end -mt-8 lg:-mt-6">
                <ShareButton
                  className="lg:w-[50px] lg:h-[40px]"
                  path={`/pi-cast/spotify/${id}`}
                />
              </div>
              <div className="w-full py-2">
                <RenderHtml
                  className="break-words"
                  html={data?.html_description || ""}
                />
              </div>
              <FeedbackRating
                type={TYPE}
                slug={id.toString() ?? "-"}
                app={APP}
              />
              <FeedbackComment
                type={TYPE}
                slug={data?.id.toString() ?? "-"}
                app={APP}
              />
              <div className="my-4 mt-8 items-center">
                {ads
                  ?.filter((v) => v.type === "horizontal")
                  .map((ad, i) => (
                    <div key={i} className="mb-6">
                      <a href={ad.url}>
                        <img className="mx-auto w-full" src={ad.image} alt="" />
                      </a>
                    </div>
                  ))}
              </div>
              <div className="mt-4 xl:grid-cols-4">
                <div className="xl:col-span-3">
                  <h1 className="text-xl font-medium text-gray-600 xl:hidden">
                    Semua Episode
                  </h1>
                  {datas?.data?.tracks?.items.map(
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
                  
                </div>
              </div>
            </div>
            <div className="hidden xl:col-span-1 xl:block">
              {ads
                ?.filter((v) => v.type === "vertical")
                .map((ad, i) => (
                  <div key={i} className="mb-6">
                    <a href={ad.url}>
                      <img src={ad.image} alt="" />
                    </a>
                  </div>
                ))}
            </div>
          </div>
        </PageBody>
      </PageContext.Provider>
    </>
  );
};

export default PiCastSpotifyDetail;

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
