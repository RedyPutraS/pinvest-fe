/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import Anchor from "../anchor/anchor";
import Button from "../button/button";
import Drawer from "../drawer/drawer";
import { useAuthStore } from "hooks/use-auth-store";
import { useEffect, useState } from "react";
import { useNotifications } from "modules/notification/notification";
import { cn } from "utils";
import { useAccount } from "modules/auth/api/account";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import AccountMenu from "./account-menu";
import MiniProfile from "./mini-profile";
import { useCartList } from "modules/cart/api/list-cart";
import { useWishlistCount } from "modules/wishlist/api/wishlist-count";
import Input from "components/input/input";
import { useRouter } from "next/router";
import { useRef } from "react";
import useStore from "app/store";
type Props = {
  onSearch: (text: string) => void;
};
export default function Header({ onSearch }: Props) {
  const account = useAccount();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = useAuthStore();
  const [openSearch, toggleSearch] = useState<boolean>(false);
  const { wishlistW, notifikasiN, cartC } = useStore();
  const { data: cart, refetch: reCart } = useCartList();
  const { data: wishlist, refetch: reWish } = useWishlistCount();
  const { data, refetch: reNo } = useNotifications({ limit: 1000 });

  useEffect(() => {
    if (auth.user) {
      reWish();
      reNo();
    }
    return () => {};
  }, []);

  useEffect(() => {
    if (auth.user) {
      reCart();
    }
    return () => {};
  }, [cartC]);

  useEffect(() => {
    if (auth.user) {
      reWish();
    }
    return () => {};
  }, [wishlistW]);

  useEffect(() => {
    if (auth.user) {
      reNo();
    }
    return () => {};
  }, [notifikasiN]);

  const textLinks = [
    {
      label: "Webinar",
      href: "/pi-learning/webinar",
    },
    {
      label: "Acara",
      href: "/pi-event?category=all",
    },
    {
      label: "Collabs",
      href: "/collabs-with-us",
    },
  ];

  useEffect(() => {
    if (auth.user) {
      account.refetch();
      return setIsLoggedIn(true);
    } else {
      auth.setToken("");
    }
    return setIsLoggedIn(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user]);
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputRef = useRef<any>();
  useEffect(() => {
    inputRef.current.value = "";
  }, [router?.asPath]);

  const unreadCount = data?.filter((item) => !item.is_read).length ?? 0;
  const cartCount = cart?.items.length ?? 0;
  const wishlistCount = wishlist?.length ?? 0;
  const onLogout = () => {
    auth.setToken("");
    auth.logout();
    if (
      ["/cart", "/wishlist", "/notification", "profile"].includes(
        router.pathname
      )
    ) {
      router.replace("/");
    }
  };
  return (
    <div className="sticky top-0 z-50 flex h-[100px]w-full items-center justify-center bg-white shadow-md xl:h-[80px]">
      <div className="ms-3">
        <Link href="/">
          <img
            src="/assets/img/pinvest-logo.png"
            alt="pinvest-logo"
            className="h-14 w-auto cursor-pointer hover:opacity-80 xl:ml-14 xl:h-14"
            style={{ objectFit: 'contain' }}
          />
        </Link>
      </div>
      {openSearch ? (
        <div className={cn("px-3 py-2 ", openSearch ? "block" : "hidden")}>
          <Input
            placeholder="Search"
            name="searchbar"
            classNameContainer="bg-pv-grey-light1 hover:bg-pv-white-pure border rounded-full"
            className="bg-inherit text-[16px] placeholder:font-light"
            preInput={
              <img
                src="/assets/icon/magnify.svg"
                alt="search icon"
                className="mr-2 "
              />
            }
            ref={inputRef}
            onChange={(e) => onSearch(e.target.value)}
            onBlur={() => toggleSearch(false)}
            suffix={
              <>
              {/* <img
                src="/assets/icon/close.svg"
                className="h-6 w-6 mr-2 md:mr-0"
                onClick={() => toggleSearch(false)}
                alt={"close icon"}
              /> */}
              <img
                src="/assets/icon/close.svg"
                className="icon"
                onClick={() => toggleSearch(false)}
                alt="close icon"
              />
              <style jsx>{`
                .icon {
                  height: 1.5rem; // h-6
                  width: 1.5rem; // w-6
                  margin-right: 0.5rem; // mr-2
                }

                @media (min-width: 640px) {
                  .icon {
                    margin-right: 0; // md:mr-0
                  }
                }

                @media (max-width: 360px) {
                  /* Atur margin untuk layar lebih kecil dari sm */
                  .icon {
                    margin-right: 40px; // Custom margin for screens below sm
                  }
                }
              `}</style>
              </>
            }
          />
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-end px-3 py-2 xl:max-w-[1440px] ">
          <div className="hidden md:block md:w-3/5 lg:mx-4 xl:flex 2xl:mx-16">
            <Input
              placeholder="Cari"
              name="searchbar"
              classNameContainer="bg-pv-grey-light1 hover:bg-pv-white-pure border rounded-full"
              className="bg-inherit text-[16px] placeholder:font-light mx-auto"
              preInput={
                <img
                  src="/assets/icon/magnify.svg"
                  alt="search icon"
                  className="mr-2"
                />
              }
              ref={inputRef}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
          <div className="block flex-grow md:hidden"></div>
          <div className="md:hidden" onClick={() => toggleSearch(true)}>
            <img
              src="/assets/icon/magnify.svg"
              alt="search icon"
              className={cn(
                "mr-2 cursor-pointer",
                openSearch ? "hidden" : "block"
              )}
            />
          </div>
          <div className="hidden text-gray-700 xl:flex">
            {textLinks.map((textLink, index) => {
              return (
                <Link
                  href={textLink.href}
                  key={index}
                  className="mx-3 hover:opacity-50"
                >
                  <Anchor>{textLink.label}</Anchor>
                </Link>
              );
            })}
          </div>
          {isLoggedIn && (
            <div className="flex">
              <Link href="/cart" className="hover:opacity-50">
                <div className="px-3">
                  <div className="relative">
                    <img src="/assets/icon/cart.svg" alt="cart" />
                    <div
                      className={cn(
                        "absolute right-0 top-0 h-4 w-4 rounded-full bg-pv-blue-light",
                        cartCount > 0 ? "block" : "hidden"
                      )}
                    >
                      <div className={cn("text-center text-xs text-white")}>
                        {cartCount}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              <Link href="/wishlist" className="hover:opacity-50">
                <div className="px-3">
                  <div className="relative">
                    <img src="/assets/icon/heart.svg" alt="wishlist" />
                    <div
                      className={cn(
                        "absolute right-0 top-0 h-4 w-4 rounded-full bg-pv-blue-light",
                        wishlistCount > 0 ? "block" : "hidden"
                      )}
                    >
                      <div className={cn("text-center text-xs text-white")}>
                        {wishlistCount}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              <Link href="/notification" className="hover:opacity-50">
                <div className="px-3">
                  <div className="relative">
                    <img
                      src="/assets/icon/notification.svg"
                      alt="Notification"
                    />
                    <div
                      className={cn(
                        "absolute right-0 top-0 h-4 w-4 rounded-full bg-pv-blue-light",
                        unreadCount > 0 ? "block" : "hidden"
                      )}
                    >
                      <div className={cn("text-center text-xs text-white")}>
                        {unreadCount}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}
          <div className="hidden gap-4 p-4 text-gray-600 xl:flex">
            {isLoggedIn ? (
              <Popover>
                <PopoverTrigger>
                  <MiniProfile
                    name={`${account.data?.first_name} ${account.data?.last_name ?? '' }`}
                    profilePicture={account.data?.profile_picture ?? ""}
                  />
                </PopoverTrigger>
                <PopoverContent className="rounded bg-white p-4 shadow-xl">
                  <AccountMenu
                    profilePicture={account.data?.profile_picture ?? ""}
                    logout={onLogout}
                  />
                </PopoverContent>
              </Popover>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="solid" className="w-[140px]">
                    <span className="font-light">Masuk</span>
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="outlined" className="w-[140px]">
                    Daftar
                  </Button>
                </Link>
              </>
            )}
          </div>
          <div className="block text-gray-600 xl:hidden">
            <Drawer>
              {isLoggedIn && (
                <Link href="/profile">
                  <Anchor>
                    <div className="flex items-center">
                      <img
                        src={account.data?.profile_picture ?? ""}
                        alt="Profile Picture"
                        className="aspect-square h-10 overflow-hidden rounded object-cover"
                      />
                      <div className="ml-4">{account.data?.first_name}</div>
                    </div>
                  </Anchor>
                </Link>
              )}
              {textLinks.map((textLink, index) => {
                return (
                  <Link href={textLink.href} key={index}>
                    <Anchor>{textLink.label}</Anchor>
                  </Link>
                );
              })}
              {isLoggedIn && (
                <>
                  <Link href="/transaction">
                    <Anchor>Transaksi</Anchor>
                  </Link>
                  <Link href="/my-activity">
                    <Anchor>Aktivitas Saya</Anchor>
                  </Link>
                  <Button
                    className="hover:darken flex items-center hover:bg-pv-red hover:text-white hover:brightness-75"
                    color="red"
                    onClick={() => {
                      router.push("/auth/login");
                      return onLogout();
                    }}
                  >
                    <img src="/assets/icon/logout.svg" alt="logout icon" />
                    <span className="ml-2">Keluar</span>
                  </Button>
                </>
              )}
              {isLoggedIn ? (
                <div className="flex flex-col gap-4">
                  {/* <AccountMenu
                    profilePicture={account.data?.profile_picture ?? ""}
                    logout={onLogout}
                  /> */}
                </div>
              ) : (
                <>
                  <Link href="/auth/login">
                    <Button variant="primarySolid">Login</Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button variant="primaryOutlined">Sign Up</Button>
                  </Link>
                </>
              )}
            </Drawer>
          </div>
        </div>
      )}
    </div>
  );
}
