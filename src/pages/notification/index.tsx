import { QueryClient, dehydrate } from "@tanstack/react-query";
import PageBody from "components/page/page-body";
import { format, parse as dateParse } from "date-fns";
import {
  useInfiniteNotifications,
  useNotifications,
  usePostNotification,
} from "modules/notification/notification";
import type { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";
import { cn } from "utils";
import { id } from "date-fns/locale";
import useStore from "app/store";
type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
const NotificationPage = ({ params }: Props) => {
  const { data, fetchNextPage, hasNextPage, isInitialLoading, refetch } =
    useInfiniteNotifications(params);
  const postNotification = usePostNotification();
  const { decrementN } = useStore();
  const router = useRouter();
  const readNotification = (notification: {
    id: number;
    title: string;
    transaction_id: number;
    order_id: string;
    content: string;
    is_read: boolean;
    created_at: string;
    payment_progress: string;
  }) => {
    const orderid = encodeURIComponent(notification.order_id);
    if (notification.payment_progress === "booking") {
      router.push(`/checkout/payment?order=${orderid}`);
    } else {
      router.push(`/transaction/${orderid}`);
    }
    postNotification
      .mutateAsync({ notification_id: notification.id })
      .then(() => {
        refetch();
        decrementN();
      });
  };
  return (
    <PageBody className="min-h-[550px]">
      <h1 className="text-2xl font-semibold xl:text-5xl">Notifikasi</h1>
      {isInitialLoading ? (
        <h4 className="py-4 text-center text-lg">Loading...</h4>
      ) : (
        <div className="my-4 grid grid-cols-1 gap-4 bg-pv-white-light py-4 xl:my-8">
          <InfiniteScroll
            style={{ overflow: "hidden" }}
            dataLength={data?.pages.length ?? 0}
            next={fetchNextPage}
            hasMore={hasNextPage || false}
            loader={<h4 className="py-4 text-center text-lg">Loading...</h4>}
          >
            {data?.pages.map((group) =>
              group.map((v) => (
                <div
                  className="mb-4 flex cursor-pointer items-start px-4 hover:bg-pv-white-pure xl:items-center"
                  onClick={() => readNotification(v)}
                  key={v.id}
                >
                  <div className="rounded bg-pv-green p-1 xl:rounded-xl xl:p-6">
                    <img src="/assets/icon/notification-white.svg" alt="" />
                  </div>
                  <div className="flex-1 pl-4">
                    <div className="font-medium xl:text-xl">{v.title}</div>
                    <div className="text-xs xl:text-base">{v.content}</div>
                    <div className="text-xs xl:text-base">
                      {v.created_at &&
                        format(
                          dateParse(
                            v.created_at,
                            "yyyy-MM-dd HH:mm:ss",
                            new Date()
                          ),
                          "iiii, dd MMMM yyyy, H:mm",
                          { locale: id }
                        )}
                    </div>
                  </div>
                  <div>
                    <div
                      className={cn(
                        "h-2 w-2 rounded-full xl:m-2 xl:h-6 xl:w-6",
                        !v.is_read ? "bg-pv-blue-light" : "bg-pv-grey-medium1"
                      )}
                    />
                  </div>
                </div>
              ))
            )}
            {data?.pages[0]?.length === 0 && (
              <div className="mb-4 flex flex-col items-center justify-center">
                <img src="/assets/img/nonotif.png" className="w-72" alt="" />
                <h1 className="text-3xl">Notifikasi Kosong</h1>
              </div>
            )}
          </InfiniteScroll>
        </div>
      )}
    </PageBody>
  );
};

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();
  const params = { limit: 5 };
  const prefetch = useNotifications.prefetch(queryClient, params);
  await prefetch;

  return {
    props: {
      params,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default NotificationPage;
