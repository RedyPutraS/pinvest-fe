import { Card, CardBody, CardImage } from "components/card";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
  subcategory?: string | null;
};

const EventItem = ({
  id,
  title,
  thumbnail,
  description,
  subcategory,
}: Props) => {
  const router = useRouter();
  return (
    <Link href={`/pi-learning/${router.query.category}/${id}`}>
      <Card>
        <CardImage>
          <Image
            fill
            src={thumbnail}
            alt={`Thumbnail ${title}`}
            style={{ objectFit: "cover" }}
          />
        </CardImage>
        <CardBody>
          <p className="mt-4 text-2xl font-bold">{title}</p>
          <p className="mt-4 text-neutral-400">{description}</p>

          <div className="mt-4 flex flex-wrap gap-1">
            <span className="rounded-lg bg-blue-200 py-2 px-6 font-bold text-sky-800">
              {subcategory}
            </span>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
};

export default EventItem;
