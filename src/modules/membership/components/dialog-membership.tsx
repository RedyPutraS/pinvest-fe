import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "components/dialog";
import { useRouter } from "next/router";
import { currencyFormatter } from "utils/helpers/formatter";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  durations?: {
    id: number;
    type: string;
    name: string;
    duration: number;
    price: number;
  }[];
};

const DialogMembership = ({ isOpen, setIsOpen, durations }: Props) => {
  const router = useRouter();
  
  const handleCheckout = (price: number, id: number) => {
    const dataToSend = {
      total: price ?? 0, // Menyimpan total harga yang akan dibayar
    };
  
    // Simpan data ke sessionStorage
    sessionStorage.setItem('checkoutData', JSON.stringify(dataToSend));
  
    // Redirect ke halaman checkout dengan ID dan type yang sesuai
    router.push({
      pathname: `/checkout`,
      query: {
        type: 'membership',
        id: id,
      },
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Durasi Keanggotaan</DialogTitle>
          <div className="flex justify-between border-b-[1px] border-pv-grey-medium3"></div>
          <div className="relative flex flex-col gap-4">
            {durations?.map((item) => (
              <div
                className="cursor-pointer p-6 shadow-md"
                key={item.duration}
                onClick={() => handleCheckout(item.price, item.id)}
              >
                <p>
                  {item.name} ({item.duration} Bulan)
                </p>
                <p className="font-semibold">
                  {currencyFormatter.format(item.price ?? "0")}
                </p>
              </div>
            ))}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogMembership;
