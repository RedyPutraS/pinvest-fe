import { QueryClient, dehydrate } from "@tanstack/react-query";
import { useDetailOnlineCourse } from "modules/online-course/api/detail-online-course";
import { type InferGetServerSidePropsType, type NextPageContext } from "next";
import ReactPlayer from "react-player";
import Head from "next/head";
import PageBody from "components/page/page-body";
import { usePlayOnlineCourse } from "modules/online-course/api/play-online-course";
import { useRef } from "react";
import { FeedbackRating } from "modules/feedback/component/rating";
import { FeedbackComment } from "modules/feedback/component/comment";
import Collapse from "components/collapse";
import RenderHtml from "components/render-html";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const OnlineCoursePage = ({ params }: Props) => {
  const playerRef = useRef();
  const onlinecourse = usePlayOnlineCourse(params);

  return (
    <>
      <Head>
        <title>{onlinecourse.data?.meta_title ?? ""}</title>
      </Head>

      <div className="min-h-screen overflow-hidden">
        <PageBody className="w-auto mx-10">
          <div className="react-player-container col-span-12 lg:col-span-8 mx-6 bg-black">
            {onlinecourse.data?.video_url && (
              <ReactPlayer
                  style={{ width: "100%" }}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  ref={playerRef}
                  controls
                  url={onlinecourse.data.video_url}
                />
            )}
          </div>
          <div className="mx-6">
            <article>
              {onlinecourse.data?.description.map((item) => (
                <div key={item.title} className="border-b pb-4">
                  <h2 className="mt-8 text-xl xl:text-2xl font-bold">{item.title}</h2>
                  <Collapse>
                    <RenderHtml
                      html={item.description ?? ''}
                      key={item.description}
                      className="mt-4"
                    />
                  </Collapse>
                </div>
              ))}
            </article>

            <FeedbackRating type="online-course" slug={params.id} app="pilearning" />

            <FeedbackComment type="online-course" slug={params.id} app="pilearning" />
          </div>
        </PageBody>
      </div>
    </>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  const query = context.query;
  const queryClient = new QueryClient();

  const params = {
    id: query.slug?.toString() ?? "-1",
  };

  await useDetailOnlineCourse.prefetch(queryClient, params);

  return {
    props: {
      params,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default OnlineCoursePage;
