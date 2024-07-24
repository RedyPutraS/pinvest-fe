import Button from "components/button/button";
import { useDisclosure } from "hooks/use-disclosure";
import { currencyFormatter } from "utils/helpers/formatter";
import QtyModal from "./qty-modal";
import ModalDetail from "components/modal-detail";
import { useAuthStore } from "hooks/use-auth-store";
import { useState } from "react";
import PopupLogin from "components/popup-login/popup-login";

type Props = {
  title: string;
  price: number;
  onSubmit: (body: { qty: number }) => void;
  dataItem: any;
  eventData: any;
};

const Tiket: React.FC<Props> = ({
  title,
  price,
  onSubmit,
  dataItem,
  eventData,
}) => {
  const auth = useAuthStore();
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const qtyModal = useDisclosure();
  const modalOn = useDisclosure();

  return (
    <>
      {isLoginPopupOpen && (
        <PopupLogin onClose={() => setIsLoginPopupOpen(false)} />
      )}
      <div className="rounded-lg bg-white px-6 py-4 shadow">
        <div className="flex justify-between">
          <h1 className="text-2xl text-gray-600">{title}</h1>
          <div
            className="cursor-pointer text-center text-blue-500"
            onClick={modalOn.onOpen}
          >
            Rincian
          </div>
        </div>

        <div className="mb-4 mt-6 border-b border-dashed border-pv-grey-medium1" />

        <div className="flex justify-between">
          <div>
            <p className="text-gray-600">Harga</p>
            <p className="text-2xl text-gray-600">
              {price == 0 ? (
                <div className="text-pv-blue-lighter">Gratis</div>
              ) : (
                currencyFormatter.format(price)
              )}
            </p>
          </div>

          <Button
            onClick={() =>
              auth.user ? qtyModal.onOpen() : setIsLoginPopupOpen(true)
            }
          >
            Pilih
          </Button>
        </div>

        <QtyModal
          isOpen={qtyModal.isOpen}
          setIsOpen={qtyModal.setIsOpen}
          price={price}
          onSubmit={onSubmit}
        />

        <ModalDetail
          isOpen={modalOn.isOpen}
          setIsOpen={modalOn.setIsOpen}
          items={dataItem}
          event={eventData}
        />
      </div>
    </>
  );
};

export default Tiket;
