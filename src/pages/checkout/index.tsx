/* eslint-disable @typescript-eslint/no-explicit-any */
import useStore from "app/store";
import type { AxiosError } from "axios";
import Accordion from "components/accordion-list";
import Button from "components/button/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "components/dialog";
import PageBody from "components/page/page-body";
import { useDisclosure } from "hooks/use-disclosure";
import { useToast } from "hooks/use-toast";
import EventCartItem from "modules/cart/components/event-cart-item.ts";
import { useCheckoutInfo } from "modules/checkout/api/checkout";
import { useCreateTrxXendit } from "modules/checkout/api/create-trx-xendit";
import { useListBankXendit } from "modules/checkout/api/list-available-bank";
import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { currencyFormatter } from "utils/helpers/formatter";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Checkout: React.FC<Props> = ({ voucher }) => {
  const { incrementN, decrementC } = useStore();
  const { toast } = useToast();
  const router = useRouter();
  const [bank, setBank] = useState<{
    bankCode: string;
    code: string;
    image: string;
    fee: number;
    intruction: { name: string; panduan: string[] }[];
  }>();
  const bankModal = useDisclosure();

  const {
    data: checkoutInfo,
    refetch,
    isError,
    isFetching,
  } = useCheckoutInfo({
    voucher,
    membership_duration_id: router.query.id as string,
  });

  const listBank = useListBankXendit({});
  const createTrx = useCreateTrxXendit();

  const handleCreateTransaction = () => {
    createTrx
      .mutateAsync({
        total: checkoutInfo?.total_price ?? 0,
        bank_code: bank?.bankCode ?? "014",
        voucher,
        type: checkoutInfo?.items[0]?.type,
        app: "pilearning",
        qty: checkoutInfo?.items[0]?.qty,
        id: checkoutInfo?.items[0]?.content_id,
      })
      .then((res) => {
        decrementC();
        toast({
          title: "Please Wait!",
        });
        incrementN();
        {
          {
            checkoutInfo?.total_price == 0
              ? router.push({
                  pathname: `/transaction/`,
                  query: { order: res.order_id },
                })
              : router.push({
                  pathname: `/checkout/payment`,
                  query: { order: res.order_id },
                });
          }
        }
      })
      .catch((err: AxiosError) => {
        toast({
          title: (err.response?.data as any)?.message ?? "Error",
        });
      });
    toast({
      title: "Process...",
    });
  };

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (listBank?.data && bank === undefined) {
      setBank(listBank?.data[0]);
    }
  }, [listBank, bank]);
  return isFetching ? (
    <div className="my-10 min-h-[550px] text-center"></div>
  ) : isError ? (
    <div className="my-10 min-h-[550px] text-center">Tidak ada data</div>
  ) : (
    <PageBody className="min-h-[550px]">
      <Head>
        <title>Pinvest</title>
      </Head>
      <div className="flex">
        <div className="grid w-full grid-cols-1 items-start md:grid-cols-12 md:flex-row md:flex-wrap md:gap-8">
          <div className="col-span-12 md:col-span-8 lg:col-span-9">
            {checkoutInfo &&
              checkoutInfo.items.map((item: any, index: any) => {
                if (item.type === "event") {
                  return (
                    <EventCartItem
                      className="flex-1 rounded border-none bg-pv-white-light p-5"
                      key={index}
                      cartId={item.id}
                      idEvent={item.data?.event_id ?? 0}
                      description={item.data.description ?? ""}
                      event_title={item.data?.event_title ?? ""}
                      image={item.data.thumbnail_image ?? ""}
                      title={item.data.title ?? ""}
                      price={item.data.price ?? 0}
                      author={item.data.author ?? ""}
                      rate={item.data.rate ?? 0}
                      date={item.data.date ?? ""}
                      qty={item.qty}
                      type={item.type}
                    />
                  );
                } else if (item.type === "membership") {
                  return (
                    <EventCartItem
                      className="flex-1 rounded border-none bg-pv-white-light p-5"
                      key={index}
                      cartId={item.id}
                      idEvent={item.data?.event_id ?? 0}
                      description={item.data.description ?? ""}
                      event_title={item.data?.duration_type ?? ""}
                      image={item.data.thumbnail_image ?? ""}
                      title={item.data.plan_name ?? ""}
                      price={item.data.price ?? 0}
                      author={item.data.author ?? ""}
                      rate={item.data.rate ?? 0}
                      date={item.data.date ?? ""}
                      qty={item.qty}
                      type={item.type}
                    />
                  );
                } else {
                  return (
                    <EventCartItem
                      className="flex-1 rounded border-none bg-pv-white-light p-5"
                      key={index}
                      cartId={item.id}
                      idEvent={item.data?.event_id ?? 0}
                      event_title={item.data?.title ?? ""}
                      description={
                        item.data.description ?? item.data.duration_type ?? ""
                      }
                      image={item.data.image ?? item.data.thumbnail_image ?? ""}
                      title={item.data.title ?? item.data.plan_name ?? ""}
                      price={item.data.price ?? 0}
                      author={item.data.author ?? ""}
                      rate={item.data.rate ?? 0}
                      qty={item.qty}
                      type={item.type}
                    />
                  );
                }
              })}
          </div>

          <div className="col-span-12 w-full p-4 shadow-md md:col-span-4 lg:col-span-3">
            <div className="grid w-full grid-cols-2 text-sm">
              <p>Sub Total</p>
              <p className="text-right">
                {currencyFormatter.format(checkoutInfo?.total_price ?? 0)}
              </p>

              {checkoutInfo?.fee_detail.map((fee: any) => (
                <>
                  <p>{fee.title}:</p>
                  <p className="text-right">
                    {currencyFormatter.format(fee.fee)}
                  </p>
                </>
              ))}

              <p>Diskon:</p>
              <p className="text-right">
                {currencyFormatter.format(checkoutInfo?.discount ?? 0)}
              </p>
              <p>Biaya Transaksi:</p>
              <p className="text-right">
                {currencyFormatter.format(bank?.fee ?? 0)}
              </p>
            </div>

            <p className="mt-4 text-pv-grey-medium2">Total</p>
            <p className="mt-2 text-gray-600 text-[25px]">
              {currencyFormatter.format(
                checkoutInfo?.total_amount + bank?.fee ?? 0
              )}
            </p>

            <Button className="mt-6 w-full" onClick={handleCreateTransaction}>
              Bayar
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-lg bg-pv-white-light p-5">
        <p className="text-xl">Pilih Metode Pembayaran</p>
        <div className="rounded bg-white p-5">
          <div className="flex justify-between">
            <button
              className="flex flex-1 items-center"
              onClick={bankModal.onOpen}
            >
              {bank?.image && (
                <img
                  src={bank?.image}
                  className="mr-8 aspect-video h-10 object-contain"
                  alt={`Logo of ${bank?.code}`}
                />
              )}
              <p>{bank?.code}</p>
            </button>
            <button onClick={bankModal.onOpen}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-chevron-down"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-lg bg-pv-white-light p-5">
        <p className="text-xl">Cara Pembayaran</p>
        <div className="flex flex-col gap-2 rounded p-4">
          {bank?.intruction?.map((item) => (
            <div key={item.name} className="mb-8">
              <Accordion key={item.name} title={item.name}>
                {item.panduan.map((item, i) => (
                  <p className="pl-4" key={item}>
                    {i + 1}. {item}
                  </p>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={bankModal.isOpen} onOpenChange={bankModal.setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Metode Pembayaran</DialogTitle>
            <DialogDescription>
              <ul>
                {listBank.data?.map((bank) => (
                  <li key={bank.bankCode}>
                    <button
                      className="flex w-full items-center py-2 text-left"
                      onClick={() => {
                        setBank(bank);
                        bankModal.onClose();
                      }}
                    >
                      <img
                        src={bank.image}
                        className="mr-4 aspect-video h-10 object-contain"
                        alt={`Logo of ${bank.code}`}
                      />
                      <span>{bank.code}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </PageBody>
  );
};

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const { v } = context.query;
  return {
    props: { voucher: `${v ?? ""}` },
  };
};

export default Checkout;
