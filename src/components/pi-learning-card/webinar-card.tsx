import { Card, CardImage, CardBody } from "components/card";
import { currencyFormatter } from "utils/helpers/formatter";
import ShareButton from "components/icon/share-button";
import StarFilled from "components/icon/star-filled";
import StarEmpty from "components/icon/star-empty";
import { format, parse as dateParse } from "date-fns";
import { id } from "date-fns/locale";
import Link from "next/link";
import RenderHtml from "components/render-html";
import cn from "utils/cn";
import { useAddToWishlist } from "modules/wishlist/api/add-to-wishlist";
import { toast } from "hooks/use-toast";
import { useDisclosure } from "hooks/use-disclosure";
import type { AxiosError } from "axios";
import { useRemoveFromWishlistItem } from "modules/wishlist/api/remove-wishlist-item";
import useStore from "app/store";
import { useAuthStore } from "hooks/use-auth-store";
type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  event: any;
  category: string;
  className?: string;
  wishlistId?: number;
  onRemove?: () => void;
  overrideLink?: string;
};
export function WebinarCard({
  event,
  category,
  className,
  wishlistId,
  onRemove,
  overrideLink,
}: Props) {
  const auth = useAuthStore();
  const wishlist = useAddToWishlist();
  const wishlistRemove = useRemoveFromWishlistItem({ id: wishlistId ?? 0 });
  const toggle = useDisclosure({ isOpen: !event.added_to_wishlist });
  const { incrementW, decrementW } = useStore();

  const handleRemoveFromWishlist = () => {
    wishlistRemove
      .mutateAsync({
        type: category === "onlinecourse" ? "online-course" : "event",
        content_id: event?.id ?? -1,
      })
      .then(() => {
        if (onRemove) {
          onRemove();
        }
        decrementW();
        toggle.setIsOpen(toggle.isOpen);
        event.added_to_wishlist = false;
        toast({
          title: "Berhasil mengeluarkan item dari wishlist.",
        });
      })
      .catch((e: AxiosError<{ message: string }>) => {
        let message = "Mohon hapus item melalui halaman wishlist";
        try {
          if (
            e.response?.data.message ===
            "The item has been added to the wishlist."
          ) {
            message = "Gagal mengeluarkan item dari wishlist";
          }
        } catch (error) {}
        toast({ title: message });
      });
  };
  const handleAddToWishlist = () => {
    wishlist
      .mutateAsync({
        content_id: event?.id ?? -1,
        type: category === "onlinecourse" ? "online-course" : "event",
        qty: 1,
      })
      .then(() => {
        toggle.setIsOpen(!toggle.isOpen);
        event.added_to_wishlist = true;
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
  return (
    <div className="mb-1 cursor-pointer pt-4">
      <Card
        className={cn(
          "mb-1 mt-4 h-full shadow-md ring-gray-200 hover:ring-2 xl:mx-2",
          className
        )}
      >
        <CardImage className="relative aspect-auto">
          <Link href={overrideLink || `/pi-learning/${category}/${event.id}`}>
            <img
              src={event.thumbnail_image}
              alt={event.title}
              className="w-full cursor-pointer rounded-t-lg object-cover h-full"
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
            <Link href={overrideLink || `/pi-learning/${category}/${event.id}`}>
              <div className="text-md h-5 font-semibold text-gray-600 line-clamp-1 xl:min-h-[70px] xl:text-2xl xl:line-clamp-2">
                {event.title}
              </div>
            </Link>
            <ShareButton
              path={overrideLink || `/pi-learning/${category}/${event.id}`}
              className="w-6 xl:w-10"
            />
          </div>
          <p className="mt-1 h-20 text-[10px] text-pv-grey-medium2 line-clamp-3 xl:h-[90px] xl:text-sm">
            <RenderHtml
              className="line-clamp-3"
              html={event.description ?? ""}
            />
          </p>
          <Link href={overrideLink || `/pi-learning/${category}/${event.id}`}>
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
            <div className="mb-4 flex items-center space-x-4"></div>
            {category === "onlinecourse" ? (
              <div className="text-xs xl:text-sm">{event.duration}</div>
            ) : event?.ticket?.date ? (
              <div className="mb-3 flex flex-col justify-between text-[14px] font-medium xl:flex-row">
                <div className="flex flex-1 items-center space-x-1 xl:flex-auto">
                  <img src="/assets/icon/calendar.svg" alt="" />
                  <div className="text-[10px] xl:text-sm">
                    {event.ticket &&
                      format(
                        dateParse(
                          event.ticket.date[0] || "0",
                          "yyyy-MM-dd",
                          new Date()
                        ),
                        "iiii, dd MMMM yyyy",
                        { locale: id }
                      )}
                  </div>
                </div>
                <div className="flex flex-1 items-center space-x-1 text-[10px] xl:flex-auto xl:text-sm">
                  <img src="/assets/icon/alarm.svg" alt="" />
                  <div>{event.ticket?.duration}</div>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="flex items-center justify-between text-[10px] md:text-lg">
              <div>
                {event.price == 0 ? (
                  <div className="text-pv-blue-lighter">Gratis</div>
                ) : (
                  currencyFormatter.format(event.price)
                )}
              </div>
              <Link
                href={overrideLink || `/pi-learning/${category}/${event.id}`}
              >
                <button className="rounded-lg bg-pv-blue-dark px-3 py-1 text-sm font-semibold text-pv-white-pure hover:opacity-60 md:block xl:px-6 xl:py-2">
                  <span className="font-normal">Beli</span>
                </button>
              </Link>
            </div>
          </Link>
        </CardBody>
      </Card>
    </div>
  );

  function wishlistAction() {
    if (toggle.isOpen) {
      handleAddToWishlist();
    } else if (!toggle.isOpen) {
      handleRemoveFromWishlist();
    }
  }
}
