import StarFilled from "components/icon/star-filled";
import type { ReactNode } from "react";
import { useState } from "react";
import RatingDialog from "./rating-dialog";
import { useAuthStore } from "hooks/use-auth-store";
import { useRouter } from "next/router";
type Props = {
  ratingCount?: string;
  children?: ReactNode;
  refetch: () => void;
  title?: string;
};
const RatingSection = ({
  ratingCount,
  children,
  refetch,
  title = "Rating Artikel",
}: Props) => {
  const auth = useAuthStore();
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  const router = useRouter();
  return (
    <div>
      <RatingDialog
        showDialog={ratingDialogOpen}
        onClose={function (val: boolean): void {
          setRatingDialogOpen(val);
          refetch();
        }}
      />
      <div className="flex items-center xl:py-4 xl:text-2xl">
        <StarFilled className="h-7 w-7 text-pv-orange" />
        <div className="px-2 font-medium">
          {ratingCount} {title}
        </div>
      </div>
      {children}
      <div className="flex py-4 xl:py-8">
        <button className="rounded-md border border-pv-blue-dark px-4 py-2 text-xs text-pv-blue-dark hover:border-pv-blue-light hover:text-pv-blue-light xl:rounded-lg xl:py-3 xl:px-6 xl:text-base">
          Lihat Semua Review
        </button>
        <button
          className="ml-4 rounded-md bg-pv-blue-dark px-4 py-2 text-xs font-light text-white hover:bg-pv-blue-light xl:rounded-lg xl:py-3 xl:px-6 xl:text-base"
          onClick={() => {
            auth.user ? setRatingDialogOpen(true) : router.push("/auth/login");
          }}
        >
          Berikan Rating
        </button>
      </div>
    </div>
  );
};

export default RatingSection;
