import { Card, CardImage, CardBody } from "components/card";
import type { Event } from "modules/home/api/pi-events";
import { currencyFormatter } from "utils/helpers/formatter";
import ShareButton from "components/icon/share-button";
import RenderHtml from "components/render-html";
import Link from "next/link";
import { format, parse } from "date-fns";
import { id } from "date-fns/locale";
import { useRouter } from "next/router";
import { useAddToWishlist } from "modules/wishlist/api/add-to-wishlist";
import { useDisclosure } from "hooks/use-disclosure";
import type { AxiosError } from "axios";
import { toast } from "hooks/use-toast";
import StarEmpty from "components/icon/star-empty";
import StarFilled from "components/icon/star-filled";
import useStore from "app/store";
import { useAuthStore } from "hooks/use-auth-store";
import { useEffect } from "react";
type Props = {
  event: Event;
};
export function PiEventCard({ event }: Props) {
  const auth = useAuthStore();
  const router = useRouter();
  const wishlist = useAddToWishlist();
  const toggle = useDisclosure({ isOpen: !event.added_to_wishlist });
  const { incrementW } = useStore();
  const earliestDate = event.ticket.date[0]; // Mengambil tanggal paling awal
  const latestDate = event.ticket.date[event.ticket.date.length - 1]; // Mengambil tanggal paling akhir

  return (
    <Card className="mx-2 mb-1 mt-4  shadow-md ring-gray-200 hover:ring-2">
      <CardImage className="relative">
        <Link href={`/pi-event/${event.id.toString()}`}>
          <img
            src={event.thumbnail_image}
            alt={event.title}
            className="w-full object-cover xl:h-[232px]"
          />
        </Link>
        <img
          className=" absolute right-0 top-0 m-2 w-6 cursor-pointer opacity-75 hover:opacity-100 xl:m-4 xl:w-10"
          src={
            event.added_to_wishlist || !toggle.isOpen
              ? `/assets/icon/heart.png`
              : `/assets/icon/heart-red.svg`
          }
          onClick={() => {
            auth.user
              ? wishlistAction()
              : toast({
                  title: "Mohon Untuk Login Atau Buat Akun Terlebih Dahulu",
                });
          }}
          alt="favorite"
        />
      </CardImage>
      <CardBody className="p-2 xl:p-4">
        <div className="flex items-start justify-between">
          <Link href={`/pi-event/${event.id.toString()}`}>
            <div className="text-md min-h-[50px] font-normal text-gray-600 line-clamp-2 xl:h-[80px] xl:text-[24px]">
              {event.title}
            </div>
          </Link>
          <ShareButton path={`/pi-event/${event.id}`} className="w-6 xl:w-10" />
        </div>
        <div className="mt-1 text-[10px] font-normal text-pv-blue-light xl:mb-1 xl:text-[14px]">
          {format(
            parse(earliestDate || "0", "yyyy-MM-dd", new Date()),
            "dd MMMM yyyy",
            { locale: id }
          )}

          {/* Kondisi jika ada lebih dari 1 tanggal, tampilkan latestDate */}
          {event.ticket.date.length > 1 && (
            <>
              {" "}
              <sup>s</sup>/<sub>d</sub>{" "}
              {format(
                parse(latestDate || "0", "yyyy-MM-dd", new Date()),
                "dd MMMM yyyy",
                { locale: id }
              )}
            </>
          )}
        </div>
        <Link href={`/pi-event/${event.id.toString()}`}>
          <div className="hidden xl:block xl:h-[100px]">
            <div className="text-sm text-pv-grey-medium2 line-clamp-3">
              <RenderHtml html={event.description ?? ""} />
            </div>
          </div>
          <Link href={`/pi-event/${event.id.toString()}`}>
            <div className="mb-2 flex items-center">
              <p className="mr-2 text-xs font-medium text-gray-600 xl:text-base">
                Rating
              </p>

              {[...Array(5)].map((_, i) => {
                return event.rate < i + 1 ? (
                  <StarEmpty key={i} />
                ) : (
                  <StarFilled key={i} />
                );
              })}
              <p className="ml-2 text-xs font-medium xl:text-base">
                ({event.rate})
              </p>
            </div>
          </Link>
          {/* uppercase online-zoom*/}
          <div className="mt-1 text-[10px] font-semibold uppercase text-pv-blue-light xl:py-2 xl:text-[14px]">
            {event.type === "online-zoom" ? "online" : event.type}
          </div>
          <div className="hidden text-lg font-normal xl:block xl:text-[20px]">
            {event.price == 0 ? (
              <div className="text-pv-blue-lighter">Gratis</div>
            ) : (
              currencyFormatter.format(event.price)
            )}
          </div>
        </Link>
        <div className="flex items-center justify-between py-2 pr-2 xl:justify-end">
          <div className="text-xs font-bold xl:hidden">
            {event.price == 0 ? (
              <div className="text-pv-blue-lighter">Gratis</div>
            ) : (
              currencyFormatter.format(event.price)
            )}
          </div>
          <button
            onClick={() => router.push(`/pi-event/${event.id.toString()}`)}
            className="rounded-lg bg-pv-blue-dark px-3 py-1 text-sm font-semibold text-pv-white-pure hover:opacity-60 md:block xl:px-6 xl:py-2"
          >
            <span className="font-normal">Beli</span>
          </button>
        </div>
      </CardBody>
    </Card>
  );

  function wishlistAction() {
    wishlist
      .mutateAsync({
        content_id: event?.id ?? -1,
        type: event.type === "onlinecourse" ? "online-course" : "event",

        qty: 1,
      })
      .then(() => {
        incrementW();
        toggle.setIsOpen(!toggle.isOpen);
        event.added_to_wishlist = true;
        toast({ title: "Berhasil menambahkan ke wishlist" });
      })
      .catch((e: AxiosError<{ message: string }>) => {
        let message = "Gagal menambahkan ke wishlist";
        try {
          if (
            e.response?.data.message ===
            "Barang sudah ditambahkan ke daftar keinginan."
          ) {
            message = "Item sudah ada di wishlist";
          }
        } catch (error) {}
        toast({ title: message });
      });
  }
}
