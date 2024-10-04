/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEvents } from "modules/pi-event/api/events";
import { Spinner } from "components/spinner";
import { PiEventCard } from "components/pi-event-card/pi-event-card";
import Button from "components/button/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import React from "react";

type Props = {
  type?: string | null;
  time?: string | null;
};

const LandingPiEvent = ({ time = null, type = null }: Props) => {
  const [active, setActive] = React.useState("1");

  const events = useEvents({ time, type, page: "1" });
  const total_page = events.data?.page.total_page ?? 0;
  console.log("Pievent", events);
  
  const getItemProps = (index: string) =>
    ({
      variant: active === index ? "filled" : "text",
      color: active === index ? "bg-red-800" : "bg-blue-800",
      onClick: () => {
        if (index == "...") {
          return;
        }
        setActive(index);
      },
      className: "rounded-full",
    } as any);
  const next = () => {
    const activeNumber = Number(active);
    if (activeNumber == events?.data?.page?.total_page) return;

    setActive((activeNumber + 1).toString());
  };
  const prev = () => {
    const activeNumber = Number(active);
    if (activeNumber == 1) return;

    setActive((activeNumber - 1).toString());
  };

  return (
    <div>
      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        {events.isLoading && <Spinner center />}
        {events.data?.data?.map((event) => (
          <PiEventCard key={event.id} event={event as never} />
        ))}
      </div>
      {
        total_page > 1 && (
          <div className="mt-5 flex justify-center">
            {
              Number(active) !== 1 && (
                <Button
                  variant="text"
                  color="blue-gray"
                  className="flex items-center gap-2 rounded-full text-[10px] lg:text-[14px]"
                  onClick={prev}
                  disabled={active === "1"}
                >
                  <div className="flex">
                    <ArrowLeftIcon strokeWidth={2} className="h-3 w-3 lg:h4 lg:w-4" />{" "}
                    {/* <span className="ml-2 hidden md:block">Sebelumnya</span> */}
                  </div>
                </Button>
              )
            }

            <div className="mx-4 flex items-center gap-2 text-[10px] lg:text-[14px]">
              {events?.data?.page?.links[0]?.label == null ? (
                <Button {...getItemProps("1")}>
                  {events?.data?.page?.current_page}
                </Button>
              ) : (
                events?.data?.page?.links?.map((items, i) => (
                  <Button key={i} {...getItemProps(items?.label)}>
                    {items?.label}
                  </Button>
                ))
              )}
            </div>
            {
              Number(active) !== total_page && (
                <Button
                  variant="text"
                  color="blue-gray"
                  className="flex items-center gap-2 rounded-full text-[10px] lg:text-[14px]"
                  onClick={next}
                  disabled={active == events?.data?.page?.total_page.toString()}
                >
                  <div className="flex">
                    {/* <span className="mr-2 hidden md:block">Selanjutnya</span> */}
                    <ArrowRightIcon strokeWidth={2} className="h-3 w-3 lg:h4 lg:w-4" />
                  </div>
                </Button>
              )
            }
          </div>
        )
      }
    </div>
  );
};

export default LandingPiEvent;
