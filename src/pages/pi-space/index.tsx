import PageBody from "components/page/page-body";
import { useAuthStore } from "hooks/use-auth-store";
import type { PiSpaceArticle, PiSpaceParams } from "modules/home/api/pi-space";
import { usePiSpace } from "modules/home/api/pi-space";
import SectionBanner from "modules/home/components/section-banner";
import InquiryDialog from "modules/pi-capital/components/inquiry-dialog";
import router from "next/router";
import { useState } from "react";
import { cn } from "utils";
import { PiSpace as IconPiSpace } from "modules/home/components/program-menu-icon";
import PopupBanner from "components/popup-banner";
const PiSpace = () => {
  const auth = useAuthStore();
  const APP = "pispace";
  const params: PiSpaceParams = {
    page: 1,
    limit: 100,
  };
  const piSpace = usePiSpace(params);
  const [inquiryDialogOpen, setInquiryDialogOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<PiSpaceArticle>();
  const openInquiry = (article: PiSpaceArticle) => {
    setInquiryDialogOpen(true);
    setSelectedArticle(article);
  };
  return (
    <>
      <InquiryDialog
        id={selectedArticle?.id.toString() ?? ""}
        app={"pispace"}
        showDialog={inquiryDialogOpen}
        onClose={function (val: boolean): void {
          setInquiryDialogOpen(val);
        }}
      />
      <SectionBanner tab="pispace" />

      <PopupBanner app={APP} />
      <PageBody>
        <IconPiSpace />
        {piSpace.data?.map((article, i) => (
          <>
            <div
              key={i}
              className={cn(
                "my-4 hidden cursor-pointer rounded-lg border-2 border-white p-4 hover:border-2 hover:border-gray-200 xl:flex",
                i % 2 === 0 ? "flex-row" : "flex-row-reverse"
              )}
              onClick={() => router.push(`/pi-space/${article.id}`)}
            >
              <div className="flex-1">
                <img
                  src={article.thumbnail_image}
                  alt=""
                  className="h-[350px] rounded-lg object-cover"
                />
              </div>
              <div className="w-8"></div>
              <div className="flex-1 py-8 text-pv-grey-medium3">
                <div className=" mb-2 text-pv-blue-light">PiSpace</div>
                <div className="mb-4 text-[20px] font-semibold">
                  {article.title}
                </div>
                <div className="mb-5">{article.description}</div>
                <button
                  className="h-11 rounded-lg bg-pv-blue-dark px-8 py-2 text-sm font-light text-pv-white-pure hover:bg-pv-blue-light"
                  onClick={() => {
                    auth.user
                      ? openInquiry(article as PiSpaceArticle)
                      : router.push("/auth/login");
                  }}
                >
                  Inquiry
                </button>
              </div>
            </div>
            <div
              key={i}
              className={cn(
                "flex cursor-pointer flex-col rounded-lg border-2 border-white hover:border-2 xl:my-4 xl:hidden xl:p-4",
                i % 2 === 0 ? "xl:flex-row" : "xl:flex-row-reverse"
              )}
            >
              <div onClick={() => router.push(`/pi-space/${article.id}`)}>
                <div className="flex-1">
                  <img
                    src={article.thumbnail_image}
                    alt=""
                    className="rounded-lg object-cover xl:h-[350px]"
                  />
                </div>
                <div className="xl:w-8"></div>
                <div className="flex-1 py-1 text-pv-grey-medium3 xl:py-8">
                  <div className="my-1 text-xs text-pv-blue-light xl:text-base">
                    PiSpace
                  </div>
                  <div className="text-lg font-semibold xl:mb-4 xl:text-xl">
                    {article.title}
                  </div>
                  <div className="mb-2 text-xs xl:mb-5 xl:text-base">
                    {article.description}
                  </div>
                </div>
              </div>
              <div>
                <button
                  className="mb-6 rounded-lg bg-pv-blue-dark px-4 py-2 text-xs font-light text-pv-white-pure hover:bg-pv-blue-light xl:h-11 xl:px-8 xl:text-sm"
                  onClick={() => {
                    auth.user
                      ? openInquiry(article as PiSpaceArticle)
                      : router.push("/auth/login");
                  }}
                >
                  Inquiry
                </button>
              </div>
            </div>
          </>
        ))}
      </PageBody>
    </>
  );
};

export default PiSpace;
