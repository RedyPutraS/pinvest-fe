import { QueryClient, dehydrate } from "@tanstack/react-query";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "components/tabs";
import SectionBanner from "modules/home/components/section-banner";
import { useEvents } from "modules/pi-event/api/events";
import LandingPiEvent from "modules/pi-event/components/landing";
import type {
  InferGetServerSidePropsType,
  NextPage,
  NextPageContext,
} from "next";
import PopupBanner from "components/popup-banner";
import { useRouter, useSearchParams } from "next/navigation";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const PiEvent: NextPage<Props> = () => {
  const APP = "pievent";
  const router = useRouter();
  const categories = ["all", "online", "day", "week"];
  const searchParams = useSearchParams();
  const category = searchParams?.get("category") ?? "directory";
  return (
    <>
      <SectionBanner tab="pievent" />

      <PopupBanner app={APP} />
      <section className="mx-auto mb-8 w-screen p-3 xl:max-w-[1440px] xl:px-[70px]">
        <Tabs
          initActiveTab={categories.findIndex((v) => v === category) ?? 0}
          onChangeTab={(page) => {
            router.push(`/pi-event?category=${categories[page]}`);
          }}
        >
          <TabList>
            <Tab>Semua</Tab>
            <Tab>Online</Tab>
            <Tab>Hari Ini</Tab>
            <Tab>Minggu Ini</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <LandingPiEvent />
            </TabPanel>
            <TabPanel>
              <LandingPiEvent type="online" />
            </TabPanel>
            <TabPanel>
              <LandingPiEvent time="day" />
            </TabPanel>
            <TabPanel>
              <LandingPiEvent time="week" />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </section>
    </>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  const query = context.query;
  const queryClient = new QueryClient();

  const params = {
    time: query.time?.toString() || null,
    type: query.type?.toString() || null,
    page: query.page?.toString() || "1",
  };

  await useEvents.prefetch(queryClient, params);

  return {
    props: {
      params,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default PiEvent;
