import { QueryClient, dehydrate } from "@tanstack/react-query";
import Button from "components/button/button";
import PageBody from "components/page/page-body";
import PageHeader from "components/page/page-header";
import PopupLogin from "components/popup-login/popup-login";
import RenderHtml from "components/render-html";
import { useAuthStore } from "hooks/use-auth-store";
import { useDisclosure } from "hooks/use-disclosure";
import { useCollabsDetail } from "modules/collabs/collabs-detail";
import InquiryFormDialog from "modules/pi-capital/components/inquiry-form-dialog";
import type { InferGetServerSidePropsType } from "next";
import { useState } from "react";
import { cn } from "utils";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Page = ({ id }: Props) => {
  const { data } = useCollabsDetail({ alias: id });
  const { onToggle, isOpen, setIsOpen } = useDisclosure();
  const auth = useAuthStore();
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  return (
    <div className=" bg-pv-white-light">
      {isLoginPopupOpen && (
        <PopupLogin onClose={() => setIsLoginPopupOpen(false)} />
      )}
      <div
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50",
          {
            hidden: !isOpen,
          }
        )}
      ></div>
      <PageHeader className="block bg-pv-white-pure pb-10 xl:mb-10 xl:h-auto xl:min-h-fit xl:max-w-[1300px] xl:pb-10">
        <div className="flex items-center justify-center">
          <img
            src={data?.detail.banner_image}
            className="md:h-[300px]"
            alt=""
          />
        </div>
        <div className="grid px-4 xl:flex xl:justify-between xl:pl-16">
          <div className="xl:py-16 xl:pr-16">
            <p className="py-8 text-xl font-medium">Kemitraan</p>
            <h1 className="mb-2 text-4xl font-medium">
              {data?.detail.app_name}
            </h1>
            <RenderHtml
              className="mb-4 text-pv-grey-medium3"
              html={data?.detail.description}
            />
            <Button
              className="mb-8 xl:mb-0"
              size="m"
              onClick={() =>
                auth.user ? onToggle() : setIsLoginPopupOpen(true)
              }
            >
              Inquiry
            </Button>
          </div>
        </div>
      </PageHeader>
      <PageBody>
        <h1 className="text-center text-2xl font-medium xl:mb-10 xl:text-4xl">
          Keuntungan Bermitra
        </h1>
        <div className="mb-10 grid gap-6 xl:grid-cols-3">
          {data?.partnership_benefit?.map((item, i) => (
            <div
              key={i}
              className="rounded-lg bg-pv-white-pure p-8 text-center shadow xl:p-16"
            >
              <div className="mb-6 flex justify-center">
                <img src={item.image} alt="" />
              </div>
              <h1 className=" mb-4 text-xl font-medium">{item.title}</h1>
              <p className="text-xs xl:text-base">{item.description}</p>
            </div>
          ))}
        </div>
      </PageBody>
      <InquiryFormDialog
        app={id}
        showDialog={isOpen}
        handleClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default Page;

export const getServerSideProps = async (context: {
  query: { id: string };
}) => {
  const { id } = context.query;
  const queryClient = new QueryClient();
  const prefetchDetail = useCollabsDetail.prefetch(queryClient, { alias: id });
  await prefetchDetail;

  return {
    props: {
      id,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
