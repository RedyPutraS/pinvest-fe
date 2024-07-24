import { format, parse } from "date-fns";
import StatusBadge from "./status-badge";
import { id as localeId } from "date-fns/locale";
import { currencyFormatter } from "utils/helpers/formatter";
import Button from "components/button/button";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  order: any;
  onClick: (id: string) => void;
};

const TransactionItem = ({ order, onClick }: Props) => {
  return (
    <div className="mt-4 rounded-lg border p-4 shadow hover:shadow-none">
      <div className="flex items-center justify-between xl:justify-start">
        <StatusBadge status={order.payment_progress} />
        <div className="ml-3 text-sm font-bold xl:text-base">
          {order.created_at &&
            format(
              parse(order.created_at, "yyyy-MM-dd HH:mm:ss", new Date()),
              "dd MMMM yyyy",
              { locale: localeId }
            )}
        </div>
        <div className="hidden py-3 text-xs xl:ml-3 xl:block xl:text-base">
          No. Order: {order.order_id}
        </div>
      </div>
      <div className="py-3 text-xs xl:hidden">No. Order: {order.order_id}</div>
      <div className="grid grid-cols-1 xl:mb-4 xl:grid-cols-5 xl:items-center">
        <div className="flex flex-col text-sm text-pv-grey-medium2 xl:col-span-4 xl:text-lg">
          <div>
            <span>{order.total_items} Barang</span>
            <span className="px-1">x</span>
            <span>{currencyFormatter.format(parseInt(order.price))}</span>
          </div>
          <div>
            <span>Biaya Transaksi</span>
            <span className="px-1">:</span>
            <span>{currencyFormatter.format(parseInt(order.total_fee))}</span>
          </div>
          <div>
            <span>Tipe Transaksi</span>
            <span className="px-1">:</span>
            <span>{order.app_name} - {order.transaction_type}</span>
          </div>
        </div>
        <div className="xl:border-l-2 xl:pl-4">
          <div className="mt-1 border-t-2 pt-2 font-semibold text-pv-grey-medium2 xl:mt-0 xl:border-t-0 xl:pt-0 xl:font-normal">
            Total Transaksi
          </div>
          <div className="text-xl font-bold">
            {currencyFormatter.format(parseInt(order.total_amount))}
          </div>
        </div>
      </div>
      <div className="text-end">
        <Button onClick={() => onClick(order.order_id)} className="font-normal">
          Lihat Detail Transaksi
        </Button>
      </div>
    </div>
  );
};

export default TransactionItem;
