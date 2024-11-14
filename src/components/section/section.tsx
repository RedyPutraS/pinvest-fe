import Button from "components/button/button";
import Typo from "components/typo/typo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useContext } from "react";
import { ActiveTabContext } from "modules/home/context/active-tab-context";
import useStore from "app/store";

export interface SectionProps {
  title: string;
  variant?: "white" | "light";
  href?: string; // href bisa undefined
  children: React.ReactNode;
  icon?: React.ReactNode;
}

interface ChildProps {
  href?: string;
  activeTab?: string;
}

export default function Section(props: SectionProps) {
  const { activeTab } = useContext(ActiveTabContext);
  const { title, href, children, variant = "white" } = props;
  const { show, section } = useStore();

  const extractSegment = (url?: string): string => {
    if (!url) return '';
    const basePath = url.split('?')[0];
    if (!basePath) return '';
    const segments = basePath.split('/').filter(Boolean);
    return segments.pop() || '';
  };

  const lastSegment = extractSegment(href);
  const shouldHideButtons = lastSegment === "pi-learning" && section === 1 && !show;

  return (
    <div className="mb-6 flex justify-center xl:my-8">
      <div className={`w-full ${variant === "light" ? `bg-pv-white-light` : `bg-pv-white-pure`} px-3 xl:max-w-[1440px] xl:p-3 xl:px-[70px]`}>
        <div className="hidden items-center justify-between pt-4 xl:flex">
          {props.icon ?? (
            <Typo.H4 className="m-0 font-semibold">{title}</Typo.H4>
          )}
        </div>
        <div className="flex items-center justify-between xl:hidden">
          {props.icon}
        </div>

        {/* Clone children and pass href and activeTab */}
        <div>
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              // Type assertion to ChildProps to avoid TypeScript error
              return React.cloneElement(child as React.ReactElement<ChildProps>, { href, activeTab });
            }
            return child;
          })}
        </div>
        
        {
  (lastSegment !== "pi-learning" && lastSegment !== "pi-circle" && lastSegment !== "pi-event") && (
    <>
      <div className="flex items-center justify-end xl:hidden">
        {!shouldHideButtons && href && children && (
          <Link href={`${href}${activeTab}`}>
            <Typo.S2 className="mt-2 font-semibold text-gray-600">
              <Button
                variant="text"
                color="blue-gray"
                className="text-[10px] md:text-base flex items-center gap-1 md:gap-2 rounded-md text-gray-600 px-3"
              >
                Lihat semua
                <ArrowRightIcon strokeWidth={2} className="h-3 w-3 md:h-4 md:w-4" />
              </Button>
            </Typo.S2>
          </Link>
        )}
      </div>

      <div className="mr-2 hidden items-center justify-end xl:flex">
        {!shouldHideButtons && href && children && (
          <Link href={`${href}${activeTab}`}>
            <Typo.H6 className="m-0 font-semibold text-gray-600 hover:opacity-60 xl:mt-3">
              <Button
                variant="text"
                color="blue-gray"
                className="flex items-center gap-2 rounded-md text-gray-600"
              >
                Lihat semua
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
              </Button>
            </Typo.H6>
          </Link>
        )}
      </div>
    </>
  )
}

        {/* <div>{lastSegment}</div> */}
      </div>
    </div>
  );
}
