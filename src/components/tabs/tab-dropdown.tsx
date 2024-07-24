import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { TabContext } from ".";

type Props = {
  children?: React.ReactNode;
  index?: any;
  subcategorys?: any;
  alias?: any;
};

export const TabDropdown = ({
  children,
  index,
  subcategorys,
  alias,
}: Props) => {
  const { setActiveTab } = useContext(TabContext);
  const handleClick = () => {
    setActiveTab?.(index);
  };
  const router = useRouter();
  const slug = router?.query?.slug;
  const lists = [];
  for (let xxx = 0; xxx < subcategorys.length; xxx++) {
    const list = subcategorys[xxx].subcategory_name;
    const subAlias = subcategorys[xxx].alias;
    lists.push(
      <ol className=" py-2 text-start">
        <li>
          <span onClick={() => router.push(`/pi-news/${alias}/${subAlias}`)}>
            {list}
          </span>
        </li>
      </ol>
    );
  }

  const isActive = alias === slug;

  return (
    <>
      <button
        data-testid="tab"
        onClick={handleClick}
        className={clsx(
          "relative my-auto flex justify-center whitespace-nowrap py-2 text-center transition-all before:absolute before:bottom-0 before:z-0 before:h-2 before:w-full before:rounded xl:p-2",
          isActive
            ? "text-sky-800 before:bg-sky-700"
            : "text-neutral-400 before:border-transparent hover:text-neutral-700"
        )}
      >
        <Popover>
          <Link href={`/pi-news-category/${alias}`}>
            <PopoverTrigger>{children}</PopoverTrigger>
          </Link>
          {lists.length !== 0 && (
            <PopoverContent className="z-[20] mt-5 rounded bg-white p-2 outline-none">
              {lists}
            </PopoverContent>
          )}
        </Popover>
      </button>
    </>
  );
};
