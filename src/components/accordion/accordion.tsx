import type { ReactNode } from "react";
import { useState } from "react";
import { cn } from "utils";
type Props = {
  title: string;
  children: ReactNode;
  isFirst: boolean;
  isLast: boolean;
};
const Accordion = ({ title, children, isFirst, isLast }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="accordion">
      <div
        className={cn(
          "accordion-title cursor-pointer border-l border-r border-t border-pv-grey-light3 bg-white p-5",
          isExpanded
            ? "rounded-none"
            : isFirst
            ? "rounded-t-lg"
            : isLast
            ? "rounded-b-lg border-b"
            : "rounded-none"
        )}
        onClick={toggleAccordion}
      >
        <div className="flex items-center justify-between">
          <h1 className="font-medium xl:text-xl">{title}</h1>
          <img
            className="w-8 xl:w-14"
            src={
              isExpanded
                ? "/assets/icon/accordion-minus.svg"
                : "/assets/icon/accordion-plus.svg"
            }
            alt="location"
          />
        </div>
      </div>
      {isExpanded && (
        <div
          className={cn(
            "accordion-content border-l border-r border-t border-pv-grey-light3 bg-white p-6 text-sm xl:text-base",
            isLast ? "rounded-b-lg border-b" : "rounded-none"
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
