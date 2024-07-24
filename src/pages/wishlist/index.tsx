import { QueryClient, dehydrate } from "@tanstack/react-query";
import PageBody from "components/page/page-body";
import { WebinarCard } from "components/pi-learning-card/webinar-card";
import { useWishlist } from "modules/wishlist/api/list-wishlist";
import type { InferGetServerSidePropsType } from "next/types";
type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
const Wishlist = ({}: Props) => {
  const wishlist = useWishlist();
  const result = (
    <div className="grid grid-cols-2 gap-5 xl:grid-cols-3">
      {wishlist.data?.map((item) => {
        if (item.type === "event") {
          return (
            <WebinarCard
              key={item.id}
              wishlistId={item.id}
              event={{
                ...item.data,
                added_to_wishlist: true,
              }}
              category={item.data.category_name ?? ""}
              onRemove={() => {
                wishlist.refetch();
              }}
              overrideLink={
                item.data.app_name.toLowerCase() === "pievent"
                  ? `/pi-event/${item.data.id}`
                  : undefined
              }
            />
          );
        } else {
          return (
            <WebinarCard
              key={item.id}
              wishlistId={item.id}
              event={{
                ...item.data,
                added_to_wishlist: true,
              }}
              category={"onlinecourse"}
              onRemove={() => {
                wishlist.refetch();
              }}
            />
          );
        }
      })}
    </div>
  );

  return (
    <PageBody className="min-h-[550px]">
      {wishlist.data && wishlist.data.length > 0 ? (
        result
      ) : (
        <div className="flex justify-center h-full">
          <img
            className="mx-auto my-auto h-52 md:h-64 xl:h-96 md:my-auto md:w-3/5"
            src="./assets/img/empty-wishlist.jpg"
            alt=""
          />
        </div>
      )}
    </PageBody>
  );
};

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await useWishlist.prefetch(queryClient);
  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};
export default Wishlist;
//wishlist
