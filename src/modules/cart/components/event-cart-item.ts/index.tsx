import Button from "components/button/button";
import RenderHtml from "components/render-html";
import { format, parse } from "date-fns";
import useDebounce from "hooks/use-debounce";
import { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { cn } from "utils";
import { id } from "date-fns/locale";
import { currencyFormatter } from "utils/helpers/formatter";

type Props = {
  cartId: number;
  idEvent: number;
  image: string;
  title: string;
  description: string;
  author: string;
  event_title: string;
  rate: number;
  price: number;
  date?: string;
  moveToWishlist?: (id: number, type: string, idEvent: number) => void;
  removeFromCart?: (id: number) => void;
  qty?: number;
  type: string;
  onChangeQty?: (type: string, id: number, qty: number) => void;
} & React.HTMLAttributes<HTMLDivElement>;

const EventCartItem: React.FC<Props> = ({
  cartId,
  idEvent,
  image,
  title,
  description,
  event_title,
  author,
  rate,
  price,
  date,
  moveToWishlist,
  removeFromCart,
  qty: initQty,
  type,
  onChangeQty,
  className,
}) => {
  const [qty, setQty] = useState(initQty ?? 1);
  const debounceValue = useDebounce(qty, 500);

  useEffect(() => {
    if (qty !== initQty) {
      onChangeQty?.(type, cartId, debounceValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue]);
  return (
    <div
      key={cartId}
      className={cn(
        "mt-5 lg:mt-2 bg-slate-100 p-2 lg:p-10 rounded-md",
        className
      )}
    >
      <div >
        <img
          className="aspect-video w-full xl:w-[400px] rounded "
          src={image ?? ""}
          alt={title}
        />
      </div>

      <div className="flex-1">
        <div>
          {type === "membership" ? <p className="m-0">{title}</p> : ""}
          <p className="m-0">{event_title}</p>
          <RenderHtml
            html={description}
            className="m-0 text-pv-grey-medium2 line-clamp-3"
          />

          <div>
            <p className="m-0">{author}</p>
          </div>
        </div>
        {type === "membership" ?? (
          <p className="m-0 flex items-center gap-2 text-sm ">
            Rating:
            <ReactStars
              edit={false}
              value={rate}
              color1="#BFBFBF"
              color2="#F68500"
              size={14}
            />
            ({rate})
          </p>
        )}

        {date && (
          <div className="mt-2 flex">
            <img src="/assets/icon/calendar.svg" alt="calendar icon" />
            <p className="ml-2">
              {format(
                parse(date, "yyyy-MM-dd", new Date()),
                "iiii, dd MMMM yyyy",
                { locale: id }
              )}
            </p>
          </div>
        )}
        <p className="mt-2 text-2xl text-pv-blue-light">
          {currencyFormatter.format(price)}
        </p>

        <div className="flex items-center justify-between md:justify-center xl:justify-end h-[120px] mt-5 md:mt-0">
          {moveToWishlist && (
            <Button
              variant="outlined"
              className="text-pv-grey-medium2 text-[10px] w-[120px] md:w-[200px] md:text-[15px] md:h-[60px] md:mr-4 md:text-center items-center"
              onClick={() => moveToWishlist?.(cartId, type, idEvent)}
            >
              Pindahkan ke Wishlist
            </Button>
          )}
          {removeFromCart && (
            <button className="md:ml-4 w-[20px]" onClick={() => removeFromCart?.(cartId)}>
              <img src="/assets/icon/trash.svg" alt="delete button" />
            </button>
          )}

          {type === "event" && typeof initQty !== "undefined" && (
            <div className="md:ml-10 flex items-center rounded-xl border border-pv-grey-dark3 p-[2px]">
              {onChangeQty && (
                <Button
                  style={{ fontSize: "30px" }}
                  className="px-4"
                  disabled={qty === 1}
                  onClick={() => setQty((prev) => prev - 1)}
                >
                  -
                </Button>
              )}
              <p className="px-10">{qty}</p>
              {onChangeQty && (
                <Button
                  style={{ fontSize: "30px" }}
                  className="px-4"
                  onClick={() => setQty((prev) => prev + 1)}
                >
                  +
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCartItem;
