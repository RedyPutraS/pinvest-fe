/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "components/dialog";
import Button from "components/button/button";
import RenderHtml from "components/render-html";

type Props = {
  isOpen: boolean;
  items: any;
  event: any;
  setIsOpen: (isOpen: boolean) => void;
};

const ModalDetail: React.FC<Props> = ({ isOpen, items, setIsOpen, event }) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-auto mt-[45%] md:mt-0">
        <DialogHeader>
          <DialogTitle>
            <RenderHtml
              html={event?.title ?? ""}
              key={items.title}
              className="mt-4 md:text-xl"
            />
          </DialogTitle>

          <div className="flex justify-between border-b-[1px] border-pv-grey-medium3 "></div>
          <div className="inline-flex gap-4 w-[200px] md:w-[500px] flex-col md:flex-row justify-center mx-auto">
            <div className="flex text-[10px] md:text-[14px] justify-center md:justify-around">
              <img src="/assets/icon/calendar-2.svg" alt="Calendar Icon" className="w-[10px] md:w-[20px]"/>
              <p className="ml-2 whitespace-nowrap text-pv-grey-medium3">
                Berlaku ditanggal terpilih
              </p>
            </div>
            <div className="flex text-[10px] md:text-[14px] justify-center">
              <img src="/assets/icon/sand-watch.svg" alt="Sandwatch Icon" className="w-[10px] md:w-[20px]"/>
              <p className="ml-2 whitespace-nowrap text-pv-grey-medium3">
                Tidak perlu reservasi
              </p>
            </div>
            <div className="flex text-[10px] md:text-[14px] justify-center">
              <img src="/assets/icon/money.svg" alt="Money Icon" className="w-[15px] md:w-[25px]"/>
              <p className="ml-2 whitespace-nowrap text-pv-grey-medium3">
                Tidak bisa refund
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="p-6 ">
              <div className="max-h-72 w-full overflow-y-auto">
                <p className="text-2x1">
                  <RenderHtml
                    html={items.description ?? ""}
                    key={items.description}
                    className="xs:p-4 xs:text-xs mt-4 text-start xl:text-lg"
                  />
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                className="mt-4"
                onClick={() => setIsOpen(false)}
                variant="secondary"
              >
                Kembali
              </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDetail;
