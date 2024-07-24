import { QueryClient, dehydrate } from "@tanstack/react-query";
import Button from "components/button/button";
import PageBody from "components/page/page-body";
import type { AboutUsParams } from "modules/general/api/about-us";
import { useAboutUs } from "modules/general/api/about-us";
import { useMembershipBenefit } from "modules/membership/api/membership-benefit";
import { useMembershipListPlan } from "modules/membership/api/membership-list";
import type { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Membership = ({}: Props) => {
  const router = useRouter();

  const { data: benefit } = useMembershipBenefit({ type: "membership" });
  return (
    <div className=" bg-pv-white-light">
      <PageBody>
        <h1 className="mb-4 text-center text-2xl font-medium xl:text-4xl">
          Tipe Keanggotaan
        </h1>
        <div className="mb-10 grid gap-6 xl:grid-cols-3">
          {benefit?.map((item, i) => (
            <div
              key={i}
              className="cursor-pointer rounded-lg bg-pv-white-pure p-8 text-center shadow xl:p-16"
              onClick={() => router.push(`membership/${item.id}`)}
            >
              <div className="mb-6 flex justify-center">
                <img src={item.image} alt="" />
              </div>
              {item.title.toLowerCase().includes("warrior") ? (
                <p className="flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-star-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256"
                      style={{
                        fill: `rgb(255, 222, 0)`,
                        stroke: "rgba(128, 128, 128, 0.3)",
                      }}
                    />
                  </svg>
                </p>
              ) : item.title.toLowerCase().includes("elite") ? (
                <p className="flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-star-fill"
                    viewBox="0 0 16 16"
                    style={{ marginRight: "2px" }}
                  >
                    <path
                      d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256"
                      style={{
                        fill: `rgb(255, 222, 0)`,
                        stroke: "rgba(128, 128, 128, 0.3)",
                      }}
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-star-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256"
                      style={{
                        fill: `rgb(255, 222, 0)`,
                        stroke: "rgba(128, 128, 128, 0.3)",
                      }}
                    />
                  </svg>
                </p>
              ) : item.title.toLowerCase().includes("epic") ? (
                <p className="flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-star-fill"
                    viewBox="0 0 16 16"
                    style={{ marginRight: "2px" }}
                  >
                    <path
                      d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256"
                      style={{
                        fill: `rgb(255, 222, 0)`,
                        stroke: "rgba(128, 128, 128, 0.3)",
                      }}
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-star-fill"
                    viewBox="0 0 16 16"
                    style={{ marginRight: "2px" }}
                  >
                    <path
                      d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256"
                      style={{
                        fill: `rgb(255, 222, 0)`,
                        stroke: "rgba(128, 128, 128, 0.3)",
                      }}
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-star-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256"
                      style={{
                        fill: `rgb(255, 222, 0)`,
                        stroke: "rgba(128, 128, 128, 0.3)",
                      }}
                    />
                  </svg>
                </p>
              ) : null}
              <h1 className=" mb-4 text-xl font-medium">{item.title}</h1>
              <div className="h-40">
                <p className="text-xs line-clamp-6 xl:text-base">
                  {item.description}
                </p>
              </div>

              <Button
                onClick={() => router.push(`membership/${item.id}`)}
                size="m"
                variant="solid"
              >
                <span className="font-medium xl:text-lg ">Lihat Rincian</span>
              </Button>
            </div>
          ))}
        </div>
      </PageBody>
    </div>
  );
};
export const getServerSideProps = async () => {
  const queryClient = new QueryClient();
  await useMembershipListPlan.prefetch(queryClient);
  const params: AboutUsParams = {
    category: "membership",
  };

  await useAboutUs.prefetch(queryClient, params);
  return {
    props: {
      params,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
export default Membership;
