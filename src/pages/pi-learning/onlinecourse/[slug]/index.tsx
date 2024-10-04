import { QueryClient, dehydrate } from "@tanstack/react-query";
import useStore from "app/store";
import type { AxiosError } from "axios";
import Button from "components/button/button";
import Collapse from "components/collapse";
import ShareArticleFull from "components/icon/share-article-full";
import PageBody from "components/page/page-body";
import PopupBanner from "components/popup-banner";
import PopupLogin from "components/popup-login/popup-login";
import RenderHtml from "components/render-html";
import { useAuthStore } from "hooks/use-auth-store";
import { useDisclosure } from "hooks/use-disclosure";
import { useToast } from "hooks/use-toast";
import { useAccount } from "modules/auth/api/account";
import { useAddToCart } from "modules/cart/api/add-to-cart";
import { useCartList } from "modules/cart/api/list-cart";
import { useDetailOnlineCourse } from "modules/online-course/api/detail-online-course";
import { useAddToWishlist } from "modules/wishlist/api/add-to-wishlist";
import { useRemoveFromWishlistItem } from "modules/wishlist/api/remove-wishlist-item";
import { type InferGetServerSidePropsType, type NextPageContext } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { currencyFormatter } from "utils/helpers/formatter";

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
  const maxSentences = 2; // Set the maximum number of sentences to display

  // Function to truncate the description to a certain number of sentences
  const truncateDescription = (description: string, maxSentences: number) => {
    // Split the description into an array of sentences
    const sentences = description.split(". ");

    // Take only the first 'maxSentences' sentences and join them back together
    const truncatedDescription = sentences.slice(0, maxSentences).join(". ");

    return truncatedDescription;
  };

  // Truncate the description to a certain number of sentences
  const truncatedDescription = truncateDescription(
    item.description ?? "",
    maxSentences
  );

  return (
    <div
      className="popup"
      style={{
        marginTop: "40px",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        zIndex: 999, // Adjust z-index as needed
        display: "flex",
      }}
    >
      <img
        className="h-40 w-40 rounded" // Adding fixed width and height
        src={item.image ?? ""}
        alt="thumbnail"
        style={{ marginRight: "10px" }} // Added margin-right for spacing
      />
      <div>
        <p className="text-lg font-bold" style={{ textAlign: "left" }}>
          {item.name}
        </p>
        <p style={{ textAlign: "left" }}>{item.title}</p>
        <RenderHtml
          html={truncatedDescription ?? ""}
          key={truncatedDescription}
          className="mt-4"
        />{" "}
        {/* Display truncated description */}
      </div>
    </div>
  );
};

