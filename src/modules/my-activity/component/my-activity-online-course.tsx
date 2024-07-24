import { currencyFormatter } from "utils/helpers/formatter";
import Button from "components/button/button";
import { useRouter } from "next/router";
import { downloadTicket } from "modules/transaction/download-ticket";

type Props = {
  items: any;
};

const MyActivityCardOnlineCourse = ({ items }: Props) => {
  const router = useRouter();
  return (
    <div className="bg-pv-white-light p-6 xl:mb-8" style={{ marginBottom: '15px' }}>
      <div>
        <div className="mb-2 mt-4 flex flex-col xl:flex-row">
          <div className="grid grid-cols-3 gap-2 xl:flex xl:flex-grow">
            <div className="xl:mr-4 col-span-3">
              <img
                src={items.product.image ?? ""}
                alt=""
                className="rounded-lg object-fill xl:h-36 xl:max-w-xl"
              />
            </div>
            <div className="col-span-3 flex flex-col xl:mr-4">
              <h1 className="font-semibold xl:text-xl">
                {items?.product?.title ?? ""}
              </h1>
              <h3 className="font-semibold xl:text-base">
                <p className="font-normal">
                  Duration : {items?.product?.duration ?? ""}
                </p>
              </h3>
            </div>
          </div>
          <div className="flex flex-col border-t-2 pt-2 xl:w-1/4 xl:justify-center xl:border-l-2 xl:border-t-0 xl:p-6">
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

export default MyActivityCardOnlineCourse;
