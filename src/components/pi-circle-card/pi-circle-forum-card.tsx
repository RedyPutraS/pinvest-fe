import { format, parse } from "date-fns";
import { useRouter } from "next/router";
import { id } from "date-fns/locale";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  article: any;
};

export const PiCircleForumCard = ({ article }: Props) => {
  const router = useRouter();
  return (
    <div
      className=" mb-4 cursor-pointer border-2 border-pv-white-light bg-pv-white-light hover:border-pv-grey-medium2 xl:rounded-lg xl:p-6"
      onClick={() => router.push(`/pi-circle/forum/${article.id}`)}
    >
      <div className="flex">
        <img
          src={article.thumbnail_image}
          alt={article.title}
          className="h-10 w-10 rounded-lg object-cover xl:h-14 xl:w-14"
        />
        <div className="ml-2">
          <p className="text-dark3 text-base font-semibold xl:text-xl">
            {article.author}
          </p>
          <p className="text-medium3 text-[12px] xl:text-sm">
            {article.publish_at &&
              format(
                parse(article.publish_at, "yyyy-MM-dd HH:mm:ss", new Date()),
                "iiii, dd MMMM yyyy, H:mm",
                { locale: id }
              )}
          </p>
        </div>
      </div>
      <h1 className="mt-6 font-semibold xl:text-xl">{article.title}</h1>
      <p className="mt-2 text-[12px] xl:text-base">{article.description}</p>
      <div className="mt-6 flex border-t-2 p-2 text-xs xl:p-0 xl:pt-4">
        <div className="mr-6 flex items-center">
          <img
            className="mr-2 h-5 w-5 xl:h-8 xl:w-8"
            src="/assets/icon/eye.svg"
            alt="eye"
          />
          <span className="mr-1">{article.view}</span>
          <span>Dilihat</span>
        </div>
        <div className="mr-6 flex items-center">
          <img
            className="mr-2 h-4 w-4 xl:h-7 xl:w-7"
            src="/assets/icon/thumbs-up-outline-black.svg"
            alt="thumbs-up"
          />
          <span className="mr-1">{article.like}</span>
          <span>Suka</span>
        </div>
        <div className="mr-6 flex items-center">
          <img
            className="mr-2 h-3 w-3 xl:h-6 xl:w-6"
            src="/assets/icon/chat-outlined.svg"
            alt="eye"
          />
          <span className="mr-1">{article.comment}</span>
          <span>Komentar</span>
        </div>
      </div>
    </div>
  );
};
