import { QueryClient, dehydrate } from "@tanstack/react-query";
import PageBody from "components/page/page-body";
import { format, parse, parseISO } from "date-fns";
import { useTransactionDetail } from "modules/transaction/transaction";
import type { InferGetServerSidePropsType } from "next";
import { currencyFormatter } from "utils/helpers/formatter";
import { id as localeId } from "date-fns/locale";
import Button from "components/button/button";
import { transactionFilter } from "utils/constants";
import { cn } from "utils";
import ReactStars from "react-stars";
import { downloadTicket } from "modules/transaction/download-ticket";
import { useRouter } from "next/router";
import AccordionTransaksi from "components/accordion-list/accordion-transaksi";
import RenderHtml from "components/render-html";
type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
const Index = ({ params }: Props) => {
  const router = useRouter();
  const { data } = useTransactionDetail(params);

  return (
    <PageBody>
      <div className="bg-pv-white-light p-6 xl:mb-8">
        <h1 className="border-b-2 pb-2 text-2xl font-semibold">
          Detail Transaksi
        </h1>
        <div className="flex flex-col justify-between pt-6 text-sm font-medium xl:flex-row xl:text-xl">
          <div className="text-pv-grey-medium2">Status</div>
          <span
            className={cn(
              "",
              `text-[${transactionFilter().getColor(data?.payment_progress)}]`
            )}
          >
            {transactionFilter().getName(data?.payment_progress)}
          </span>
        </div>
        <div className="flex flex-col justify-between pt-6 text-sm font-medium xl:flex-row xl:text-xl">
          <div className="text-pv-grey-medium2">No. Order</div>
          <div>{data?.order_id}</div>
        </div>
        <div className="flex flex-col justify-between pt-6 text-sm font-medium xl:flex-row xl:py-6 xl:text-xl">
          <div className="text-pv-grey-medium2">Tanggal Transaksi</div>
          <div>
            {data?.created_at &&
              format(parseISO(data?.created_at), "iiii, dd MMMM yyyy", {
                locale: localeId,
              })}
          </div>
        </div>
      </div>
      <div className="bg-pv-white-light p-6 xl:mb-8">
        <h1 className="border-b-2 pb-2 text-2xl font-semibold">
          Detail Pembelian
        </h1>
        {data?.detail_transaction?.map((detail, di) => (
          <div key={di}>
            <div className="mb-2 mt-4 flex flex-col xl:flex-row">
              <div className="grid grid-cols-3 gap-2 xl:flex xl:flex-grow">
                <div className="xl:mr-4">
                  <img
                    src={
                      detail?.product.image ?? detail?.product?.thumbnail_image
                    }
                    alt=""
                    className="rounded-lg object-fill xl:h-36"
                  />
                </div>
                <div className="col-span-2 flex flex-col xl:mr-4">
                  {detail.transaction_type !== "membership" ? (
                    <>
                      <p className="text-base font-semibold xl:text-2xl">
                        {detail?.product.event_title}
                      </p>
                      <p className="font-normal">
                        <RenderHtml
                          className="pv-desc w-[200px] line-clamp-2 xl:text-lg"
                          html={detail?.product?.description}
                        />
                      </p>
                    </>
                  ) : (
                    <h1 className="font-semibold xl:text-lg">
                      <p className="font-normal">Duration :</p>
                      {detail?.product.duration}
                    </h1>
                  )}

                  {detail.transaction_type == "membership" ? (
                    <h1 className="font-semibold xl:text-lg">
                      <p className="font-normal">Plan Keanggotaan :</p>
                      {detail?.product.plan_name}
                    </h1>
                  ) : (
                    <div></div>
                  )}

                  {detail.transaction_type == "membership" ? (
                    <h1 className="font-semibold xl:text-lg">
                      <p className="font-normal">type :</p>
                      {detail?.product.duration_type}
                    </h1>
                  ) : (
                    <div></div>
                  )}

                  {detail?.product.rate != 0 ?? (
                    <div className="flex items-center font-medium">
                      <span className="mr-2">Rating</span>
                      <ReactStars
                        size={20}
                        color1="#BFBFBF"
                        color2="#F68500"
                        value={detail?.product.rate}
                        edit={false}
                      />
                      <span className="ml-2">
                        ({detail?.product.rating_count})
                      </span>
                    </div>
                  )}
                  {detail.product.date != null ?? (
                    <div className="mb-3 mt-2 flex items-center text-[14px] font-medium text-pv-grey-medium3">
                      <div className="mr-4 flex">
                        <img
                          src="/assets/icon/calendar.svg"
                          alt=""
                          className="mr-2"
                        />
                        <div className="text-[10px] xl:text-base">
                          {detail.product.date &&
                            format(
                              parse(
                                detail.product.date,
                                "yyyy-MM-dd",
                                new Date()
                              ),
                              "iiii, dd MMMM yyyy",
                              { locale: localeId }
                            )}
                        </div>
                      </div>
                      <div className="flex">
                        <img
                          src="/assets/icon/alarm.svg"
                          alt=""
                          className="mr-2"
                        />
                        <div className="text-[10px] xl:text-base">
                          {detail.product.start_time} -{" "}
                          {detail.product.end_time}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col border-t-2 pt-2 xl:w-1/4 xl:justify-center xl:border-l-2 xl:border-t-0 xl:p-6">
                <p className="text-sm font-bold text-pv-grey-medium2">
                  Total Transaksi
                </p>
                <p className="text-lg font-bold">
                  {(detail?.price ?? "0.00") == "0.00" ? (
                    <div className="text-pv-blue-lighter">Gratis</div>
                  ) : (
                    currencyFormatter.format(parseInt(detail?.price ?? "0"))
                  )}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded p-4">
              {detail?.ticket_pass_item?.length !== 0 ? (
                <AccordionTransaksi title={detail?.product?.title ?? "null"}>
                  {detail.online_course_id !== null ? (
                    <span className="my-2 grid grid-flow-row-dense hover:text-xl xl:grid-cols-1">
                      <span className="self-center py-2 text-end">
                        <Button
                          onClick={() =>
                            router.push(
                              `/pi-learning/onlinecourse/watch/${detail.online_course_id}`
                            )
                          }
                          size="s"
                          className="text-sm font-normal xl:text-base"
                        >
                          Tonton Video
                        </Button>
                      </span>
                    </span>
                  ) : (
                    ""
                  )}
                  {detail?.ticket_pass_item?.map((item) => (
                    <h1
                      className="text-lg font-medium xl:font-semibold"
                      key={item.title}
                    >
                      <span className="my-2 grid grid-flow-row-dense hover:text-xl xl:grid-cols-4">
                        <p className="self-center">{item.title}</p>
                        <p className="self-center">
                          {item.date &&
                            format(
                              parse(item.date, "yyyy-MM-dd", new Date()),
                              "iiii, dd MMMM yyyy",
                              { locale: localeId }
                            )}
                        </p>
                        <p className="self-center">
                          {item.start_time} - {item.end_time}
                        </p>
                        <span className="self-center py-2 text-right">
                          {detail.transaction_type == "membership" ? (
                            <span></span>
                          ) : detail.transaction_type == "event" &&
                            detail.online == true ? (
                            <Button
                              onClick={() => {
                                window.open(item?.url_meeting ?? "", "_blank");
                              }}
                              size="s"
                              className="text-sm font-normal xl:text-base"
                            >
                              Gabung Sekarang
                            </Button>
                          ) : (
                            <Button
                              size="s"
                              onClick={() =>
                                downloadTicket(
                                  detail.id,
                                  `E-Ticket ${data.order_id}`
                                )
                              }
                              className="text-sm font-normal xl:text-base"
                            >
                              Unduh Tiket
                            </Button>
                          )}
                        </span>
                      </span>
                    </h1>
                  ))}
                  {detail?.content_exclusive &&
                    detail?.content_exclusive.map((item: any) => (
                      <div key={item.id} className="my-8 flex gap-4">
                        <img
                          src={item.product.image}
                          alt=""
                          className="h-48 w-72 rounded-lg bg-pv-blue-lighter object-contain"
                        />
                        <div className="flex-1">
                          <div className="text-xl font-semibold">
                            {item.product.title}
                          </div>

                          <RenderHtml
                            html={item.product.description.substring(0, 1000)}
                          />
                        </div>
                        <div className="flex flex-col border-t-2 pt-2 xl:w-1/4 xl:justify-center xl:border-l-2 xl:border-t-0 xl:p-6">
                          <p className="text-sm font-bold text-pv-grey-medium2">
                            Total Transaksi
                          </p>
                          <p className="mb-4 text-lg font-bold">
                            {(item?.price ?? "0.00") == "0.00" ? (
                              <div className="text-pv-blue-lighter">Gratis</div>
                            ) : (
                              currencyFormatter.format(
                                parseInt(item?.price ?? "0")
                              )
                            )}
                          </p>
                          {item.transaction_type == "online-course" && (
                            <Button
                              onClick={() =>
                                router.push(
                                  `/pi-learning/onlinecourse/watch/${item.online_course_id}`
                                )
                              }
                              size="s"
                              className="text-sm font-normal xl:text-base"
                            >
                              Tonton Video
                            </Button>
                          )}
                          {item.transaction_type == "event" && (
                            <Button
                              size="s"
                              onClick={() =>
                                downloadTicket(
                                  item.id,
                                  `E-Ticket ${data.order_id}`
                                )
                              }
                              className="text-sm font-normal xl:text-base"
                            >
                              Unduh Tiket
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                </AccordionTransaksi>
              ) : (
                <div className=" py-2 text-right">
                  {detail.online_course_id !== null ? (
                    <Button
                      onClick={() =>
                        router.push(
                          `/pi-learning/onlinecourse/watch/${detail.online_course_id}`
                        )
                      }
                      size="s"
                      className="text-sm font-normal xl:text-base"
                    >
                      Tonton Video
                    </Button>
                  ) : detail.transaction_type == "membership" ? (
                    <span></span>
                  ) : detail.online ? (
                    <Button
                      onClick={() => {
                        window.open(detail.url_meeting ?? "", "_blank");
                      }}
                      size="s"
                      className="text-sm font-normal xl:text-base"
                    >
                      Gabung Sekarang
                    </Button>
                  ) : (
                    <Button
                      size="s"
                      onClick={() =>
                        downloadTicket(detail.id, `E-Ticket ${data.order_id}`)
                      }
                      className="text-sm font-normal xl:text-base"
                    >
                      Unduh Tiket
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mb-8 bg-pv-white-light p-6">
        <h1 className="border-b-2 pb-2 text-2xl font-semibold">
          Rincian Pembayaran
        </h1>
        <div className="flex flex-col justify-between border-b-2 pb-3 pt-6 font-medium text-pv-grey-medium3 xl:flex-row">
          <div>Metode Pembayaran</div>
          <div>{data?.payment_method}</div>
        </div>
        <div className="flex flex-col justify-between border-b-2 pb-3 pt-6 font-medium text-pv-grey-medium3 xl:flex-row">
          <div>Total Harga</div>
          <div>{currencyFormatter.format(parseInt(data?.price ?? "0"))}</div>
        </div>
        <div className="flex flex-col justify-between border-b-2 pb-3 pt-6 font-medium text-pv-grey-medium3 xl:flex-row">
          <div>Biaya Transaksi</div>
          <div>
            {currencyFormatter.format(
              parseInt(data?.total_fee.toString() ?? "0")
            )}
          </div>
        </div>
        <div className="flex flex-col justify-between border-b-2 pb-3 pt-6 font-medium text-pv-grey-medium3 xl:flex-row">
          <div>Biaya Admin</div>
          <div>
            {currencyFormatter.format(parseInt(data?.fee_pg.toString() ?? "0"))}
          </div>
        </div>
        <div className="flex flex-col justify-between py-6 text-xl font-medium xl:flex-row">
          <div>Total Belanja</div>
          <div>
            {currencyFormatter.format(parseInt(data?.total_amount ?? "0"))}
          </div>
        </div>
      </div>
    </PageBody>
  );
};
export const getServerSideProps = async (context: {
  query: { id: string };
}) => {
  const { id } = context.query;
  const queryClient = new QueryClient();
  const params = { id };
  const prefetch = useTransactionDetail.prefetch(queryClient, params);
  await prefetch;
  return {
    props: {
      params,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
export default Index;
