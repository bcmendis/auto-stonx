import React from "react";
import { MenuIcon, Rocket } from "lucide-react";
import Link from "next/link";

type Props = {};

const Navbar = async (props: Props) => {
  return (
    <header className="h-[70px] z-[100] flex items-center justify-between border-b border-slate-300 dark:border-neutral-900 bg-slate-100 dark:bg-black/40 p-4 backdrop-blur-lg">
      <aside className="flex items-center gap-[2px]">
        <Rocket className="h-8 w-8 fill-slate-100 dark:fill-black stroke-orange-500" />
        <p className="text-xl font-bold">autoStonx</p>
      </aside>
      <nav className="absolute left-[50%] top-[50%] hidden translate-x-[-50%] translate-y-[-50%] transform md:block">
        <ul className="flex list-none items-center gap-4">
          <li>
            <Link href={"/"}>Products</Link>
          </li>
          <li>
            <Link href={"/"}>Pricing</Link>
          </li>
          <li>
            <Link href={"/"}>Clients</Link>
          </li>
        </ul>
      </nav>
      <aside className="flex items-center gap-4">
        <Link href={"/"} className="hidden md:block">
        <button className="relative p-[3px]">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-500 to-orange-500" />
          <div className="group relative rounded-[6px] bg-slate-100 text-black dark:bg-black px-8 py-2 dark:text-white font-semibold transition duration-200 hover:bg-transparent hover:text-black">
            Dashboard
          </div>
        </button>
        </Link>
        <MenuIcon className="w-8 h-8 md:hidden"/>
      </aside>
    </header>
  );
};

export default Navbar;
