import { cloneElement, Fragment, isValidElement } from "react";
import type { Tab } from "./tab";

type Props = {
  children?: React.ReactNode | React.ReactNode[];
};

export const TabList = ({ children }: Props) => {
  return (
    <div className="relative flex gap-2 overflow-auto py-0 no-scrollbar before:absolute before:bottom-0 before:z-[-1] before:w-full before:rounded before:bg-neutral-100 md:gap-10 text-[12px] md:text-xl w-full justify-start md:ml-2">
      {Array.isArray(children)
        ? children?.map((child, index) => {
            if (isValidElement(child)) {
              return (
                <Fragment key={index}>
                  {cloneElement(child as ReturnType<typeof Tab>, { index })}
                </Fragment>
              );
            }
            return <Fragment key={index}>{child}</Fragment>;
          })
        : children}
    </div>
  );
};
