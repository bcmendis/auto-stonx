"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

import { menuOptions } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

type Props = {};

const Sidebar = (props: Props) => {
  const pathname = usePathname();
  return (
    <nav className="flex h-full flex-col items-center justify-between gap-10 overflow-scroll px-2 py-6 bg-slate-100 dark:bg-black border-r border-slate-300 dark:border-neutral-900">
      <div className="flex flex-col items-center justify-center gap-8">
        <TooltipProvider delayDuration={0}>
          {menuOptions.map((menuItem, index) => (
            <ul key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <li>
                    <div
                      className={cn(
                        "group flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg p-[6px] hover:bg-slate-200 hover:dark:bg-slate-800",
                        {
                          "bg-slate-200 dark:bg-slate-800":
                            pathname === menuItem.href,
                        },
                      )}
                    >
                      <menuItem.Icon
                        className={cn(
                          "stroke-slate-400 group-hover:dark:stroke-white group-hover:stroke-black",
                          {
                            "stroke-orange-500 group-hover:stroke-orange-500":
                              pathname === menuItem.href,
                          },
                        )}
                      />
                    </div>
                  </li>
                </TooltipTrigger>
                <TooltipContent
                  side={"right"}
                  sideOffset={10}
                  className="bg-slate-200/10 dark:bg-black/10 backdrop-blur-xl"
                >
                  <p>{menuItem.name}</p>
                </TooltipContent>
              </Tooltip>
            </ul>
          ))}
        </TooltipProvider>
        <Separator />
      </div>
      <div className="flex items-center justify-center flex-col gap-8">
          <ThemeToggle />
      </div>
    </nav>
  );
};

export default Sidebar;
