import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "components/dialog";
import Button from "components/button/button";
import { currencyFormatter } from "utils/helpers/formatter";
import { useState } from "react";

type Props = {
  isOpen: boolean;
  price: number;
  setIsOpen: (isOpen: boolean) => void;
  onSubmit: (body: { qty: number }) => void;
};

const QtyModal: React.FC<Props> = ({ isOpen, setIsOpen, onSubmit, price }) => {
  const [qty, setQty] = useState(1);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-[350px] mt-[45%] md:mt-0 md:w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-sm text-start md:text-lg">Jumlah Tiket</DialogTitle>
          <div className="flex justify-between border-b-[1px] border-pv-grey-medium3"></div>
          <div className="relative">
            <div className="p-6 shadow-md">
              <p className="text-sm text-pv-grey-medium3">Pax</p>
              <div className="flex items-center justify-between gap-4">

                <div className="flex flex-col md:flex-row items-center">
                  <p className="text-lg md:text-xl lg:text-2xl md:mx-5">{currencyFormatter.format(price)}</p>
                  <div className="flex items-center rounded-xl border border-pv-grey-dark3 p-[2px]">
                    <Button
                      style={{ fontSize: "30px" }}
                      disabled={qty === 1}
                      onClick={() => setQty((prev) => prev - 1)}
                    >
                      -
                    </Button>
                    <p className="px-10">{qty}</p>
                    <Button
                      style={{ fontSize: "30px" }}
                      onClick={() => setQty((prev) => prev + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mr-7 flex justify-end gap-4">
              <Button
                className="mt-4"
                onClick={() => setIsOpen(false)}
                variant="secondary"
              >
                Kembali
              </Button>
              <Button className="mt-4" onClick={() => onSubmit({ qty })}>
                Pesan Sekarang
              </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default QtyModal;
