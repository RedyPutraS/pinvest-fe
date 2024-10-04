import useStore from "app/store";
import Button from "components/button/button";
import Input from "components/input/input";
import PageBody from "components/page/page-body";
import { useToast } from "hooks/use-toast";
import { useVoucherCheck } from "modules/cart/api/check-voucher";
import { useCartList } from "modules/cart/api/list-cart";
import { useMoveToWishlist } from "modules/cart/api/move-to-wishlist";
import { useRemoveFromCart } from "modules/cart/api/remove-cart";
import { useUpdateCart } from "modules/cart/api/update-cart";
import EventCartItem from "modules/cart/components/event-cart-item.ts";
import { useCreateTrx } from "modules/checkout/api/create-trx";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { currencyFormatter } from "utils/helpers/formatter";

const Cart = () => {
  const router = useRouter();
  const [voucher, setVoucher] = useState("");
  const [discount, setDiscount] = useState<null | number>();
  const [voucherApplied, setVoucherApplied] = useState("");
  const [priceAfterDiscount, setPriceAfterDiscount] = useState<null | number>();
  
  const { toast } = useToast();
  const cartList = useCartList();
  

  const removeFromCart = useRemoveFromCart();
  const moveToWishlist = useMoveToWishlist();
  const updateCart = useUpdateCart();
  const checkVoucher = useVoucherCheck();
  const { incrementW } = useStore();

  //*New
  const createTrx = useCreateTrx();

  const [diskon, setDiskon] = useState<null | number>(0);
  // const [priceAfterDiscount, setPriceAfterDiscount] = useState<null | number>(0);

  useEffect(() => {
    sessionStorage.removeItem('checkoutData');
    if (voucherApplied === "" && voucher === "") {
      calculateCartSummary();
      console.log('heelo kids');
    }
  }, [cartList]);

  const calculateCartSummary = () => {
    
    if (cartList?.data?.items) {
      // Hitung total diskon
      const totalDiskon = cartList.data.items.reduce((total: any, item: any) => {
        return total + (item.data?.promo_price || 0);
      }, 0);
      
      // Hitung total harga
      const totalPrice = cartList.data.items.reduce(
        (total: any, item: any) => total + (item.data?.price ?? 0),
        0
      );
      
      // Hitung harga setelah diskon
      setDiskon(totalDiskon);
      const priceAfterDiscount = (totalPrice + cartList.data?.admin_fee) - totalDiskon;
      console.log(priceAfterDiscount, 'calculateCartSummary');
      
      
      setPriceAfterDiscount(priceAfterDiscount);
    }
  };

  // useEffect(() => {
  //   console.log(diskon);
  // }, [diskon]);

  const handleCreateTransaction = () => {
    toast({
      title: "Process...",
    });
    createTrx
      .mutateAsync({
        bank_code: "014",
        voucher: voucherApplied,
        membership_duration_id: "",
      })
      .then((res) => {
        toast({
          title: "Harap tunggu!",
        });
        {
          {
            cartList.data?.items[0]?.data?.price == 0
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
      .catch((e) => {
        console.log(e);
        toast({
          title: "Gagal checkout.",
        });
      });
  };

  const handleCheckVoucher = () => {
    const inputElement = document.getElementById("voucherInput") as HTMLInputElement | null;
  
    if (inputElement) { // Pastikan inputElement tidak null
      const inputVoucher = inputElement.value; // Ambil nilai dari input
      setVoucher(inputVoucher); // Tetap perbarui state jika dibutuhkan
  
      // Gunakan inputVoucher langsung
      checkVoucher
        .mutateAsync({ voucher_number: inputVoucher })
        .then((res) => {
          console.log('Total amount from API:', res.total_amount);
          setVoucherApplied(inputVoucher);
          setVoucher(""); // Kosongkan input setelah digunakan
          setDiscount(res.discount); 
          setPriceAfterDiscount(res.total_amount); 
          console.log('Updated priceAfterDiscount:', res.total_amount);
        })
        .catch((res) => {
          console.log(res);
          toast({
            title: "Voucher tidak valid.",
          });
        });
    } else {
      console.error("Input element not found");
    }
  };

  const handleRemoveFromCart = (id: number) => {
    removeFromCart
      .mutateAsync({ id })
      .then(() => {
        cartList.refetch();
        calculateCartSummary();
      })
      .catch(() => {
        toast({
          title: "Gagal mengeluarkan item dari cart.",
        });
      });
  };

  const handleMoveToWishlist = (id: number, type: string, id_event: number) => {
    moveToWishlist
      .mutateAsync({ id, type, id_event })
      .then(() => {
        incrementW();
        cartList.refetch();
      })
      .catch(() => {
        cartList.refetch();
        incrementW();
        toast({
          title: "Proses memindahkan ke wishlist.",
        });
      });
  };

  const handleQtyChange = (type: string, id: number, qty: number) => {
    updateCart
      .mutateAsync({ type, content_id: id, qty })
      .then(() => {
        cartList.refetch();
      })
      .catch(() => {
        toast({
          title: "Gagal mengupdate quantity.",
        });
      });
  };
  
  const handleCheckout = () => {
    const dataToSend = {
      voucher: voucherApplied,
      subTotal: cartList.data?.items.reduce(
        (total, item) => total + (item.data?.price ?? 0),
        0
      ) ?? 0,
      biayaAdmin: cartList.data?.admin_fee ?? 0,
      hargaPromo: diskon ?? 0,
      diskon: discount ?? 0,
      total: priceAfterDiscount ?? 0, // Contoh data lain
    };

    // Simpan data ke sessionStorage
    sessionStorage.setItem('checkoutData', JSON.stringify(dataToSend));
    
    router.push({
      pathname: `/checkout`,
      query: { ...(voucherApplied ? { v: voucherApplied } : {}) },
    })
    // console.log(dataToSend);
    // Redirect ke halaman checkout
    // router.push('/checkout');
  };

  const newLocal = (items: any[]) => (
    <div>
      {items.map((item) => {
        if (item.type === "event") {
          return (
            <EventCartItem
              className="pt-4"
              key={item.id}
              cartId={item.id}
              idEvent={item.data?.event_id ?? 0}
              description={item.data?.description ?? ""}
              image={item.data?.thumbnail_image ?? ""}
              event_title={item.data?.event_title ?? ""}
              title={item.data?.title ?? ""}
              price={item.data?.price ?? 0}
              author={item.data?.author ?? ""}
              rate={item.data?.rate ?? 0}
              date={item.data?.date ?? ""}
              removeFromCart={handleRemoveFromCart}
              moveToWishlist={handleMoveToWishlist}
              qty={item.qty}
              type={item.type}
              onChangeQty={handleQtyChange}
            />
          );
        } else {
          return (
            <EventCartItem
              className=" pt-4"
              key={item.id}
              cartId={item.id}
              idEvent={0}
              description={item.data?.description ?? ""}
              image={item.data?.image ?? ""}
              event_title={item.data?.title ?? ""}
              title={item.data?.title ?? ""}
              price={item.data?.price ?? 0}
              author={item.data?.author ?? ""}
              rate={item.data?.rate ?? 0}
              removeFromCart={handleRemoveFromCart}
              moveToWishlist={handleMoveToWishlist}
              qty={item.qty}
              type={item.type}
              onChangeQty={handleQtyChange}
            />
          );
        }
      })}
    </div>
  );
  return (
    <PageBody className="min-h-[550px]">
      {cartList.isSuccess && !cartList.data.items.length && (
        <div className="flex justify-center h-full">
          <img
            className="my-auto h-52 md:h-72 xl:h-96 md:w-3/5"
            src="/assets/img/empty-cart.jpg"
            alt=""
          />
        </div>
      )}

      <div className="grid grid-cols-1 items-start xl:grid-cols-12 xl:flex-row xl:flex-wrap xl:gap-8">
        <div className="xl:col-span-9">
          {!cartList.isFetching && newLocal(cartList?.data?.items ?? [])}
          {/* {!cartList.isFetching && newLocal(cartList?.data?.items ?? [])} */}
        </div>

        {cartList.data && cartList.data?.items.length > 0 && (
          <div className="col-span-3 p-4 shadow-md">
            <p className="text-pv-grey-medium2">Sub Total</p>
            <p className="mt-1 text-lg text-gray-600">
              {currencyFormatter.format(
                cartList.data?.items.reduce(
                  (total, item) => total + (item.data?.price ?? 0),
                  0
                ) ?? 0
              )}
            </p>
            <p className="mt-4 text-pv-grey-medium2">Biaya Admin</p>
            <p className="mt-1 text-lg text-gray-600">
              {currencyFormatter.format(cartList.data?.admin_fee ?? 0)}
            </p>
            <p className="mt-4 text-pv-grey-medium2">Harga Promo</p>
            <p className="mt-1 text-lg text-gray-600">
              {currencyFormatter.format(
                diskon ?? 0
              )}
            </p>
            <p className="mt-4 text-pv-grey-medium2">Diskon</p>
            <p className="mt-1 text-lg text-gray-600">
              {currencyFormatter.format(
                discount ?? 0
              )}
            </p>
            <p className="mt-4 text-pv-grey-medium2">Total</p>
            <p className="text-4xl text-gray-600">
              {currencyFormatter.format(
                priceAfterDiscount ?? 0
              )}
            </p>

            <p className="mt-4">Promosi</p>
            {voucherApplied && (
              <p className="text-pv-grey-medium2">
                <button
                  onClick={() => {
                    setVoucherApplied("");
                    setVoucher("");
                    setDiscount(0);
                    calculateCartSummary();
                  }}
                >
                  X
                </button>{" "}
                {voucherApplied}
              </p>
            )}
            <div className="flex gap-4">
              <Input
                id="voucherInput"
              />
              <Button color="red" onClick={handleCheckVoucher}>
                Terapkan
              </Button>
            </div>
            {cartList.data?.total_price === 0 ? (
              <Button className="mt-6 w-full" onClick={handleCreateTransaction}>
                Gratis
              </Button>
            ) : (
              <Button
                className="mt-6 w-full"
                disabled={updateCart.isLoading}
                onClick={handleCheckout}
              >
                Beli
              </Button>
            )}
          </div>
        )}
      </div>
    </PageBody>
  );
};

export default Cart;
