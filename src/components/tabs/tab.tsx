import { useContext } from "react";
import clsx from "clsx";
import { TabContext } from ".";
type Props = {
  children?: React.ReactNode;
  index?: number;
};

export const Tab = ({ children, index }: Props) => {
  const { setActiveTab, activeTab } = useContext(TabContext);

  const handleClick = () => {
    setActiveTab?.(index ?? 0);
  };

  const isActive = index === activeTab;
  return (
    <button
      data-testid="tab"
      onClick={handleClick}
      className={clsx(
        "relative flex justify-center whitespace-nowrap py-2 text-center transition-all before:absolute before:bottom-0 before:z-0 before:h-1 before:w-full before:rounded",
        isActive
          ? "text-sky-800 before:bg-sky-800 "
          : "text-neutral-400 before:border-transparent hover:text-gray-600"
      )}
    >
      {children}
    </button>
  );
};
