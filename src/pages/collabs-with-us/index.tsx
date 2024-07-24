import { QueryClient, dehydrate } from "@tanstack/react-query";
import CollabsItem from "components/collabs/collabs-item";
import PageBody from "components/page/page-body";
import PageHeader from "components/page/page-header";
import RenderHtml from "components/render-html";
import { useCollabs } from "modules/collabs/collabs";
import SectionBanner from "modules/home/components/section-banner";
import type { InferGetServerSidePropsType } from "next";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const CollabsWithUs = ({}: Props) => {
  const { data } = useCollabs();
  return (
    <div>
      <PageHeader>
        <SectionBanner tab="collabs" />
      </PageHeader>
      <PageBody>
        <div className="mx-2 xl:mx-[12%]">
          <div className="pb-2 text-xl font-bold xl:mb-10 xl:text-center xl:text-4xl xl:font-medium">
            {data?.title}
          </div>
          <RenderHtml
            html={data?.content ?? ""}
            className="mb-10 text-pv-grey-medium3"
          />
          {data?.apps?.map((apps, idx) => (
            <CollabsItem
              key={idx}
              reverse={idx % 2 !== 0}
              title={apps.app_name}
              image={apps.vector_image ?? "/assets/icon/pilearning-collabs.svg"}
              description={apps.description ?? ""}
              path={`/collabs-with-us/${apps.alias}`}
            />
          )) ?? <></>}
        </div>
      </PageBody>
    </div>
  );
};
export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await useCollabs.prefetch(queryClient);
  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};
export default CollabsWithUs;
