import { cloneElement, Fragment, isValidElement } from "react";
import type { Tab } from "./tab";

type Props = {
  children?: React.ReactNode | React.ReactNode[];
};

export const TabListHeader = ({ children }: Props) => {
  return (
    <div className="relative mx-3 flex gap-10 overflow-auto py-0 before:absolute before:bottom-0 before:z-[-1] before:h-2 before:w-full before:rounded before:bg-neutral-100">
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
