/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryClient, dehydrate } from "@tanstack/react-query";
import Button from "components/button/button";
import PageHeader from "components/page/page-header";
import PopupLogin from "components/popup-login/popup-login";
import RenderHtml from "components/render-html";
import { useAuthStore } from "hooks/use-auth-store";
import { useMembershipBenefit } from "modules/membership/api/membership-benefit";
import { useMembershipDetailPlan } from "modules/membership/api/membership-detail";
import DialogMembership from "modules/membership/components/dialog-membership";
import type { InferGetServerSidePropsType } from "next";
import { useState } from "react";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
const MembershipDetail = ({ id }: Props) => {
  const auth = useAuthStore();
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useMembershipDetailPlan({ id });
  return (
    <div className=" bg-pv-white-light">
      {isLoginPopupOpen && (
        <PopupLogin onClose={() => setIsLoginPopupOpen(false)} />
      )}
      <PageHeader className="bg-pv-white-pure pb-10 xl:min-h-fit xl:max-w-[1300px] xl:pb-20">
        <div className="grid w-full px-4 lg:grid-cols-2 xl:flex xl:justify-between xl:pl-16">
          <div className="xl:py-16 xl:pr-16">
            <p className="py-8 text-xl font-medium">Keanggotaan</p>
            <h1 className="mb-2 text-4xl font-medium">{data?.plan_name}</h1>

            <RenderHtml
              className="mb-4 text-pv-grey-medium3"
              html={data?.description}
            />
            {data?.plan_name.toLowerCase().includes("elite") && (
              <Button
                className="mb-8 xl:mb-0"
                size="m"
                onClick={() => {
                  auth.user ? setIsOpen(true) : setIsLoginPopupOpen(true);
                }}
              >
                Daftar
              </Button>
            )}
          </div>
          <div className="mt-10">
            <span className="flex justify-center">
              <img
                key={data?.id}
                src={data?.thumbnail_image}
                alt=""
                className="rounded-xl bg-pv-white-pure p-2 shadow-md shadow-slate-400 md:min-w-[500px]"
              />
            </span>
          </div>
        </div>
      </PageHeader>
      <DialogMembership
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        durations={data?.durations ?? []}
      />
    </div>
  );
};
export default MembershipDetail;
export const getServerSideProps = async (context: {
  query: { id: string };
}) => {
  const { id } = context.query;
  const queryClient = new QueryClient();
  const prefetchMembershipDetail = useMembershipDetailPlan.prefetch(
    queryClient,
    { id: id }
  );
  await prefetchMembershipDetail;
  const type = "membership";
  const prefetchMembershipBenefit = useMembershipBenefit.prefetch(queryClient, {
    type: type,
  });
  await prefetchMembershipBenefit;
  return {
    props: {
      id,
      type,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
