import { Rocket, House, Settings, Wallet, Logs, LineChart } from "lucide-react";
import { EditorEdge, EditorNode } from "./types";

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
    description: "Use the power of AI to create a custom worflow for you.",
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

export const initialNodes: EditorNode[] = [
  {
    id: "95ec5471-bf5d-4591-ab93-32794e3b72f5",
    type: "Watch Price",
    position: {
      x: 0,
      y: 0,
    },
    data: {
      title: "Watch Price",
      description: "Default Trigger event that starts the worflow",
      completed: false,
      current: false,
      metadata: {},
      type: "Trigger",
    },
    measured: {
      width: 400,
      height: 120,
    },
  },
  {
    id: "f02e5866-df36-4796-a61d-c9d2f19e8038",
    type: "Condition",
    position: {
      x: 0,
      y: 190,
    },
    data: {
      title: "Condition",
      description: "Boolean operator that creates different conditions lanes.",
      completed: false,
      current: false,
      metadata: {},
      type: "Action",
    },
    measured: {
      width: 400,
      height: 120,
    },
    selected: false,
    dragging: false,
  },
  {
    id: "8d986183-ed6b-47c7-bd6f-9398e4b655ce",
    type: "Buy",
    position: {
      x: -160,
      y: 380,
    },
    data: {
      title: "Buy",
      description: "Buy X amount of stock.",
      completed: false,
      current: false,
      metadata: {},
      type: "Action",
    },
    measured: {
      width: 309,
      height: 100,
    },
    selected: false,
    dragging: false,
  },
  {
    id: "9a398838-2e75-43d0-8c36-a52832d14d8c",
    type: "Sell",
    position: {
      x: 250,
      y: 380,
    },
    data: {
      title: "Sell",
      description: "Sell X amount of stock.",
      completed: false,
      current: false,
      metadata: {},
      type: "Action",
    },
    measured: {
      width: 307,
      height: 100,
    },
    selected: true,
    dragging: false,
  },
];

export const initialEdges: EditorEdge[] = [
  {
    source: "f02e5866-df36-4796-a61d-c9d2f19e8038",
    sourceHandle: "a",
    target: "8d986183-ed6b-47c7-bd6f-9398e4b655ce",
    id: "xy-edge__f02e5866-df36-4796-a61d-c9d2f19e8038a-8d986183-ed6b-47c7-bd6f-9398e4b655ce",
  },
  {
    source: "95ec5471-bf5d-4591-ab93-32794e3b72f5",
    sourceHandle: "a",
    target: "f02e5866-df36-4796-a61d-c9d2f19e8038",
    id: "xy-edge__95ec5471-bf5d-4591-ab93-32794e3b72f5a-f02e5866-df36-4796-a61d-c9d2f19e8038",
  },
  {
    source: "f02e5866-df36-4796-a61d-c9d2f19e8038",
    sourceHandle: "a",
    target: "9a398838-2e75-43d0-8c36-a52832d14d8c",
    id: "xy-edge__f02e5866-df36-4796-a61d-c9d2f19e8038a-9a398838-2e75-43d0-8c36-a52832d14d8c",
  },
];
