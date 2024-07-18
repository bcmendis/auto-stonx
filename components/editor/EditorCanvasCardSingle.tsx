"use client";

import { EditorCanvasCardType } from "@/lib/types";
import { useEditor } from "@/providers/editor-provider";
import { Position, useNodeId } from "@xyflow/react";
import React, { useEffect, useMemo, useState } from "react";
import EditorCanvasCardIconHelper from "./EditorCanvasCardIconHelper";
import CustomHandle from "./CustomHandle";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

type Props = {};

const EditorCanvasCardSingle = ({ data }: { data: EditorCanvasCardType }) => {
  const { state, dispatch } = useEditor();

  const [isConnected, setIsConnected] = useState(false);
  const [isPartiallyConnected, setIsPartiallyConnected] = useState(false);

  const nodeId = useNodeId();

  const currentNode = state.editor.elements.find((el) => el.id === nodeId);
  const isSelected = nodeId === state.editor.selectedNode.id ? true : false;

  useEffect(() => {
    const isPresent = !!currentNode;
    const sourceNode = state.editor.edges.find((el) => el.source === nodeId);
    const targetNode = state.editor.edges.find((el) => el.target === nodeId);
    const isSourceAndTargetNode =
      currentNode?.data.title === "Condition" ||
      currentNode?.data.title === "Wait" ||
      currentNode?.data.title === "Action";
    const hasTarget = !!state.editor.edges.find((el) => el.source === nodeId)
      ?.target;
    const hasSource = !!state.editor.edges.find((el) => el.target === nodeId)
      ?.source;

    // console.log(
    //   "NodeId: ",
    //   nodeId,
    //   "isSourceAndTargetNode: ",
    //   isSourceAndTargetNode,
    //   "hasSource & hasTarget: ",
    //   hasSource && hasTarget,
    //   "hasSource | hasTarget: ",
    //   hasSource || hasTarget,
    //   "!isSourceAndTargetNode: ",
    //   !isSourceAndTargetNode,
    //   "(!!sourceNode && !hasTarget) || (!!targetNode && !hasSource)",
    //   (!!sourceNode && !hasTarget) || (!!targetNode && !hasSource),
    //   "(!!sourceNode && hasTarget) || (!!targetNode && hasSource)",
    //   (!!sourceNode && hasTarget) || (!!targetNode && hasSource),
    //   "isConnected: ",
    //   isConnected,
    //   "ispartiallyConnected: ",
    //   isPartiallyConnected,
    // );
    if (isPresent) {
      if (isSourceAndTargetNode) {
        if (hasSource && hasTarget) setIsConnected(true);
        else if (hasSource || hasTarget) {
          setIsConnected(false);
          setIsPartiallyConnected(true);
        } else {
          setIsPartiallyConnected(false);
          setIsConnected(false);
        }
      } else if (!isSourceAndTargetNode) {
        if ((!!sourceNode && !hasTarget) || (!!targetNode && !hasSource))
          setIsPartiallyConnected(true);
        else if ((!!sourceNode && hasTarget) || (!!targetNode && hasSource))
          setIsConnected(true);
        else setIsConnected(false);
      }
    }
  }, [nodeId, state, currentNode]);
  console.log("State: ", state);

  const logo = useMemo(() => {
    return <EditorCanvasCardIconHelper type={data.type} />;
  }, [data]);

  return (
    <>
      {data.type !== "Trigger" &&
        data.type !== "Watch Price" &&
        data.type !== "AI" && (
          <CustomHandle
            type="target"
            position={Position.Top}
            style={{ zIndex: 100 }}
          />
        )}
      <Card
        onClick={(e) => {
          e.stopPropagation();
          const val = state.editor.elements.find((n) => n.id === nodeId);
          if (val)
            dispatch({
              type: "SELECTED_ELEMENT",
              payload: {
                element: val,
              },
            });
        }}
        className={cn(
          "relative max-w-[400px]",
          isSelected ? "border-white" : "dark:border-muted-foreground/70",
        )}
      >
        <CardHeader className="flex flex-row items-center gap-4">
          <div>{logo}</div>
          <div>
            <CardTitle className="text-md">{data.title}</CardTitle>
            <CardDescription>
              {/* <p className="text-xs text-muted-foreground/50">
                <b className="text-muted-foreground/80">ID: </b>
                {nodeId}
              </p> */}
              <span>{data.description}</span>
            </CardDescription>
          </div>
        </CardHeader>
        <Badge variant="secondary" className="absolute right-2 top-2">
          {data.type}
        </Badge>
        <div
          className={cn("absolute left-3 top-4 h-2 w-2 rounded-full", {
            "bg-red-500": !isConnected,
            "bg-orange-500": isPartiallyConnected,
            "bg-green-500": isConnected,
          })}
        ></div>
      </Card>
      {data.type !== "Buy" &&
        data.type !== "Sell" &&
        data.type !== "Restart" && (
          <CustomHandle type="source" position={Position.Bottom} id="a" />
        )}
    </>
  );
};

export default EditorCanvasCardSingle;
