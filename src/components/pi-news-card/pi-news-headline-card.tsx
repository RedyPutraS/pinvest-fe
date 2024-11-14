import { Card, CardBody, CardImage } from "components/card";
import ShareButton from "components/icon/share-button";
import Typo from "components/typo/typo";
import { format, parse } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { cn } from "utils";
import { id } from "date-fns/locale";
import { useEffect } from "react";
type Props = {
  article: any;
  descHeight?: string;
};
export default function PiNewsHeadlineCard({
  article,
  descHeight = "xl:h-[60px]",
}: Props) {
  
  return (
    <div className=" cursor-pointer opacity-90 ring-gray-200 hover:opacity-100 hover:ring-2">
      <Card className="shadow-md h-full xl:h-[603px]">
        <CardImage className="relative">
          <Link href={`/pi-news/${article.id}`}>
            <Image src={article.thumbnail_image} alt={article.title} fill />
          </Link>
          <div className="absolute top-0 right-0 m-2 lg:m-4 lg:w-10">
            <ShareButton path={`/pi-news/${article.id}`} className="w-7 md:w-10 md:h-9 xl:w-10 lg:w-full"/>
          </div>
        </CardImage>
        <CardBody>
          <Link href={`/pi-news/${article.id}`}>
            <Typo.H5 className="my-2 hidden font-bold text-gray-600 line-clamp-1 md:block">
              {article.title.length > 90 ? `${article.title.substring(0, 90)}...` : article.title}
            </Typo.H5>
            <Typo.H6 className="text-center font-bold text-gray-600 md:hidden">
              {/* {article.title} */}
              {article.title.length > 90 ? `${article.title.substring(0, 90)}...` : article.title}
            </Typo.H6>
            <Typo.B2
              className={cn(
                "hidden text-clip text-pv-grey-medium2 line-clamp-2 md:mb-2 md:block",
                descHeight
              )}
            >
              {article.description}
            </Typo.B2>
            <Typo.B2 className="hidden text-pv-grey-medium2 md:block">
              {article.publish_at &&
                format(
                  parse(article.publish_at, "yyyy-MM-dd HH:mm:ss", new Date()),
                  "iiii, dd MMMM yyyy, H:mm",
                  { locale: id }
                )}
            </Typo.B2>
            <Typo.Caption className="py-1 text-center text-pv-grey-medium2 md:hidden">
              {article.publish_at &&
                format(
                  parse(article.publish_at, "yyyy-MM-dd HH:mm:ss", new Date()),
                  "iiii, dd MMMM yyyy, H:mm",
                  { locale: id }
                )}
            </Typo.Caption>
            <Typo.B2 className="hidden text-pv-green md:block">
              Sumber: {article.author}
            </Typo.B2>
            <Typo.Caption className="text-center text-pv-green md:hidden">
              Sumber: {article.author}
            </Typo.Caption>
          </Link>
        </CardBody>
      </Card>
    </div>
  );
}
