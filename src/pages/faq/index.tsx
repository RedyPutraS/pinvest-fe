import { QueryClient, dehydrate } from "@tanstack/react-query";
import Accordion from "components/accordion/accordion";
import PageBody from "components/page/page-body";
import RenderHtml from "components/render-html";
import { type AboutUsParams } from "modules/general/api/about-us";
import { useFaq } from "modules/general/api/faq";
import type { InferGetServerSidePropsType } from "next";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const FAQ = ({ params }: Props) => {
  const { data } = useFaq(params);
  return (
    <div>
      <PageBody className="xl:mt-16">
        <h1 className="mb-6 text-center text-lg font-bold xl:text-5xl xl:font-medium">
          Frequently Asked Questions
        </h1>
        <div className="mb-36">
          {data?.map((item, i) => (
            <Accordion
              title={item?.title}
              key={i}
              isFirst={i === 0}
              isLast={i === data.length - 1}
            >
              <RenderHtml
                html={item?.content ?? ""}
                className="text-pv-grey-medium3"
              />
            </Accordion>
          ))}
        </div>
      </PageBody>
    </div>
  );
};
export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  const params: AboutUsParams = {
    category: "faq",
  };

  await useFaq.prefetch(queryClient, params);
  return {
    props: { params, dehydratedState: dehydrate(queryClient) },
  };
};
export default FAQ;
