import PageBody from "components/page/page-body";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "components/tabs";
import { useActivityList } from "modules/my-activity/api/activity";
import MyActivityCard from "modules/my-activity/component/my-activity";
import MyActivityCardMembership from "modules/my-activity/component/my-activity-membership";
import MyActivityCardOnlineCourse from "modules/my-activity/component/my-activity-online-course";
import { useState } from "react";
import { transactionFilter } from "utils/constants";

const MyActivity = () => {
  const [tabs, setTabs] = useState<string>();
  const activity = useActivityList({ tab: tabs });
  const handletab = (tab: number) => {
    let tab2 = "";
    if (tab == 0) {
      tab2 = "event";
    } else if (tab == 1) {
      tab2 = "online-course";
    } else if (tab == 2) {
      tab2 = "membership";
    }
    setTabs(tab2);
  };

  const { list } = transactionFilter();

  return (
    <PageBody className="min-h-[550px]">
      <div className="mx-4">
        <Tabs initActiveTab={0} onChangeTab={handletab}>
          <TabList>
            {activity?.data?.tab.map((item, i) => (
              <Tab key={i}>
                <div className="text-md xl:text-xl xl:font-medium">
                  {item.tab_name}
                </div>
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {list.map((item, i) => (
              <TabPanel key={i}>
                {tabs == "event" || i == 0 ? (
                  activity?.data?.result.map((itemx, id) => (
                    <MyActivityCard key={id} items={itemx} />
                  ))
                ) : tabs == "membership" ? (
                  activity?.data?.result.map((itemx, id) => (
                    <MyActivityCardMembership key={id} items={itemx} />
                  ))
                ) : tabs == "online-course" ? (
                  activity?.data?.result.map((itemx, id) => (
                    <MyActivityCardOnlineCourse key={id} items={itemx} />
                  ))
                ) : (
                  <div className="flex items-center justify-center p-10">
                    Tidak ada transaksi
                  </div>
                )}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </div>
    </PageBody>
  );
};

export default MyActivity;
