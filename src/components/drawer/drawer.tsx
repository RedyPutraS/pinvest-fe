import React, { useState } from "react";
import type { ReactNode } from "react";
interface DrawerProps {
  children?: ReactNode;
}
export default function Drawer(props: DrawerProps) {
  const { children } = props;
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <>
        <img
          src="/assets/icon/list.svg"
          alt="burger menu"
          onClick={() => setDrawerOpen(true)}
        />
      </>

      <div
        className={` duration-250 fixed top-0 left-0 h-screen w-screen bg-slate-700 transition-all ease-in-out ${
          drawerOpen ? `scale-x-100 bg-opacity-60 ` : `scale-x-0 bg-opacity-0 `
        }`}
        onClick={() => setDrawerOpen(false)}
      />

      <div
        className={`fixed  top-0 right-0 z-[10] flex h-screen w-[315px] transform flex-col items-end gap-6 bg-white p-6  shadow-md transition-all duration-500 ease-in-out  ${
          drawerOpen
            ? `scale-x-full translate-x-0 `
            : `translate-x-full scale-x-0 `
        } slide `}
      >
        <img
          src="/assets/icon/close.svg"
          className="h-10 w-10 "
          onClick={() => setDrawerOpen(false)}
          alt={"close icon"}
        />

        {children}
      </div>
    </>
  );
}
