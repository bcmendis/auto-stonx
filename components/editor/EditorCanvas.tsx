"use client";

import { EditorCanvasCardType, EditorEdge, EditorNode } from "@/lib/types";
import { useEditor } from "@/providers/editor-provider";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Connection,
  Controls,
  Edge,
  EdgeChange,
  MiniMap,
  NodeChange,
  Panel,
  ReactFlow,
  ReactFlowInstance,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import EditorCanvasCardSingle from "./EditorCanvasCardSingle";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import { toast } from "sonner";
import { v4 } from "uuid";
import {
  EditorCanvasDefaultCardTypes,
  initialEdges,
  initialNodes,
} from "@/lib/constants";
import { Loader2 } from "lucide-react";
import FlowInstance from "./FlowInstance";
import EditorCanvasSideBar from "./EditorCanvasSideBar";
import InfoCard from "./InfoCard";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Loader from "../global/Loader";

type Props = {};

// const initialNodes: EditorNode[] = [];
// const initialEdges: EditorEdge[] = [];

const EditorCanvas = (props: Props) => {
  const { state, dispatch } = useEditor();
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [isWorkflowLoading, setIsWorkflowLoading] = useState<boolean>(false);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>();
  const [isWindow, setIsWindow] = useState(false);

  useEffect(() => {
    if (typeof window !== undefined) setIsWindow(true);
  }, []);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      //@ts-ignore
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      //@ts-ignore
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setEdges],
  );

  const onConnect = useCallback((params: Edge | Connection) => {
    //@ts-ignore
    setEdges((eds) => addEdge(params, eds));
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const type: EditorCanvasCardType["type"] = event.dataTransfer.getData(
        "application/reactflow",
      );

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const triggerAlreadyExists = state.editor.elements.find(
        (node) => node.data.type === "Trigger",
      );

      if (
        EditorCanvasDefaultCardTypes[type].type === "Trigger" &&
        triggerAlreadyExists
      ) {
        toast("Only one trigger can be added to an automated workflow");
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      if (!reactFlowInstance) return;
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: v4(),
        type,
        position,
        data: {
          title: type,
          description: EditorCanvasDefaultCardTypes[type].description,
          completed: false,
          current: false,
          metadata: {},
          type: EditorCanvasDefaultCardTypes[type].type,
        },
      };
      //@ts-ignore
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, state],
  );
  const handleClickCanvas = () => {
    dispatch({
      type: "SELECTED_ELEMENT",
      payload: {
        element: {
          data: {
            completed: false,
            current: false,
            description: "",
            metadata: {},
            title: "",
            type: "Trigger",
          },
          id: "",
          position: { x: 0, y: 0 },
          type: "Trigger",
        },
      },
    });
  };

  const handleClickAdd = (type: EditorCanvasCardType["type"]) => {
    const elementsArrayLength = state.editor.elements.length;
    const lastElement = state.editor.elements[elementsArrayLength - 1];

    const position = {
      x: 0,
      y: 0,
    };

    if (lastElement) {
      position.y = lastElement.position.y + 180;
    }

    const newNode = {
      id: v4(),
      type,
      position,
      data: {
        title: type,
        description: EditorCanvasDefaultCardTypes[type].description,
        completed: false,
        current: false,
        metadata: {},
        type: EditorCanvasDefaultCardTypes[type].type,
      },
    };

    const triggerAlreadyExists = state.editor.elements.find(
      (node) => node.data.type === "Trigger",
    );

    if (newNode.data.type === "Trigger" && triggerAlreadyExists) {
      toast("Only one trigger can be added to an automated workflow");
      return;
    } else {
      //@ts-ignore
      setNodes((nds) => nds.concat(newNode));
    }
  };

  useEffect(() => {
    dispatch({ type: "LOAD_DATA", payload: { edges, elements: nodes } });
  }, [nodes, edges, dispatch]);

  const nodeTypes = useMemo(
    () => ({
      "Watch Price": EditorCanvasCardSingle,
      Action: EditorCanvasCardSingle,
      Trigger: EditorCanvasCardSingle,
      Email: EditorCanvasCardSingle,
      Condition: EditorCanvasCardSingle,
      AI: EditorCanvasCardSingle,
      Restart: EditorCanvasCardSingle,
      Wait: EditorCanvasCardSingle,
      Buy: EditorCanvasCardSingle,
      Sell: EditorCanvasCardSingle,
    }),
    [],
  );

  const mainContent = (
    <div className="flex h-full items-center justify-center">
      <div style={{ width: "100%", height: "100%" }} className="relative">
        {isWorkflowLoading ? (
          <div className="absolute flex h-full w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin stroke-orange-500" />
          </div>
        ) : (
          <ReactFlow
            className="w-full"
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodes={state.editor.elements}
            onNodesChange={onNodesChange}
            edges={state.editor.edges}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            fitView
            onClick={handleClickCanvas}
            nodeTypes={nodeTypes}
            proOptions={{ hideAttribution: true }}
          >
            <Controls position="top-left" className="text-black" />
            {isDesktop && (
              <MiniMap
                position="bottom-left"
                className="!bg-background"
                zoomable
                pannable
              />
            )}
            <Background
              //@ts-ignore
              variant="dots"
              gap={12}
              size={1}
            />
            <Panel position="top-right">
              <InfoCard />
            </Panel>
          </ReactFlow>
        )}
      </div>
    </div>
  );

  const sideContent = (
    <div className="flex h-full flex-col overflow-scroll">
      <EditorCanvasSideBar nodes={nodes} onClickAdd={handleClickAdd} />
      <FlowInstance edges={edges} nodes={nodes} />
    </div>
  );

  return (
    <>
      {!isWindow ? (
        <Loader />
      ) : (
        isDesktop && (
          <ResizablePanelGroup direction={"horizontal"}>
            <ResizablePanel defaultSize={70}>{mainContent}</ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={30} minSize={20}>
              {isWorkflowLoading ? <Loader /> : sideContent}
            </ResizablePanel>
          </ResizablePanelGroup>
        )
      )}
      {!isWindow ? (
        <Loader />
      ) : (
        !isDesktop && (
          <ResizablePanelGroup direction={"vertical"}>
            <ResizablePanel defaultSize={60}>{mainContent}</ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={40} minSize={20}>
              {isWorkflowLoading ? <Loader /> : sideContent}
            </ResizablePanel>
          </ResizablePanelGroup>
        )
      )}
    </>
  );
};

export default EditorCanvas;
