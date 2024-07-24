import { usePathname, useSearchParams } from "next/navigation";
import LoginPage from "pages/auth/login";
type Props = {
  onClose: () => void;
};
const PopupLogin = ({ onClose }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="h-[90%] w-[90%] rounded bg-white shadow-lg md:h-[90%] md:w-1/3">
        <div className="flex justify-end p-3">
          <img
            src="/assets/icon/close.svg"
            className="h-10 w-10 "
            onClick={onClose}
            alt={"close icon"}
          />
        </div>
          <LoginPage redirect={`${pathname}?${searchParams}`} />
      </div>
    </div>
  );
};
export default PopupLogin;
