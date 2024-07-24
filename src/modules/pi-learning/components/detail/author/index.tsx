import ShareArticle from "components/icon/share-article";
import { format, parse } from "date-fns";
import { id } from "date-fns/locale";

type Props = {
  author?: string;
  publishedAt?: string | null;
  subcategory?: string;
};

const Author = ({ author, publishedAt, subcategory }: Props) => {
  return (
    <div className="flex justify-between border-b-2 border-black pb-4 text-gray-600">
      <div>
        <p className="mb-2 text-xs md:text-base">
          {publishedAt &&
            format(
              parse(publishedAt, "yyyy-MM-dd HH:mm:ss", new Date()),
              "eeee, dd MMMM yyyy, H:mm",
              { locale: id }
            )}
        </p>
        <p className="text-sm text-gray-600 md:text-lg">Penulis : {author}</p>
      </div>

      <div className="grid grid-cols-1 lg:flex xl:flex xl:h-10">
        {subcategory && (
          <span className="mb-2 rounded-lg bg-blue-200 px-3 py-1 text-center text-sm font-semibold text-sky-800 xl:mr-4 md:px-6 md:py-2 md:text-base lg:my-0 xl:my-0 2xl:my-0">
            {subcategory}
          </span>
        )}
        <ShareArticle />
      </div>
    </div>
  );
};

export default Author;
