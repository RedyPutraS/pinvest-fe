import { QueryClient, dehydrate } from "@tanstack/react-query";
import Button from "components/button/button";
import { CustomHead } from "components/custom-head/custom-head";
import ShareButton from "components/icon/share-button";
import PageBody from "components/page/page-body";
import { PageContext } from "components/page/page-context";
import PageHeader from "components/page/page-header";
import { PiCircleForumCard } from "components/pi-circle-card/pi-circle-forum-card";
import RenderHtml from "components/render-html";
import { useAuthStore } from "hooks/use-auth-store";
import { toast } from "hooks/use-toast";
import { useAds } from "modules/ads/ads";
import { useCommentList } from "modules/feedback/api/comment-list";
import { FeedbackComment } from "modules/feedback/component/comment";
import { usePiCapitalArticle } from "modules/pi-capital/api/pi-capital-articles";
import InquiryDialog from "modules/pi-capital/components/inquiry-dialog";
import {
  useLikeShare,
  usePiCircleArticle,
  usePostLike,
} from "modules/pi-circle/pi-circle-article";
import { usePiCircleArticleDetail } from "modules/pi-circle/pi-circle-article-detail";
import type { InferGetServerSidePropsType } from "next";
import { usePathname } from "next/navigation";
import LoginPage from "pages/auth/login";
import { useState } from "react";
const TYPE = "article";
const APP = "picircle";
type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

function PiCircleDetail({ id, adsParam }: Props) {
  const auth = useAuthStore();
  const { data } = usePiCircleArticleDetail(id as string);
  const [inquiryDialogOpen, setInquiryDialogOpen] = useState(false);
  const { data: ads } = useAds(adsParam);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: forum } = usePiCircleArticle({
    category: "forum",
  });
  const { data: dataCommentList } = useCommentList({
    slug: id,
    app: APP,
    type: TYPE,
  });

  const { data: dataLikeShare, refetch } = useLikeShare(id);
  const postLike = usePostLike();

  const likeShare = () => {
    postLike
      .mutateAsync(id)
      .then(() => {
        toast({
          title: "Forum like berhasil!",
        });
      })
      .catch(() => {
        toast({
          title: "Forum like gagal!",
        });
      })
      .finally(() => {
        refetch();
      });
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="h-[90%] w-[90%] rounded bg-white shadow-lg md:h-[90%] md:w-1/3">
            <div className="flex cursor-pointer justify-end p-3">
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
        <PageHeader className="mb-4">
          <img
            src={data?.cover_image}
            className="mx-auto mt-6 w-screen p-3 xl:h-[400px] xl:max-w-[1440px] xl:px-[70px]"
            alt=""
          />
        </PageHeader>
        <PageBody>
          <div className="grid gap-4 xl:grid-cols-4">
            <div className="col-span-1 lg:col-span-3">
              <div className="flex justify-between border-b-[1px] border-pv-grey-medium3 pb-4">
                <div className="flex h-[56px] items-center">
                  <img
                    src={data?.thumbnail_image}
                    alt=""
                    className="h-[56px] w-[56px] rounded bg-pv-grey-light2 object-contain"
                  />
                  <div className="mr-4 pl-4 font-semibold text-gray-600 text-sm xl:text-2xl">
                    {data?.title}
                  </div>
                </div>

                {data?.category_name === "Forum" ? (
                  <div className="mt-12 flex p-2 xl:p-0 text-sm">
                    <div className="mr-6 flex items-center">
                      <img
                        className="mr-2 h-5 w-5 xl:h-8 xl:w-8"
                        src="/assets/icon/eye.svg"
                        alt="eye"
                      />
                      <span className="mr-1">{data?.view}</span>
                      <span>Dilihat</span>
                    </div>
                    <div
                      className="mr-6 flex cursor-pointer items-center"
                      onClick={likeShare}
                    >
                      <img
                        className="mr-2 h-4 w-4 xl:h-7 xl:w-7"
                        src="/assets/icon/thumbs-up-outline-black.svg"
                        alt="thumbs-up"
                      />
                      <span className="mr-1">{dataLikeShare?.data.like}</span>
                      <span>Suka</span>
                    </div>
                    <div className="mr-6 flex items-center">
                      <img
                        className="mr-2 h-3 w-3 xl:h-6 xl:w-6"
                        src="/assets/icon/chat-outlined.svg"
                        alt="eye"
                      />
                      <span className="mr-1">{dataCommentList?.length}</span>
                      <span>Komentar</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="hidden h-[56px] items-center xl:flex">
                      <Button
                        onClick={() => {
                          if (auth.user) {
                            setInquiryDialogOpen(true);
                          } else {
                            setIsOpen(true);
                          }
                        }}
                        size="m"
                        className="w-full
                    "
                      >
                        <span className="text-md font-medium">
                          {auth.user ? <div>Inquiry</div> : <div>Inquiry</div>}
                        </span>
                      </Button>
                      <ShareButton
                        className="ml-4 mt-2 h-full"
                        path={`/pi-circle/${id}`}
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="py-2">
                <div key={data?.title} className="border-b pb-4">
                  <RenderHtml
                    html={data?.description ?? ""}
                    key={data?.description}
                    className="mt-4"
                  />
                </div>
              </div>

              {data?.id && (
                <FeedbackComment
                  type={TYPE}
                  slug={data.id.toString()}
                  app={APP}
                  visible={true}
                />
              )}
              <div className="mt-10"></div>
              {data?.category_name === "Forum" && (
                <div className="items-center">
                  <div className="relative my-4 flex justify-start whitespace-nowrap py-2 text-start text-2xl text-sky-800 transition-all before:absolute before:bottom-0 before:z-0 before:h-2 before:w-full before:rounded before:bg-sky-800">
                    Forum Lainnya
                  </div>
                  {forum?.data?.map((group) => (
                    <PiCircleForumCard
                      key={group.id}
                      article={group as never}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col col-span-1">
              {ads
                ?.filter((v) => v.type === "vertical")
                .map((ad, i) => (
                  <div key={i} className="m-1">
                    <a href={ad.url}>
                      <img src={ad.image} alt="" className="w-full"/>
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

export default PiCircleDetail;

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
