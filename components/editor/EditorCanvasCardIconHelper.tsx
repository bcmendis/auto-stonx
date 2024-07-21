"use client";
import React from "react";
import {
  CircuitBoard,
  MousePointerClickIcon,
  RotateCcw,
  Timer,
  Zap,
  Eye,
  Wallet,
  Handshake,
  Split,
} from "lucide-react";
import { EditorCanvasTypes } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = { type: string; className?: string };

const EditorCanvasCardIconHelper = ({ type, className }: Props) => {
  switch (type) {
    case "Watch Price":
      return <Eye className={cn("flex-shrink-0", className)} size={30} />;
    case "Condition":
      return <Split className={cn("flex-shrink-0 rotate-180", className)} size={30} />;
    case "AI":
      return <CircuitBoard className={cn("flex-shrink-0", className)} size={30} />;
    case "Restart":
      return <RotateCcw className={cn("flex-shrink-0", className)} size={30} />;
    case "Trigger":
      return <MousePointerClickIcon className={cn("flex-shrink-0", className)} size={30} />;
    case "Action":
      return <Zap className={cn("flex-shrink-0", className)} size={30} />;
    case "Wait":
      return <Timer className={cn("flex-shrink-0", className)} size={30} />;
    case "Buy":
      return <Wallet className={cn("flex-shrink-0", className)} size={30} />;
    case "Sell":
      return <Handshake className={cn("flex-shrink-0", className)} size={30} />;
    default:
      return <Zap className={cn("flex-shrink-0", className)} size={30} />;
  }
};

export default EditorCanvasCardIconHelper;
