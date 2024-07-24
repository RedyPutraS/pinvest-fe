import { QueryClient, dehydrate } from "@tanstack/react-query";
import PageBody from "components/page/page-body";
import { useToc } from "modules/general/api/toc";
import RenderHtml from "components/render-html";
const Page = () => {
  const { data } = useToc();
  return (
    <div>
      <PageBody className="pt-10 pb-32 xl:mx-[25%]">
        <div className="pb-2 text-2xl font-medium">{data?.title}</div>
        <RenderHtml html={data?.content ?? ""} />
      </PageBody>
    </div>
  );
};
export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await useToc.prefetch(queryClient);

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};
export default Page;
