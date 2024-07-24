import { QueryClient, dehydrate } from "@tanstack/react-query";
import PageBody from "components/page/page-body";
import RenderHtml from "components/render-html";
import { useAboutUs, type AboutUsParams } from "modules/general/api/about-us";
import type { InferGetServerSidePropsType } from "next";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Syarat = ({ params }: Props) => {
  const { data } = useAboutUs(params);
  return (
    <div>
      <PageBody className="pt-10 pb-32 xl:mx-[25%]">
        <div className="pb-2 text-2xl font-medium">{data?.title}</div>
        <RenderHtml
          html={data?.content ?? ""}
          className="text-pv-grey-medium3"
        />
      </PageBody>
    </div>
  );
};
export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  const params: AboutUsParams = {
    category: "syarat",
  };

  await useAboutUs.prefetch(queryClient, params);
  return {
    props: { params, dehydratedState: dehydrate(queryClient) },
  };
};
export default Syarat;
