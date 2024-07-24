import Button from "components/button/button";
import { useRouter } from "next/router";

type Props = {
  profilePicture: string;
  logout: () => void;
};

const AccountMenu: React.FC<Props> = ({ profilePicture, logout }) => {
  const router = useRouter();

  return (
    <div className="hidden md:block">
      <div
        className="flex cursor-pointer items-center hover:bg-slate-100 hover:text-pv-blue-light"
        onClick={() => router.push("/profile")}
      >
        <img
          src={profilePicture}
          alt="Profile Picture"
          className="aspect-square h-10 overflow-hidden rounded object-cover"
        />

        <p
          className="ml-2 cursor-pointer"
          onClick={() => router.push("/profile")}
        >
          Profil
        </p>
      </div>

      <div className="mt-1 flex items-center hover:bg-slate-100 hover:text-pv-blue-light">
        <div className="flex aspect-square h-10 items-center justify-center rounded bg-pv-grey-light1">
          <img
            src="/assets/icon/transaction.svg"
            alt="transaction icon"
            className="aspect-square h-5"
          />
        </div>

        <p
          className="ml-2 cursor-pointer"
          onClick={() => router.push("/transaction")}
        >
          Transaksi
        </p>
      </div>

      <div className="mt-1 flex items-center hover:bg-slate-100 hover:text-pv-blue-light">
        <div className="flex aspect-square h-10 items-center justify-center rounded bg-pv-grey-light1">
          <img
            src="/assets/icon/my-activity.png"
            alt="transaction icon"
            className="aspect-square h-5"
          />
        </div>

        <p
          className="ml-2 cursor-pointer "
          onClick={() => router.push("/my-activity")}
        >
          Aktivitas Saya
        </p>
      </div>

      <hr className="my-4" />

      <Button
        className="hover:darken flex items-center hover:bg-pv-red hover:text-white hover:brightness-75"
        color="red"
        onClick={function () {
          router.push("/auth/login");
          return logout();
        }}
      >
        <img src="/assets/icon/logout.svg" alt="logout icon" />
        <span className="ml-2">Keluar</span>
      </Button>
    </div>
  );
};

export default AccountMenu;
