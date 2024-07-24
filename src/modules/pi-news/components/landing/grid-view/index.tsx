import { Card, CardBody, CardImage } from "components/card";
import { useNews } from "modules/pi-news/api/news";
import { cn } from "utils";
import Image from "next/image";
import Link from "next/link";
import { format, parse } from "date-fns";
import { id } from "date-fns/locale";

type Props = {
  sortBy?: string;
};

const NewsGridView = ({ sortBy }: Props) => {
  const news = useNews({ limit: 5, start: 0, sortBy });

  return (
    <div className="grid grid-cols-1 gap-4 px-5 md:grid-cols-4">
      {news.data?.map((item, index) => {
        const isLarge = index === 1;
        return (
          <Link
            href={`/pi-news/${item.id}`}
            key={item.id}
            className={cn(
              isLarge && "md:col-span-2",
              isLarge && "md:row-span-2"
            )}
          >
            <Card>
              <CardImage>
                <Image
                  fill
                  quality={100}
                  src={item.thumbnail_image ?? ""}
                  alt={`Thumbnail ${item.title}`}
                  style={{ objectFit: "cover" }}
                />
              </CardImage>
              <CardBody>
                <p className="text-xl text-sky-800">{item.title}</p>
                {isLarge && <p className="mb-4 truncate">{item.description}</p>}
                <p>
                  {format(
                    parse(item.publish_at, "yyyy-MM-dd HH:mm:ss", new Date()),
                    "iiii, dd MMMM yyyy, H:mm", {locale: id}
                  )}
                </p>
                <p className="text-sm text-green-500">
                  {item.subcategory_name}
                </p>
              </CardBody>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default NewsGridView;
