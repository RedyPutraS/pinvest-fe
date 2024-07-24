import { QueryClient, dehydrate } from "@tanstack/react-query";
import useStore from "app/store";
import PageBody from "components/page/page-body";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "components/tabs";
import TransactionItem from "components/transaction/transaction-item";
import type { ListParams } from "modules/transaction/transaction";
import { useTransactionList } from "modules/transaction/transaction";
import type { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { transactionFilter } from "utils/constants";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
const Transaction = ({ param }: Props) => {
  const [params, setParams] = useState(param);
  const { data } = useTransactionList(params);
  const router = useRouter();
  const { list } = transactionFilter();
  const { incrementN } = useStore();
  useEffect(() => {
    incrementN();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <PageBody className="min-h-[550px]">
      <div className="mx-4">
        <Tabs
          initActiveTab={0}
          onChangeTab={(tab) => {
            setParams({
              ...param,
              payment_progress: transactionFilter().list[tab]?.code,
            });
          }}
        >
          <TabList>
            {list.map((item, i) => (
              <Tab key={i}>
                <div className="text-md xl:text-xl xl:font-medium">
                  {item.name}
                </div>
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {list.map((item, i) => (
              <TabPanel key={i}>
                {data && data?.length > 0 ? (
                  data?.map((order, idx) => (
                    <TransactionItem
                      key={idx}
                      order={order}
                      onClick={(id) => {
                        if (order.payment_progress === "booking") {
                          return router.push(
                            `/checkout/payment?order=${encodeURIComponent(id)}`
                          );
                        } else {
                          return router.push(
                            `/transaction/${encodeURIComponent(id)}`
                          );
                        }
                      }}
                    />
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
export const getServerSideProps = async () => {
  const param: ListParams = {
    page: 1,
    limit: 10,
  };
  const queryClient = new QueryClient();
  const prefetchAds = useTransactionList.prefetch(queryClient, param);
  await prefetchAds;
  return {
    props: {
      param,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
export default Transaction;
