import { QueryClient, dehydrate } from "@tanstack/react-query";
import { CustomHead } from "components/custom-head/custom-head";
import ShareArticle from "components/icon/share-article";
import PopupBanner from "components/popup-banner";
import RenderHtml from "components/render-html";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "components/tabs";
import Tiket from "components/tiket";
import { format, parse } from "date-fns";
import { useAddToCart } from "modules/cart/api/add-to-cart";
import { FeedbackComment } from "modules/feedback/component/comment";
import { FeedbackRating } from "modules/feedback/component/rating";
import { useEventDetail } from "modules/pi-learning/api/events";
import type {
  InferGetServerSidePropsType,
  NextPage,
  NextPageContext,
} from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { id } from "date-fns/locale";
import type { AxiosError } from "axios";
import { toast } from "hooks/use-toast";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Detail: NextPage<Props> = ({ params }) => {
  const router = useRouter();
  const { data } = useEventDetail({
    slug: params.slug ?? "",
  });
  const addToCart = useAddToCart();
  const APP = "pilearning";
  const handleAddToCart = (qty: number, event: string, id: number) => {
    addToCart
      .mutateAsync({
        type: event,
        content_id: id,
        qty,
      })
      .then(() => router.push("/cart"))
      .catch((err: AxiosError) => {
        toast({
          title:
            (err.response?.data as any)?.message ??
            "Gagal menambahkan ke keranjang",
        });
      });
  };

  return (
    <>
      <CustomHead title={data?.title} image={data?.cover_image} />
      <PopupBanner app={APP} />

      <section className="mx-auto mb-8 w-screen p-3 xl:max-w-[1440px] xl:px-[70px]">
        <div className="relative aspect-detail-cover overflow-hidden rounded-lg lg:mt-10">
          <Image
            fill
            src={data?.cover_image ?? ""}
            alt={`Thumbnail ${data?.title}`}
            style={{ objectFit: "cover" }}
          />
        </div>

        <p className="mt-4 font-semibold text-pv-blue-light lg:text-xl">
          {(data?.ticket &&
            format(
              parse(data?.ticket[0]?.date ?? "", "yyyy-MM-dd", new Date()),
              "iiii, dd MMMM yyyy ",
              { locale: id }
            )) ??
            "Expired"}
        </p>
        <div className="flex items-center justify-between">
          <h1 className="mt-4 text-2xl text-gray-600 lg:text-6xl">
            {data?.title}
          </h1>
          <div>
            <ShareArticle />
          </div>
        </div>

        <div className="my-8">
          <Tabs>
            <TabList>
              <Tab>Deskripsi</Tab>
              <Tab>Tiket</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <h2 className="mt-8 text-xl font-semibold text-gray-600 lg:text-2xl">
                  Jadwal
                </h2>
                <div className="md:hidden">
                  <div className="mb-4 flex gap-2">
                    <img
                      src="/assets/icon/calendar.svg"
                      className="h-10 w-10 "
                      alt="time icon"
                    />
                    <div>
                      Tanggal
                      <div>
                        {data?.ticket &&
                        typeof data?.ticket[0]?.date === "string"
                          ? `${format(
                              parse(
                                data?.ticket[0]?.date ?? "",
                                "yyyy-MM-dd",
                                new Date()
                              ),
                              "iiii, dd MMMM yyyy ",
                              { locale: id }
                            )}`
                          : "Expired"}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <img
                      src="/assets/icon/map-trifold.svg"
                      className="h-10 w-10"
                      alt="ticket icon"
                    />
                    <div>
                      Alamat
                      <div>
                        {data?.type == "offline" ? data?.address : data?.type}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 hidden items-center pb-4 text-lg font-semibold xl:flex">
                  <div className="flex">
                    <div className="rounded bg-gray-50 p-2">
                      <img
                        src="/assets/icon/calendar.svg"
                        className="h-10 w-10 "
                        alt="time icon"
                      />
                    </div>
                    <div className="relative flex-row">
                      <div>
                        <span className="col-span-2 ml-2 text-sm text-gray-600">
                          Tanggal
                        </span>
                      </div>
                      <p className="ml-2 whitespace-nowrap text-sm text-gray-400">
                        {data?.ticket &&
                        typeof data?.ticket[0]?.date === "string"
                          ? `${format(
                              parse(
                                data?.ticket[0]?.date ?? "",
                                "yyyy-MM-dd",
                                new Date()
                              ),
                              "iiii, dd MMMM yyyy ",
                              { locale: id }
                            )}`
                          : "Expired"}
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="rounded bg-gray-50 p-2 xl:ml-10">
                      <img
                        src="/assets/icon/map-trifold.svg"
                        className="h-10 w-20"
                        alt="ticket icon"
                      />
                    </div>
                    <div className="relative flex-row">
                      <span className="col-span-2 ml-2 text-sm text-gray-600">
                        Alamat
                      </span>
                      <p className="ml-2 text-sm text-gray-400 xl:w-96">
                        {data?.type == "offline" ? data?.address : data?.type}
                      </p>

                      <Link
                        target="_blank"
                        className=" ml-2 whitespace-nowrap text-sm text-gray-600"
                        href={
                          data?.type == "offline"
                            ? `http://maps.google.com/?q=${data?.google_location}`
                            : ""
                        }
                      >
                        {data?.type == "offline" ? "Lihat Maps" : ""}
                      </Link>
                    </div>
                  </div>
                </div>

                <h2 className="mt-8 border-t text-xl font-semibold text-gray-600 lg:text-2xl">
                  Deskripsi Umum
                </h2>
                <div className="mt-4 flex items-center border-b pb-4 text-lg font-semibold">
                  <div className="rounded bg-gray-50 p-2">
                    <img
                      src="/assets/icon/time.svg"
                      className="h-10 w-10"
                      alt="time icon"
                    />
                  </div>
                  <p className="ml-2 text-gray-600">{data?.duration ?? 0}</p>
                  <div className="ml-10 rounded bg-gray-50 p-2 ">
                    <img
                      src="/assets/icon/ticket.svg"
                      className="h-10 w-10"
                      alt="ticket icon"
                    />
                  </div>
                  <p className="ml-2 text-gray-600">Tiket Online</p>
                </div>

                <article>
                  {data?.description.map((item) => (
                    <div key={item.title} className="border-b pb-4">
                      <h2 className="mt-8 text-xl font-semibold text-gray-600 lg:text-2xl">
                        {item.title}
                      </h2>
                      <RenderHtml
                        html={item.description ?? ""}
                        key={item.description}
                        className="mt-4"
                      />
                    </div>
                  ))}
                  <FeedbackRating
                    type={params.category}
                    slug={params.slug}
                    app={params.app}
                  />

                  <FeedbackComment
                    type={params.category}
                    slug={params.slug}
                    app={params.app}
                  />
                </article>
              </TabPanel>

              <TabPanel>
                <div className="mt-4 flex flex-col gap-4">
                  {data?.ticket?.map((item) => {
                    const event =
                      params.category === "onlinecourse"
                        ? "online-course"
                        : "event";
                    return (
                      <Tiket
                        key={item?.id}
                        onSubmit={(body) =>
                          handleAddToCart(body.qty, event, item?.id ?? 0)
                        }
                        title={
                          item?.title +
                            ` - ${format(
                              parse(item?.date ?? "", "yyyy-MM-dd", new Date()),
                              "iiii, dd MMMM yyyy ",
                              { locale: id }
                            )}` ?? data.title
                        }
                        price={item?.price ?? 0}
                        dataItem={item}
                        eventData={data}
                      />
                    );
                  })}
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </section>
    </>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  const query = context.query;
  const queryClient = new QueryClient();

  const params = {
    slug: query.slug?.toString() || "",
  };

  await useEventDetail.prefetch(queryClient, params);

  return {
    props: {
      params: {
        ...params,
        category: "event",
        app: "pilearning",
      },
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Detail;
