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

export const EditorCanvasDefaultCardTypes = {
  "Watch Price": {
    description: "Default Trigger event that starts the worflow",
    type: "Trigger",
  },
  Trigger: {
    description:
      "An advanced Trigger event that starts the workflow. Configure in settings.",
    type: "Trigger",
  },
  AI: {
    description:
      "Use the power of AI to create a custom worflow for you.",
    type: "Trigger",
  },
  Condition: {
    description: "Boolean operator that creates different conditions lanes.",
    type: "Action",
  },
  Buy: {
    description: "Buy X amount of stock.",
    type: "Action",
  },
  Sell: {
    description: "Sell X amount of stock.",
    type: "Action",
  },
  Restart: {
    description: "Restart workflow",
    type: "Action",
  },
  Action: {
    description: "An event that happens after the workflow begins",
    type: "Action",
  },
  Wait: {
    description: "Delay the next action step by using the wait timer.",
    type: "Action",
  },
};
