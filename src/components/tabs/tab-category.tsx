import { useContext } from "react";
import clsx from "clsx";
import { TabContext } from ".";

import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  children?: React.ReactNode;
  index?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subcategorys?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  alias?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  category?: any;
};

export const TabCategory = ({ subcategorys }: Props) => {
  const { setActiveTab } = useContext(TabContext);
  const router = useRouter();
  const slug = router.query.subcategory;

  const lists = [];
  for (let xxx = 0; xxx < subcategorys.length; xxx++) {
    // const list = subcategorys[xxx].subcategory_name.toLowerCase();
    const list = subcategorys[xxx].subcategory_name.toLowerCase();
    const listUpperCase = subcategorys[xxx].subcategory_name;

    const handleClick = () => {
      setActiveTab?.(xxx ?? 0);
    };
    const isActive = list === slug;
    lists.push(
      <Link href={`/pi-learning/article/c/${list}`}>
        <button
          data-testid="tab"
          onClick={handleClick}
          className={clsx(
            "relative flex justify-center whitespace-nowrap py-2 text-center transition-all before:absolute before:bottom-0 before:z-0 before:h-2 before:w-full before:rounded xl:p-2",
            isActive
              ? "text-sky-800 before:bg-sky-600"
              : "text-neutral-400 before:border-transparent hover:text-neutral-700"
          )}
        >
          {listUpperCase}
        </button>
      </Link>
    );
  }

  return <>{lists}</>;
};
