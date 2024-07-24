import Button from "components/button/button";
import Typo from "components/typo/typo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useContext } from "react";
import { ActiveTabContext } from "modules/home/context/active-tab-context";

export interface SectionProps {
  title: string;
  variant?: "white" | "light";
  href?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export default function Section(props: SectionProps) {
  const { activeTab } = useContext(ActiveTabContext);
  const { title, href, children, variant = "white" } = props;
  return (
    <div className="mb-6 flex justify-center xl:my-8">
      <div
        className={`w-full ${
          variant === "light" ? `bg-pv-white-light` : `bg-pv-white-pure`
        } px-3 xl:max-w-[1440px] xl:p-3 xl:px-[70px]`}
      >
        <div className="hidden items-center justify-between pt-4 xl:flex">
          {props.icon ?? (
            <Typo.H4 className="m-0 font-semibold">{title}</Typo.H4>
          )}
        </div>
        <div className="flex items-center justify-between xl:hidden">
          {props.icon}
        </div>
        <div>{children}</div>
        <div className="flex items-center justify-end xl:hidden">
          {href && (
            <Link href={`${href}${activeTab}`}>
              <Typo.S2 className="mb-3 font-semibold text-gray-600">
                <Button
                  variant="text"
                  color="blue-gray"
                  className="flex items-center gap-2 rounded-md text-gray-600 mt-10"
                >
                  Lihat semua
                  <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </Button>
              </Typo.S2>
            </Link>
          )}
        </div>
        <div className="mr-2 hidden items-center justify-end xl:flex">
          {href && (
            <Link href={`${href}${activeTab}`}>
              <Typo.H6 className="m-0 font-semibold text-gray-600 hover:opacity-60">
                <Button
                  variant="text"
                  color="blue-gray"
                  className="mt-10 flex items-center gap-2 rounded-md text-gray-600"
                >
                  Lihat semua
                  <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </Button>
              </Typo.H6>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
