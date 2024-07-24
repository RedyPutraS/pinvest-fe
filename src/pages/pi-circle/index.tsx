import PageBody from "components/page/page-body";
import PageHeader from "components/page/page-header";
import { PiCircleDirectory } from "components/pi-circle-directory/pi-circle-directory";
import { PiCircleForum } from "components/pi-circle-forum/pi-circle-forum";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "components/tabs";
import SectionBanner from "modules/home/components/section-banner";
import PopupBanner from "components/popup-banner";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
const PiCast = () => {
  const APP = "picircle";
  const router = useRouter();
  const categories = ["directory", "forum"];
  const searchParams = useSearchParams();

  const category = searchParams?.get("category") ?? "directory";
  return (
    <>
      <PageHeader>
        <SectionBanner tab="picircle" />
      </PageHeader>
      <PopupBanner app={APP} />

      <PageBody>
        <Tabs
          initActiveTab={categories.findIndex((v) => v === category) ?? 0}
          onChangeTab={(page) => {
            router.push(`/pi-circle?category=${categories[page]}`);
          }}
        >
          <TabList>
            <Tab>Direktori</Tab>
            <Tab>Forum</Tab>
          </TabList>
          <div className="xl:h-3"></div>
          <TabPanels>
            <TabPanel>
              <PiCircleDirectory />
            </TabPanel>
            <TabPanel>
              <PiCircleForum />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </PageBody>
    </>
  );
};

export default PiCast;
