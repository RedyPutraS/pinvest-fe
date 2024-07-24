import { format, parse } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { currencyFormatter } from "utils/helpers/formatter";
import Button from "components/button/button";
import { useRouter } from "next/router";
import { downloadTicket } from "modules/transaction/download-ticket";

type Props = {
  items: any;
};

const MyActivityCard = ({ items }: Props) => {
  const router = useRouter();

  return (
    <div className="bg-pv-white-light p-6 xl:mb-8" style={{ marginBottom: '15px' }}>
      <div>
        <div className="mb-2 mt-4 flex flex-col xl:flex-row">
          <div className="grid grid-cols-3 items-center gap-2 xl:flex xl:flex-grow">
            <div className="xl:mr-4">
              <img
                src={items.product.image ?? ""}
                alt=""
                className="h-20 rounded-lg object-cover md:object-fill xl:h-36 xl:w-[200px]"
              />
            </div>
            <div className="col-span-2 flex flex-col xl:mr-4">
              <div className="font-semibold line-clamp-1 xl:text-3xl">
                {items?.product.event_title ?? ""}
              </div>
              <div className="md:font-semibold xl:text-xl">
                {items?.product.title ?? ""}
              </div>
              {items.product.date !== null ? (
                <div className="mb-3 mt-2 flex items-center text-[14px] font-medium text-pv-grey-medium3">
                  <div className="mr-4 flex">
                    <img
                      src="/assets/icon/calendar.svg"
                      alt=""
                      className="mr-2"
                    />
                    <div className="text-[10px] xl:text-base">
                      {items.product.date &&
                        format(
                          parse(items.product.date, "yyyy-MM-dd", new Date()),
                          "iiii, dd MMMM yyyy",
                          { locale: localeId }
                        )}
                    </div>
                  </div>
                  <div className="flex">
                    <img src="/assets/icon/alarm.svg" alt="" className="mr-2" />
                    <div className="text-[10px] xl:text-base">
                      {items.product.start_time ?? ""} -
                      {items.product.end_time ?? ""}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-3 mt-2 flex items-center text-[14px] font-medium text-pv-grey-medium3">
                  Tanggal Tidak Diatur
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col border-t-2 pt-2 mt-3 xl:w-1/4 xl:justify-center xl:border-l-2 xl:border-t-0 xl:p-6">
            <p className="text-sm font-bold text-pv-grey-medium2">
              Total Transaksi
            </p>
            <p className="text-lg font-bold">
              {currencyFormatter.format(parseInt(items?.price ?? "0"))}
            </p>
          </div>
        </div>
        <div className="text-right">
          {items.online_course_id !== null ? (
            <Button
              onClick={() =>
                router.push(
                  `/pi-learning/onlinecourse/watch/${
                    items.online_course_id ?? ""
                  }`
                )
              }
              size="m"
              className="text-sm font-normal xl:text-base"
            >
              Tonton Video
            </Button>
          ) : items.online ? (
            <Button
              onClick={() => {
                window.open(items.url_meeting ?? "", "_blank");
              }}
              size="m"
              className="text-sm font-normal xl:text-base"
            >
              Gabung Sekarang
            </Button>
          ) : (
            <Button
              size="m"
              onClick={() =>
                downloadTicket(
                  items.transaction_detail_id,
                  `E-Ticket ${items.order_id}`
                )
              }
              className="text-sm font-normal xl:text-base"
            >
              Unduh Tiket
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyActivityCard;
