import { currencyFormatter } from "utils/helpers/formatter";

type Props = {
  items: any;
};

const MyActivityCardMembership = ({ items }: Props) => {
  return (
    <div className="bg-pv-white-light p-6 xl:mb-8" style={{ marginBottom: '15px' }}>
      <div>
        <div className="mb-2 mt-4 flex flex-col xl:flex-row">
          <div className="grid grid-cols-3 gap-2 xl:flex xl:flex-grow">
            <div className="xl:mr-4 my-auto w-[100px] md:w-[200px]">
              <img
                src={items.product.thumbnail_image ?? ""}
                alt=""
                className="w-full rounded-lg md:object-fill xl:h-full xl:w-[200px]"
              />
            </div>
            <div className="col-span-2 ml-8 flex flex-col xl:mr-4">
              <p>Durasi:</p>
              <h1 className="font-semibold xl:text-2xl">
                {items?.product.title ?? ""}
              </h1>
              <p>Keanggotaan :</p>
              <h1 className="font-semibold xl:text-xl">
                {items?.product.plan_name ?? ""}
              </h1>
              <p>type :</p>
              <h3 className="font-semibold xl:text-base">
                {items?.product.duration_type ?? ""}
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
      </div>
    </div>
  );
};

export default MyActivityCardMembership;
