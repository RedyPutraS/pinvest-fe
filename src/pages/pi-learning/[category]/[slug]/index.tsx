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
import { useState } from "react";
import { useCartList } from "modules/cart/api/list-cart";
import useStore from '../../../../../src/app/store';
import Collapse from "components/collapse";
import MetaHead from "components/metahead/metahead";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

interface Instructor {
  image?: string | null | undefined;
  name: string;
  title: string;
  description: string;
}
interface ProfilePopupProps {
  item: Instructor;
  onClose: () => void;
}

const ProfilePopup: React.FC<ProfilePopupProps> = ({ item }) => {
  const maxSentences = 1; // Set the maximum number of sentences to display

  // Function to truncate the description to a certain number of sentences
  const truncateDescription = (description: string, maxSentences: number) => {
    // Split the description into an array of sentences using regex
    const sentences = description.split(/(?<=[.!?])\s+/); // Memisahkan berdasarkan titik, tanda tanya, atau tanda seru diikuti spasi

    // Take only the first 'maxSentences' sentences and join them back together
    const truncatedDescription = sentences.slice(0, maxSentences).join(" ");

    return truncatedDescription;
  };

  // Truncate the description to a certain number of sentences
  const truncatedDescription = truncateDescription(item.description ?? "", maxSentences);

  return (
    <div
      className="popup flex flex-col md:flex-row p-4 rounded-lg shadow-lg bg-white"
      style={{
        marginTop: "40px",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 999,
      }}
    >
      <img
        className="h-40 w-40 rounded mb-4 md:mb-0 md:mr-4"
        src={item.image ?? ""}
        alt="thumbnail"
      />
      <div>
        <p className="text-lg font-bold text-left">{item.name}</p>
        <p className="text-left text-sm text-gray-600">{item.title}</p>
        <RenderHtml html={truncatedDescription} key={truncatedDescription} className="mt-4 text-sm" />
      </div>
    </div>
  );
};

const Detail: NextPage<Props> = ({ params }) => {
  const [showMap, setShowMap] = useState(false);
  const [showProfile, setShowProfile] = useState<Instructor | null>(null);
  const router = useRouter();
  const { data } = useEventDetail({
    slug: params.slug ?? "",
  });
  const addToCart = useAddToCart();
  const APP = "pilearning";
  const { refetch: reCart } = useCartList();
  const { incrementC } = useStore();
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
            (err.response?.data as any)?.message ?? "Gagal menambahkan ke keranjang",
        });
      });
  };
  

  return (
    <>
      <MetaHead title={data?.title || "KeLas PiLearning"} url={`https://pinvest.co.id/${router.asPath}`} image={data?.cover_image || "/assets/img/pinvest-logo.png"} description={data?.title || "Tekan Link Untuk Detail Kelas..."} />
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
                {data?.instructor && (
                  <>
                    <h2 className="mb-1 text-2xl font-bold">Mentor</h2>
                    <div key={data?.instructor?.title} className="border-b pb-4 mt-2">
                      <img
                        className="w-20 rounded hover:shadow-lg hover:shadow-black"
                        src={data?.instructor?.image ?? ""}
                        alt="thumbnail"
                        onMouseEnter={() => setShowProfile(data?.instructor ?? null)}
                        onMouseLeave={() => setShowProfile(null)}
                      />
                      <p className="text-lg font-bold hover:underline">
                        {data?.instructor?.name}
                      </p>
                      <p className="mt-2">{data?.instructor?.title}</p>
                      <Collapse>
                        <RenderHtml html={data?.instructor?.description} />
                      </Collapse>
                    </div>
                  </>
                )}
                {showProfile && (
                    <ProfilePopup
                      item={showProfile}
                      onClose={() => setShowProfile(null)}
                    />
                  )}
                <h2 className="mt-8 text-xl font-semibold text-gray-600 lg:text-2xl">
                  Jadwal
                </h2>
                <div className="xl:hidden">
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
                      <div className="text-gray-600">
                        {data?.type == "offline" ? data?.address : data?.type}
                      </div>
                      {/* <Link
                        target="_blank"
                        className="whitespace-nowrap text-sm text-blue-700"
                        href={
                          data?.type == "offline"
                            ? `http://maps.google.com/?q=${data?.google_location}`
                            : ""
                        }
                      >
                        {data?.type == "offline" ? "Lihat Maps" : ""}
                      </Link> */}
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

                      {/* <Link
                        target="_blank"
                        className=" ml-2 whitespace-nowrap text-sm text-blue-700"
                        href={
                          data?.type == "offline"
                            ? `http://maps.google.com/?q=${data?.google_location}`
                            : ""
                        }
                      >
                        {data?.type == "offline" ? "Lihat Maps" : ""}
                      </Link> */}
                    </div>
                  </div>
                </div>
                {
                  data?.google_location && (
                    <div>
                    {/* Tombol untuk Hide/Show Maps */}
                      <button 
                        onClick={() => setShowMap(!showMap)}  // Toggle state showMap
                        className="mt-2 xl:mt-0 px-4 py-2 bg-blue-500 text-white rounded-md mb-2 text-[12px] md:text-[15px]"
                      >
                        {showMap ? "Tutup Map" : "Tampilkan Maps"}  {/* Teks bergantung pada state */}
                      </button>

                      {/* Hanya render iframe jika showMap true */}
                      {showMap && (
                        <div className="flex mt-1 xl:mt-0 bg-black h-[350px] md:h-[400px] md:w-full xl:w-[400px] xl:h-[300px]">
                          <iframe 
                            src={data?.google_location} 
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
                          handleAddToCart(body.qty, event, item?.id ?? 0 , body.typeB ?? "redirect")
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
