import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import Collapse from "components/collapse";
import { CustomHead } from "components/custom-head/custom-head";
import ShareArticle from "components/icon/share-article";
import PopupBanner from "components/popup-banner";
import RenderHtml from "components/render-html";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "components/tabs";
import Tiket from "components/tiket";
import { format, parse } from "date-fns";
import { id } from "date-fns/locale";
import { toast } from "hooks/use-toast";
import { useAddToCart } from "modules/cart/api/add-to-cart";
import { useCartList } from "modules/cart/api/list-cart";
import { FeedbackComment } from "modules/feedback/component/comment";
import { FeedbackRating } from "modules/feedback/component/rating";
import { useEvent } from "modules/pi-event/api/event";
import Cover from "modules/pi-learning/components/detail/cover";
import type {
  InferGetServerSidePropsType,
  NextPage,
  NextPageContext,
} from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import useStore from '../../../../src/app/store';

const APP = "picircle";
type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const EventDetail: NextPage<Props> = ({ params }) => {
  const [showMap, setShowMap] = useState(false);
  const event = useEvent(params);

  const router = useRouter();
  const addToCart = useAddToCart();
  const { refetch: reCart } = useCartList();
  const { incrementC } = useStore();
  const type = "event";
  const handleAddToCart = (qty: number, event: string, id: number, typeB: string) => {
    addToCart
      .mutateAsync({
        type: event,
        content_id: id,
        qty,
      })
      .then(() => {
        if (typeB === "redirect") {
          router.push("/cart");
        } else {
          incrementC();
          reCart();
          toast({ title: "Berhasil menambahkan ke keranjang" });
        }
      })
      .catch((err: AxiosError) => {
        toast({
          title:
            (err.response?.data as any)?.message ??
            "Gagal menambahkan ke keranjang",
        });
      });
  };
  const url = event?.data?.type == "offline" ? event.data?.google_location : "";

  return (
    <>
      <CustomHead title={event.data?.title} image={event.data?.cover_image} />
      <PopupBanner app={APP} />

      <section className="mx-auto mb-8 w-screen p-3 xl:max-w-[1440px] xl:px-[70px]">
        <Cover coverUrl={event.data?.cover_image ?? ""} />

        <h1 className="mt-10 text-2xl text-gray-600 lg:text-4xl">
          {event.data?.title}
        </h1>
        <div className="mt-2 flex justify-between"></div>
        <div className="float-right flex">
          <ShareArticle />
        </div>

        <div className="my-8">
          <Tabs>
            <TabList>
              <Tab>Deskripsi</Tab>
              <Tab>Tiket</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <article>
                  <h2 className="mt-8 text-xl font-semibold text-gray-600 lg:text-2xl">
                    Jadwal
                  </h2>
                  <div className="mt-4 items-center pb-4 text-lg font-semibold xl:flex xl:items-start">
                    {/* Kolom Alamat */}
                    <div className="flex items-center xl:items-start xl:w-1/2">
                      <div className="rounded bg-gray-50 px-2 md:py-2">
                        <img
                          src="/assets/icon/map-trifold.svg"
                          className="h-14 w-14 md:h-10 md:w-10"
                          alt="ticket icon"
                        />
                      </div>
                      <div className="relative flex flex-col ml-2">
                        <span className="text-sm text-gray-600">Alamat</span>
                        <p className="text-sm xl:w-96">
                          {event?.data?.type == "offline" && event?.data?.address}
                          {(event?.data?.type == "online-zoom" ||
                            event?.data?.type == "online-gmeet") &&
                            "Online"}
                        </p>
                      </div>
                    </div>

                    {/* Kolom Tanggal */}
                    <div className="flex items-center xl:items-start xl:w-1/2 mt-4 xl:mt-0 xl:ml-4">
                      <div className="rounded bg-gray-50 p-2">
                        <img
                          src="/assets/icon/calendar.svg"
                          className="h-10 w-10"
                          alt="time icon"
                        />
                      </div>
                      <div className="relative flex flex-col ml-2">
                        <span className="text-sm text-gray-600">Tanggal</span>
                        <p className="text-sm text-gray-400">
                          {typeof event?.data?.ticket[0]?.date === "string"
                            ? `${format(
                                parse(
                                  event?.data?.ticket[0]?.date,
                                  "yyyy-MM-dd",
                                  new Date()
                                ),
                                "iiii, dd MMMM yyyy",
                                { locale: id }
                              )}`
                            : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                  {
                      url && (
                        <div>
                          {/* Tombol untuk Hide/Show Maps */}
                          <button 
                            onClick={() => setShowMap(!showMap)}  // Toggle state showMap
                            className="px-4 py-2 bg-blue-500 text-white rounded-md mb-2 text-[12px] md:text-[15px]"
                          >
                            {showMap ? "Tutup Map" : "Tampilkan Maps"}  {/* Teks bergantung pada state */}
                          </button>

                          {/* Hanya render iframe jika showMap true */}
                          {showMap && (
                            <div className="flex mt-1 xl:mt-0 bg-black h-[350px] md:h-[400px] md:w-full xl:w-[400px] xl:h-[300px]">
                              <iframe 
                                src={url} 
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                              />
                            </div>
                          )}
                        </div>
                      )
                    }

                  <h2 className="mt-8 border-t text-xl font-bold text-gray-600 lg:text-2xl">
                    Deskripsi Umum
                  </h2>
                  <div className="mt-4 flex items-center border-b pb-4 font-semibold lg:text-lg">
                    <div className="rounded bg-gray-50 p-2 mr-2">
                      <img
                        src="/assets/icon/time.svg"
                        className="h-10 w-10"
                        alt="time icon"
                      />
                    </div>
                    <p>{event.data?.ticket[0]?.duration}</p>
                    <div className="ml-10 rounded bg-gray-50 p-2 ">
                      <img
                        src="/assets/icon/ticket.svg"
                        className="h-10 w-10"
                        alt="ticket icon"
                      />
                    </div>
                    <p className="ml-2 text-gray-600">Tiket Online</p>
                  </div>
                  {event.data?.description.map((item) => (
                    <div key={item.title} className="border-b pb-4">
                      <Collapse>
                        <RenderHtml
                          html={item.description ?? ""}
                          key={item.description}
                          className="mt-4"
                        />
                      </Collapse>
                    </div>
                  ))}
                  <FeedbackRating type={type} slug={params.slug} app={APP} />

                  <FeedbackComment type={type} slug={params.slug} app={APP} />
                </article>
              </TabPanel>

              <TabPanel>
                <div className="mt-4 flex flex-col gap-4">
                  {event.data?.ticket.map((item) => {
                    const dateString =
                      typeof item.date === "string"
                        ? ` - ${format(
                            parse(item.date, "yyyy-MM-dd", new Date()),
                            "iiii, dd MMMM yyyy ",
                            { locale: id }
                          )}`
                        : "";
                    return (
                      <Tiket
                        key={item.id}
                        onSubmit={(body) =>
                          handleAddToCart(body.qty, "event", item.id, body.typeB ?? "redirect")
                        }
                        title={item.title + dateString}
                        price={item.price}
                        dataItem={item}
                        eventData={event?.data}
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

  await useEvent.prefetch(queryClient, params);

  return {
    props: {
      params,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default EventDetail;
