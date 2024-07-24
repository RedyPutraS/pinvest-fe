import { QueryClient, dehydrate } from "@tanstack/react-query";
import { CardImage } from "components/card";
import { CustomHead } from "components/custom-head/custom-head";
import ShareButton from "components/icon/share-button";
import PageBody from "components/page/page-body";
import { PageContext } from "components/page/page-context";
import PopupBanner from "components/popup-banner";
import PopupLogin from "components/popup-login/popup-login";
import RenderHtml from "components/render-html";
import { useAuthStore } from "hooks/use-auth-store";
import { useAds } from "modules/ads/ads";
import { FeedbackComment } from "modules/feedback/component/comment";
import { FeedbackRating } from "modules/feedback/component/rating";
import InquiryDialog from "modules/pi-capital/components/inquiry-dialog";
import type { PackageItem } from "modules/pi-space/api/pi-space-article";
import { usePiSpaceArticle } from "modules/pi-space/api/pi-space-article";
import PackageCard from "modules/pi-space/components/package-card";
import type { InferGetServerSidePropsType } from "next";
import { useState } from "react";

const TYPE = "article";
const APP = "pispace";
type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const PiSpaceDetail = ({ id, adsParam }: Props) => {
  const auth = useAuthStore();
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const { data } = usePiSpaceArticle(id as string);
  const [inquiryDialogOpen, setInquiryDialogOpen] = useState(false);
  const { data: ads } = useAds(adsParam);

  return (
    <>
      {isLoginPopupOpen && (
        <PopupLogin onClose={() => setIsLoginPopupOpen(false)} />
      )}
      <CustomHead title={data?.title} image={data?.cover_image} />
      <PageContext.Provider value={{ id, type: TYPE, app: APP }}>
        <InquiryDialog
          id={id}
          app={APP}
          showDialog={inquiryDialogOpen}
          onClose={function (val: boolean): void {
            auth.user ? setInquiryDialogOpen(val) : setIsLoginPopupOpen(true);
          }}
        />
        {/* <PageHeader>
        <div className="relative">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-lg font-semibold text-white xl:text-6xl xl:font-medium">
          {data?.title}
          </div>
          <img
            src={data?.cover_image}
            alt=""
            className="max-h-[400px] w-screen object-cover"
            />
            </div>
          </PageHeader> */}
        <PopupBanner app={APP} />
        <PageBody>
          <CardImage className="relative aspect-auto">
            <img
              src={data?.cover_image}
              alt=""
              className="max-h-[400px] w-screen object-cover"
            />
          </CardImage>
          <div className="grid grid-cols-3 gap-4 xl:mt-4 xl:grid-cols-4">
            <div className="col-span-3">
              <div className="flex justify-between border-b-[1px] border-pv-grey-medium3 pb-4">
                <div className="flex h-14 items-center">
                  <div className="text-xl font-bold xl:text-4xl xl:font-semibold">
                    Detail
                  </div>
                </div>
                <div className="flex h-14 items-center">
                  <button
                    className="mr-4 rounded-lg bg-pv-blue-dark px-8 py-2 text-xs font-light text-pv-white-pure hover:bg-pv-blue-light xl:h-14 xl:text-base"
                    onClick={() => {
                      auth.user
                        ? setInquiryDialogOpen(true)
                        : setIsLoginPopupOpen(true);
                    }}
                  >
                    Inquiry
                  </button>
                  <ShareButton
                    path={`/pi-space/${id}`}
                    type="outlined"
                    className="h-8 xl:h-auto"
                  />
                </div>
              </div>
              <div className="py-2 xl:mb-20">
                <RenderHtml
                  className="text-xs xl:text-base"
                  html={data?.description || ""}
                />
              </div>
              {data?.title === "In-Advertising" && (
                <div className="mb-10">
                  <div className="mb-10 text-lg font-semibold xl:text-2xl">
                    Harga
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {data?.packages.map((packageItem: PackageItem, i) => (
                      <PackageCard key={i} packageItem={packageItem} />
                    ))}
                  </div>
                </div>
              )}
              <FeedbackRating
                type={TYPE}
                slug={data?.id.toString() ?? "-"}
                app={APP}
              />
              <div className="mb-4">
                <FeedbackComment
                  type={TYPE}
                  slug={data?.id.toString() ?? "-"}
                  app={APP}
                />
              </div>
              <div className="items-center">
                {ads
                  ?.filter((v) => v.type === "horizontal")
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

export default PiSpaceDetail;

export const getServerSideProps = async (context: {
  query: { id: string };
}) => {
  const { id } = context.query;
  const queryClient = new QueryClient();
  const prefetchArticle = usePiSpaceArticle.prefetch(queryClient, id);
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
