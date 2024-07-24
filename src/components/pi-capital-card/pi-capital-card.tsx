import type { PiCapitalArticle } from "modules/home/api/pi-capital";
import Image from "next/image";
import { cn } from "utils";
import router from "next/router";
type Props = {
  article: PiCapitalArticle;
  className?: string;
  isLargerIcon?: boolean;
};
export function PiCapitalCard({
  article,
  className = "bg-pv-white-light",
  isLargerIcon = false,
}: Props) {
  const myLoader = () => {
    return `${article.thumbnail_image}`;
  };
  return (
    <div>
      <div
        className={cn(
          "relative flex h-[80px] cursor-pointer justify-center  rounded-lg shadow-md ring-gray-200 hover:ring-2 xl:h-[120px] mt-3",
          className
        )}
        onClick={() => router.push(`/pi-capital/${article.id}`)}
      >
        <Image
          loader={myLoader}
          className={cn(
            "object-contain p-4",
            isLargerIcon ? "xl:p-0" : "xl:p-6"
          )}
          src={article.thumbnail_image}
          alt={article.title}
          width={222}
          height={0}
        />
      </div>
    </div>
  );
}