const OnlineCoursePage = ({ params }: Props) => {
  const { refetch: cartRefetch } = useCartList();
  const auth = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState<Instructor | null>(null);
  const account = useAccount();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cart = useAddToCart();
  const wishlist = useAddToWishlist();
  const { data } = useDetailOnlineCourse(params);
  const wishlistRemove = useRemoveFromWishlistItem({ id: data?.id ?? 0 });
  const toggle = useDisclosure({ isOpen: !data?.added_to_wishlist });
  const router = useRouter();
  const APP = "pilearning";
  const { toast } = useToast();
  const { incrementW, decrementW } = useStore();

  useEffect(() => {
    if (auth.user) {
      account.refetch();
      return setIsLoggedIn(true);
    } else {
      auth.setToken("");
    }
    return setIsLoggedIn(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user]);

  const handleRemoveFromWishlist = () => {
    if (!data) return;
    wishlistRemove
      .mutateAsync({
        type: "online-course",
        content_id: data?.id ?? -1,
      })
      .then(() => {
        decrementW();
        toggle.setIsOpen(toggle.isOpen);
        data.added_to_wishlist = false;
        toast({
          title: "Berhasil mengeluarkan item dari wishlist.",
        });
      })
      .catch((e: AxiosError<{ message: string }>) => {
        let message = "Mohon hapus item melalui halaman wishlist";
        try {
          if (
            e.response?.data.message ===
            "Barang sudah ditambahkan ke daftar keinginan."
          ) {
            message = "Gagal mengeluarkan item dari wishlist";
          }
        } catch (error) {}
        toast({ title: message });
      });
  };
  const handleAddToWishlist = () => {
    if (!data) return;
    wishlist
      .mutateAsync({
        content_id: data.id ?? -1,
        type: "online-course",
        qty: 1,
      })
      .then(() => {
        toggle.setIsOpen(!toggle.isOpen);
        data.added_to_wishlist = true;
        incrementW();
        toast({ title: "Berhasil menambahkan ke wishlist" });
      })
      .catch((e: AxiosError<{ message: string }>) => {
        let message = "Gagal menambahkan ke wishlist";
        try {
          if (
            e.response?.data.message ===
            "The item has been added to the wishlist."
          ) {
            message = "Item sudah ada di wishlist";
          }
        } catch (error) {}
        toast({ title: message });
      });
  };

  function wishlistAction() {
    if (toggle.isOpen) {
      handleAddToWishlist();
    } else if (!toggle.isOpen) {
      handleRemoveFromWishlist();
    }
  }

  return (
    <>
      {isOpen && <PopupLogin onClose={() => setIsOpen(false)} />}
      <Head>
        <title>{data?.meta_title ?? ""}</title>
      </Head>
      <PopupBanner app={APP} />
      <div>
        <section className="relative mx-auto block h-[200px] md:h-[300px] lg:h-[500px] w-[98%]">
          <Image
            className="absolute bottom-0 left-0 right-0 top-0 w-full"
            fill
            src={data?.thumbnail_image ?? ""}
            alt={`Thumbnail ${data?.title}`}
            style={{ objectFit: "contain" }}
          />
        </section>

        <PageBody className="relative z-10">
          <div className="grid items-center lg:items-start gap-4 md:grid-cols-12">
            <div className="rounded p-2 shadow md:col-span-4 xl:hidden md:-mt-[224%]">
              <img
                className="rounded"
                src={data?.thumbnail_image ?? data?.thumbnail_video ?? ""}
                alt="thumbnail"
              />
              <p className="mt-4 text-3xl">
                {(data?.price ?? 0) == 0 ? (
                  <div className="text-pv-blue-lighter">Gratis</div>
                ) : (
                  currencyFormatter.format(data?.price ?? 0)
                )}
              </p>

              {(data?.price ?? 0) == 0 ? (
                <>
                  {tontonSekarang()}
                  <div className="mt-5 p-1">
                    <p className="mb-2 font-bold">Kursus Ini Termasuk :</p>
                    <div>
                      <span className="inline-flex">
                        <img
                          src="/assets/icon/Airplay.png"
                          width={25}
                          alt="Airplay Icon"
                        />
                        <p className="ml-2">
                          {data?.duration} Video Sesuai Permintaan
                        </p>
                      </span>
                    </div>
                    <div>
                      <span className="inline-flex">
                        <img
                          src="/assets/icon/File.png"
                          width={25}
                          alt="File Icon"
                        />
                        <p className="ml-2">{data?.article_count} Artikel</p>
                      </span>
                    </div>
                    <div>
                      <span className="inline-flex">
                        <img
                          src="/assets/icon/FileArrowDown.png"
                          width={25}
                          alt="File Download Icon"
                        />
                        <p className="ml-2">
                          {data?.file_count} Dapat Diunduh
                        </p>
                      </span>
                    </div>
                    <div>
                      <span className="inline-flex">
                        <img
                          src="/assets/icon/CloudCheck.png"                          width={25}
                          alt="File Cloud Icon"
                        />
                        <p className="ml-2">Akses Selamanya</p>
                      </span>
                    </div>
                    <div>
                      <span className="inline-flex">
                        <img
                          src="/assets/icon/Trophy.png"
                          width={25}
                          alt="Trophy Icon"
                        />
                        <p className="ml-2">Sertifikat Kompetensi</p>
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {data?.purchased == false && (
                    <div className="mt-5 flex gap-2">
                      <Button
                        className="w-full md:w-[330px] p-2 md:text-[13px] md:px-5"
                        variant="outlined"
                        onClick={() => {
                          cart
                            .mutateAsync({
                              content_id: data?.id ?? -1,
                              type: "online-course",
                              qty: 1,
                            })
                            .then(async function () {
                              await cartRefetch();
                              return toast({
                                title: "Berhasil menambahkan ke keranjang",
                              });
                            })
                            .catch((e) => {
                              const message = e.response.data.message;
                              toast({
                                title:
                                  "Gagal menambahkan ke keranjang. message: (" +
                                  message +
                                  ")",
                              });
                            });
                        }}
                      >
                        Tambah ke Keranjang
                      </Button>

                      <Button
                        variant="outlined"
                        color="blue"
                        onClick={
                          auth.user ? wishlistAction : () => setIsOpen(true)
                        }
                      >
                        <img
                          src={
                            data?.added_to_wishlist || !toggle.isOpen
                              ? `/assets/icon/heart.png`
                              : `/assets/icon/heart-red.svg`
                          }
                          className="w-10 md:w-[100px]"
                          alt="wishlist icon"
                        />
                      </Button>
                    </div>
                  )}

                  {data?.purchased ? (
                    tontonSekarang()
                  ) : data?.purchased ? (
                    tontonSekarang()
                  ) : (
                    <Button
                      className="mt-2 w-full p-2"
                      onClick={
                        auth.user
                          ? () => {
                              cart
                                .mutateAsync({
                                  content_id: data?.id ?? -1,
                                  type: "online-course",
                                  qty: 1,
                                })
                                .then(() => router.push("/cart"))
                                .catch((e) => {
                                  const message = e.response.data.message;
                                  toast({
                                    title:
                                      "Gagal menambahkan ke keranjang. message: (" +
                                      message +
                                      ")",
                                  });
                                });
                            }
                          : () => setIsOpen(true)
                      }
                    >
                      Beli Sekarang
                    </Button>
                  )}

                  <div className="mt-5 p-1">
                    <p className="mb-2 font-bold">Kursus Ini Termasuk :</p>
                    <div>
                      <span className="inline-flex">
                        <img
                          src="/assets/icon/Airplay.png"
                          width={25}
                          alt="Airplay Icon"
                        />
                        <p className="ml-2">
                          {data?.duration} Video Sesuai Permintaan
                        </p>
                      </span>
                    </div>
                    <div>
                      <span className="inline-flex">
                        <img
                          src="/assets/icon/File.png"
                          width={25}
                          alt="File Icon"
                        />
                        <p className="ml-2">{data?.article_count} Artikel</p>
                      </span>
                    </div>
                    <div>
                      <span className="inline-flex">
                        <img
                          src="/assets/icon/FileArrowDown.png"
                          width={25}
                          alt="File Download Icon"
                        />
                        <p className="ml-2">
                          {data?.file_count} Dapat Diunduh
                        </p>
                      </span>
                    </div>
                    <div>
                      <span className="inline-flex">
                        <img
                          src="/assets/icon/CloudCheck.png"
                          width={25}
                          alt="File Cloud Icon"
                        />
                        <p className="ml-2">Akses Selamanya</p>
                      </span>
                    </div>
                    <div>
                      <span className="inline-flex">
                        <img
                          src="/assets/icon/Trophy.png"
                          width={25}
                          alt="Trophy Icon"
                        />
                        <p className="ml-2">Sertifikat Kompetensi</p>
                      </span>
                    </div>
                  </div>
                </>
              )}

              <div className="my-1 flex justify-center">
                <ShareArticleFull />
              </div>
            </div>
            <div className="md:col-span-8">
              <div className="my-0">
                <article className="mb-4 rounded p-6 shadow">
                  <div>
                    <h1 className="text-2xl md:text-4xl">{data?.title}</h1>
                  </div>
                  <h2 className="mb-8 text-2xl font-bold">Mentor</h2>
                  {data?.instructor.map((item) => (
                    <div key={item.title} className="border-b pb-4">
                      <img
                        className="w-20 rounded hover:shadow-lg hover:shadow-black"
                        src={item.image ?? ""}
                        alt="thumbnail"
                        onMouseEnter={() => setShowProfile(item)}
                        onMouseLeave={() => setShowProfile(null)}
                      />
                      <p className="text-lg font-bold hover:underline">
                        {item.name}
                      </p>
                      <p className="mt-2">{item.title}</p>
                      <Collapse>
                        <RenderHtml html={item.description} />
                      </Collapse>
                    </div>
                  ))}
                  {showProfile && (
                    <ProfilePopup
                      item={showProfile}
                      onClose={() => setShowProfile(null)}
                    />
                  )}
                </article>
                <div className="rounded p-6 shadow">
                  <h2 className="text-2xl font-bold">
                    Apa yang akan kamu dapatkan
                  </h2>

                  <ul className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                    {data?.benefit.map((item) => (
                      <li key={item} className="flex gap-2">
                        <img
                          className="inline-block aspect-square h-6"
                          src="/assets/icon/check.svg"
                          alt="Benefit item"
                        />
                        <p>{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* <h2 className="mt-8 text-2xl font-bold">Persyaratan</h2> */}
                <div className="mt-4 border-b pb-4">
                  <RenderHtml html={data?.requirement} />
                </div>

                <h2 className="mt-8 text-2xl font-bold">Deskripsi Umum</h2>
                <div className="mt-4 flex items-center border-b pb-4 text-lg font-semibold">
                  <div className="rounded bg-gray-50 p-2">
                    <img
                      src="/assets/icon/time.svg"
                      className="h-10 w-10"
                      alt="time icon"
                    />
                  </div>
                  <p className="ml-2">{data?.duration}</p>
                  <div className="ml-10 rounded bg-gray-50 p-2 ">
                    <img
                      src="/assets/icon/ticket.svg"
                      className="h-10 w-10"
                      alt="ticket icon"
                    />
                  </div>
                  <p className="ml-2">Kursus Online</p>
                </div>
              </div>
            </div>

            {/* mt-[380px] -> banner's height (h-96) */}
            <div className="bottom-20 top-20 hidden rounded bg-gray-100 p-2 shadow md:col-span-4 xl:block">
              <img
                className="rounded"
                src={data?.thumbnail_image ?? data?.thumbnail_video ?? ""}
                alt="thumbnail"
              />
              <p className="mt-4 text-3xl">
                {(data?.price ?? 0) == 0 ? (
                  <div className="text-pv-blue-lighter">Gratis</div>
                ) : (
                  currencyFormatter.format(data?.price ?? 0)
                )}
              </p>

              {(data?.price ?? 0) == 0 ? (
                <>
                  {isLoggedIn ? (
                    <div className="flex gap-4">{tontonSekarang()}</div>
                  ) : (
                    <Button
                      className="mt-5 w-full p-4"
                      onClick={() => {
                        setIsOpen(true);
                      }}
                    >
                      Tonton Sekarang
                    </Button>
                  )}
                  <div className="mt-5 p-1">
                    <p className="mb-2 font-bold">Kursus Ini Termasuk :</p>
                    <div>
                      <span className="inline-flex">
                        <img
                          src="/assets/icon/Airplay.png"
                          width={25}
                          alt="Airplay Icon"
                        />
                        <p className="ml-2">
                          {data?.duration} Video Sesuai Permintaan
                        </p>
                      </span>
                    </div>
                    <div>
                      <span className="inline-flex">
                        <img
                          src="/assets/icon/File.png"
                          width={25}
                          alt="File Icon"
                        />
                        <p className="ml-2">{data?.article_count} Artikel</p>
                      </span>
                    </div>
                    <div>
                      <span className="inline-flex">
                        <img
                          src="/assets/icon/FileArrowDown.png"
                          width={25}
                          alt="File Download Icon"
                        />
                        <p className="ml-2">
                          {data?.file_count} Dapat Diunduh
                        </p>
                      </span>
                    </div>
                    <div>
                      <span className="inline-flex">
                        <img
                          src="/assets/icon/CloudCheck.png"
                          width={25}
                          alt="File Cloud Icon"
                        />
                        <p className="ml-2">Akses Selamanya</p>
                      </span>
                    </div>
                    <div>
                      <span className="inline-flex">
                        <img
                          src="/assets/icon/Trophy.png"
                          width={25}
                          alt="Trophy Icon"
                        />
                        <p className="ml-2">Sertifikat Kompetensi</p>
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {data?.purchased == false && (
                    <div className="mt-5 flex gap-2">
                      <Button
                        className="w-full p-2"
                        variant="outlined"
                        onClick={
                          auth.user
                            ? () => {
                                cart
                                  .mutateAsync({
                                    content_id: data?.id ?? -1,
                                    type: "online-course",
                                    qty: 1,
                                  })
                                  .then(async function () {
                                    await cartRefetch();
                                    return toast({
                                      title:
                                        "Berhasil menambahkan ke keranjang",
                                    });
                                  })
                                  .catch(() => {
                                    toast({
                                      title: "Gagal menambahkan ke keranjang",
                                    });
                                  });
                              }
                            : () => setIsOpen(true)
                        }
                      >
                        Tambah ke Keranjang
                      </Button>

                      <Button
                        variant="outlined"
                        color="blue"
                        onClick={
                          auth.user ? wishlistAction : () => setIsOpen(true)
                        }
                      >
                        <img
                          src={
                            data?.added_to_wishlist || !toggle.isOpen
                              ? `/assets/icon/heart.png`
                              : `/assets/icon/heart-red.svg`
                          }
                          className="w-10"
                          alt="wishlist icon"
                        />
                      </Button>
                    </div>
                  )}

                  {data?.purchased ? (
                    tontonSekarang()
                  ) : (
                    <Button
                      className="mt-2 w-full p-2"
                      onClick={
                        auth.user
                          ? () => {
                              cart
                                .mutateAsync({
                                  content_id: data?.id ?? -1,
                                  type: "online-course",
                                  qty: 1,
                                })
                                .then(() => router.push("/cart"))
                                .catch(() => {
                                  toast({
                                    title: "Gagal menambahkan ke keranjang",
                                  });
                                });
                            }
                          : () => setIsOpen(true)
                      }
                    >
                      Beli Sekarang
                    </Button>
                  )}

                  <div className="mt-5 p-1">
                    <p className="mb-2 font-bold">Kursus Ini Termasuk :</p>
                    <div>
                      <span className="inline-flex">
                        <img
                          src="/assets/icon/Airplay.png"
                          width={25}
                          alt="Airplay Icon"
                        />
                        <p className="ml-2">
                          {data?.duration} Video Sesuai Permintaan
                        </p>
                      </span>
                    </div>
                    <div>
                      <span className="inline-flex">
                        <img
                          src="/assets/icon/File.png"
                          width={25}
                          alt="File Icon"
                        />
                        <p className="ml-2">{data?.article_count} Artikel</p>
                      </span>
                    </div>
                    <div>
                      <span className="inline-flex">
                        <img
                          src="/assets/icon/FileArrowDown.png"
                          width={25}
                          alt="File Download Icon"
                        />
                        <p className="ml-2">
                          {data?.file_count} Dapat Diunduh
                        </p>
                      </span>
                    </div>
                    <div>
                      <span className="inline-flex">
                        <img
                          src="/assets/icon/CloudCheck.png"
                          width={25}
                          alt="File Cloud Icon"
                        />
                        <p className="ml-2">Akses Selamanya</p>
                      </span>
                    </div>
                    <div>
                      <span className="inline-flex">
                        <img
                          src="/assets/icon/Trophy.png"
                          width={25}
                          alt="Trophy Icon"
                        />
                        <p className="ml-2">Sertifikat Kompetensi</p>
                      </span>
                    </div>
                  </div>
                </>
              )}
              <div className="my-1 flex justify-center">
                <ShareArticleFull />
              </div>
            </div>
          </div>
        </PageBody>
      </div>
    </>
  );

  function tontonSekarang() {
    return (
      <div className="flex flex-row">
        <Button
          className="mt-5 w-full p-4"
          onClick={() => {
            router.push(`/pi-learning/onlinecourse/watch/${data?.id}`);
          }}
        >
          Tonton Sekarang
        </Button>
        <a href="#" className="mt-5 outline-1 border border-blue-800 rounded-lg w-[40px] flex items-center justify-center ml-2 md:w-[80px]"
          style={{ color: 'blue' }}
          onClick={auth.user ? wishlistAction : () => setIsOpen(true)}>
          <img
            src={data?.added_to_wishlist || !toggle.isOpen ? '/assets/icon/heart.png' : '/assets/icon/heart-red.svg'}
            className="object-cover"
            alt="wishlist icon"
          />
        </a>
      </div>
    );
  }
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
