import { Rocket, House, Settings, Wallet, Logs, LineChart } from "lucide-react";

export const menuOptions = [
  {
    name: "Dashboard",
    Icon: House,
    href: "/dashboard",
  },
  {
    name: "Portfolio",
    Icon: Rocket,
    href: "/",
  },
  {
    name: "Stocks",
    Icon: LineChart,
    href: "/stocks",
  },
  {
    name: "Settings",
    Icon: Settings,
    href: "/settings",
  },
  {
    name: "Billing",
    Icon: Wallet,
    href: "/billing",
  },
  {
    name: "Logs",
    Icon: Logs,
    href: "/logs",
  },
];
