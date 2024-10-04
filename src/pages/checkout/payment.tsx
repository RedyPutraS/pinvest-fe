import Accordion from "components/accordion-list";
import Button from "components/button/button";
import PageBody from "components/page/page-body";
import Typo from "components/typo/typo";
import { format, intervalToDuration } from "date-fns";
import { useToast } from "hooks/use-toast";
import { useStatusByOrderId } from "modules/checkout/api/checkout-status-payment";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { currencyFormatter } from "utils/helpers/formatter";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Payment = ({ orderId }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const [countdownDuration, setCountdownDuration] = useState<Duration>();
  const { data } = useStatusByOrderId({ orderId });

  useEffect(() => {
    if (!data?.expired_at) return;
    
    const timer = setInterval(() => {
      const now = new Date();
      const dateString = format(
        Date.parse(data?.expired_at),
        "yyyy-MM-dd HH:mm:ss"
      );
      const date = new Date(dateString);
      const expiredAt = date.getTime();
      const duration = intervalToDuration({ start: now, end: expiredAt });
      setCountdownDuration(duration);
    }, 60);

    return () => clearInterval(timer);
  }, [data]);

  const dateString2 = data?.expired_at ?? ""; // Misalnya "2024-09-26 10:29:35"
  const date2 = new Date(dateString2.replace(" ", "T")); // Mengganti spasi dengan 'T' agar sesuai dengan format ISO
  const expiredAt2 = date2.getTime();
  const now2 = new Date().getTime();

  return (
    <PageBody>
      <Head>
        <title>Pinvest</title>
      </Head>
      <Typo.H5 className="text-center">Selesaikan pembayaran dalam</Typo.H5>
      <p className="mt-4 text-center text-xl font-bold text-pv-orange">
        {
          expiredAt2 < now2 ? (
            <>
              <Typo.H5 className="text-center">Sudah Melewati Batas Akhir</Typo.H5>
            </>
          ) : (
            <>
              {countdownDuration?.hours?.toString().padStart(2, "0")}:
              {countdownDuration?.minutes?.toString().padStart(2, "0")}:
              {countdownDuration?.seconds?.toString().padStart(2, "0")}
            </>
          )
        }
      </p>
      <p className="mt-4 text-center text-sm">Batas Akhir Pembayaran</p>
      <p className="mt-2 text-center">
        {data?.expired_at &&
          format(Date.parse(data?.expired_at), "dd-MM-yyyy HH:mm:ss")}
      </p>

      <div className="m-auto mt-10 rounded-xl border border-pv-grey-medium3 md:w-[683px]">
        <div className="flex items-center justify-between p-4">
          <p className="text-xl">{data?.virtual_account?.channel_code}</p>
          {data?.bank_image && (
            <img
              src={data?.bank_image}
              className="h-10 object-cover"
              alt={`Logo of ${data?.virtual_account?.channel_code}`}
            />
          )}
        </div>

        <hr />

        <div className="p-4">
          <p className="text-sm text-pv-grey-medium2">Nomor Virtual Account</p>
          <div className="flex justify-between">
            <p className="text-xl">
              {
                data?.virtual_account?.channel_properties
                  ?.virtual_account_number
              }
            </p>
            <button
              className="text-xl text-[#00A34B]"
              onClick={async () => {
                try {
                  await navigator.clipboard?.writeText(
                    data?.virtual_account?.channel_properties
                      ?.virtual_account_number ?? ""
                  );
                  toast({
                    title: "Disalin ke papan klip!",
                  });
                } catch (err) {}
              }}
            >
              Salin
            </button>
          </div>

          <p className="mt-10 text-sm text-pv-grey-medium2">Total Pembayaran</p>
          <div className="flex justify-between">
            <p className="text-xl">
              {currencyFormatter?.format(
                parseInt(data?.virtual_account?.amount?.toString() ?? "0")
              )}
            </p>
            <button
              className="text-xl text-[#00A34B]"
              onClick={async () => {
                try {
                  await navigator.clipboard?.writeText(
                    data?.virtual_account?.amount?.toString() ?? "0"
                  );
                  toast({
                    title: "Disalin ke papan klip!",
                  });
                } catch (err) {}
              }}
            >
              Salin
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-5">
      <Button onClick={() => {
        if (data?.order_id) {
          const encodedOrderId = encodeURIComponent(data.order_id);
          router.push(`/transaction/${encodedOrderId}`);
        }
      }}>
        Detail Pembayaran
      </Button>
        <Button onClick={() => router.push("/")}>Kembali ke Homepage</Button>
      </div>

      <div className="mt-10 rounded-lg bg-pv-white-light p-5">
        <p className="text-xl">Cara Pembayaran</p>
        <div className="flex flex-col gap-2 rounded p-4">
          {data?.intruction?.map((item) => (
            <Accordion key={item.name} title={item.name}>
              {item.panduan.map((item, i) => (
                <p className="pl-4" key={item}>
                  {i + 1}. {item}
                </p>
              ))}
            </Accordion>
          ))}
        </div>
      </div>
    </PageBody>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return {
    props: {
      orderId: `${context.query.order}`,
    },
  };
};

export default Payment;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function srttotime(expires_at: string) {
  throw new Error("Function not implemented.");
}
