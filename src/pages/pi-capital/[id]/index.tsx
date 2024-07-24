import { QueryClient, dehydrate } from "@tanstack/react-query";
import Button from "components/button/button";
import { CustomHead } from "components/custom-head/custom-head";
import ShareButton from "components/icon/share-button";
import PageBody from "components/page/page-body";
import { PageContext } from "components/page/page-context";
import PageHeader from "components/page/page-header";
import PopupBanner from "components/popup-banner";
import RenderHtml from "components/render-html";
import { useAuthStore } from "hooks/use-auth-store";
import { useAds } from "modules/ads/ads";
import { FeedbackComment } from "modules/feedback/component/comment";
import { FeedbackRating } from "modules/feedback/component/rating";
import { usePiCapitalArticle } from "modules/pi-capital/api/pi-capital-articles";
import InquiryDialog from "modules/pi-capital/components/inquiry-dialog";
import type { InferGetServerSidePropsType } from "next";
import { usePathname } from "next/navigation";
import LoginPage from "pages/auth/login";
import { useState } from "react";

const TYPE = "article";
const APP = "picapital";
type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

function PiCapitalDetail({ id, adsParam }: Props) {
  const { data } = usePiCapitalArticle(id as string);
  const [inquiryDialogOpen, setInquiryDialogOpen] = useState(false);
  const { data: ads } = useAds(adsParam);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const auth = useAuthStore();
  return (
    <>
      {" "}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="h-[90%] w-[90%] rounded bg-white shadow-lg md:h-[90%] md:w-1/3">
            <div className="flex justify-end p-3">
              <img
                src="/assets/icon/close.svg"
                className="h-10 w-10 "
                onClick={() => setIsOpen(false)}
                alt={"close icon"}
              />
            </div>
            <LoginPage redirect={pathname} />
          </div>
        </div>
      )}
      <CustomHead title={data?.title} image={data?.cover_image} />
      <PageContext.Provider value={{ id, type: TYPE, app: APP }}>
        <InquiryDialog
          id={id}
          app={APP}
          showDialog={inquiryDialogOpen}
          onClose={function (val: boolean): void {
            setInquiryDialogOpen(val);
          }}
        />
        <PopupBanner app={APP} />

        <PageHeader className="my-4 bg-transparent">
          <img src={data?.cover_image} alt="" />
        </PageHeader>
        <PageBody>
          <div className="grid grid-cols-3 gap-4 xl:grid-cols-4">
            <div className="col-span-3">
              <div className="flex justify-between border-pv-grey-medium3 xl:border-b-[1px] xl:pb-4">
                <div className="flex h-[56px] items-center">
                  <img
                    src={data?.thumbnail_image}
                    alt=""
                    className="h-[56px] w-[56px] rounded bg-pv-grey-light2 object-contain"
                  />
                  <div className="pl-2 font-semibold xl:pl-4 xl:text-4xl">
                    {data?.title}
                  </div>
                </div>
                <div className="hidden h-[56px] items-center xl:flex">
                  <Button
                    onClick={() =>
                      auth.user ? setInquiryDialogOpen(true) : setIsOpen(true)
                    }
                    size="m"
                  >
                    <span className="text-md font-medium">Inquiry</span>
                  </Button>
                  <ShareButton
                    className="ml-4 mt-2 h-full"
                    path={`/pi-capital/${id}`}
                  />
                </div>
              </div>
              <div className="py-2 text-xs xl:text-base">
                <RenderHtml html={data?.description || ""} />
              </div>

              <div className="mb-4 flex h-[56px] items-center xl:hidden">
                <div className="flex-1">
                  <Button
                    className="h-9 w-full"
                    onClick={() =>
                      auth.user ? setInquiryDialogOpen(true) : setIsOpen(true)
                    }
                    size="m"
                  >
                    <span className="text-md font-medium">Inquiry</span>
                  </Button>
                </div>
                <ShareButton
                  className="ml-4 mt-1 h-11 xl:mt-2 xl:h-full"
                  path={`/pi-capital/${id}`}
                />
              </div>
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
            <div className="col-span-1 hidden xl:block">
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
}

export default PiCapitalDetail;

export const getServerSideProps = async (context: {
  query: { id: string };
}) => {
  const { id } = context.query;
  const queryClient = new QueryClient();
  const prefetchArticle = usePiCapitalArticle.prefetch(queryClient, id);
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
