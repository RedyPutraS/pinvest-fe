import { Card, CardBody, CardImage } from "components/card";
import ShareButton from "components/icon/share-button";
import Typo from "components/typo/typo";
import { format, parse } from "date-fns";
import type { PiNewsArticle } from "modules/home/api/pi-news";
import Link from "next/link";
import { cn } from "utils";
import { id } from "date-fns/locale";
type Props = {
  article: PiNewsArticle;
  variant?: "small" | "large";
  withDescription?: boolean;
  imgClassName?: string;
};
export default function PiNewsCard({
  article,
  variant = "small",
  withDescription = true,
  imgClassName,
}: Props) {
  return (
    <div>
      <Card className="cursor-pointer rounded-md opacity-90 ring-gray-200 hover:opacity-100 hover:ring-2 xl:mb-4 xl:h-[190px] shadow-md md:h-[220px]">
        <CardImage className="relative">
          <Link href={`/pi-news/${article.id}`}>
            <img
              src={article.thumbnail_image}
              alt={article.title}
              className={cn("w-full object-cover", imgClassName)}
            />
          </Link>
          <div className="absolute top-0 right-0 m-2 xl:m-2 lg:w-8 lg:h-8">
            <ShareButton path={`/pi-news/${article.id}`} className="max-w-[30px] lg:w-[50px]"/>
          </div>
        </CardImage>
        <CardBody className="py-2 md:h-[79px] xl:h-[92px]">
          <Link href={`/pi-news/${article.id}`}>
            {variant === "large" ? (
              <Typo.H5 className="hidden truncate text-gray-600 md:block">
                {article.title}
              </Typo.H5>
            ) : (
              <Typo.B1 className="hidden truncate font-bold text-gray-600 line-clamp-1 md:block ">
                {article.title}
              </Typo.B1>
            )}
            <Typo.Caption className="font-extrabold h-8 truncate text-gray-600 md:hidden">
              {article.title}
            </Typo.Caption>
            {withDescription && (
              <Typo.B2 className="hidden truncate text-pv-grey-medium2 md:mb-4 md:block">
                {article.description}
              </Typo.B2>
            )}
            <Typo.B2 className="hidden h-4 truncate text-xs text-pv-grey-medium2 md:block">
              {article.publish_at &&
                format(
                  parse(article.publish_at, "yyyy-MM-dd HH:mm:ss", new Date()),
                  "iiii, dd MMMM yyyy, H:mm",{locale: id}
                )}
            </Typo.B2>
            <Typo.Caption className="h-5 py-1 text-[8px] text-pv-grey-medium2 md:hidden">
              {article.publish_at &&
                format(
                  parse(article.publish_at, "yyyy-MM-dd HH:mm:ss", new Date()),
                  "iiii, dd MMMM yyyy, H:mm",{locale: id}
                )}
            </Typo.Caption>
            <Typo.B2 className="hidden text-pv-green md:block xl:text-xs">
              Sumber: {article.author}
            </Typo.B2>
            <Typo.Caption className="text-[8px] text-pv-green md:hidden">
              Sumber: {article.author}
            </Typo.Caption>
          </Link>
        </CardBody>
      </Card>
    </div>
  );
}
