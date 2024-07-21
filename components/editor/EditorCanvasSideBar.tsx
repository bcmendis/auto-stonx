"use client";

import {
  EditorCanvasCardType,
  EditorCanvasTypes,
  EditorNode,
} from "@/lib/types";
import { useEditor } from "@/providers/editor-provider";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "../ui/separator";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import EditorCanvasCardIconHelper from "./EditorCanvasCardIconHelper";
import { EditorCanvasDefaultCardTypes } from "@/lib/constants";
import { onDragStart } from "@/lib/editor-utils";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
  nodes: EditorNode[];
  onClickAdd: (
    type: EditorCanvasCardType["type"],
    position: { x: number; y: number },
  ) => void;
};

const EditorCanvasSideBar = ({ nodes, onClickAdd }: Props) => {
  const { state, dispatch } = useEditor();
  const handleCardAdd = (type: EditorCanvasTypes) => {
    const position = { x: 0, y: 0 }; // Example position, you might want to get this dynamically
    onClickAdd(type, position);
  };
  return (
    <aside>
      <Tabs defaultValue="actions" className="overflow-scroll md:h-[80vh]">
        <TabsList className="bg-transparent">
          <TabsTrigger value="actions">Actions</TabsTrigger>
          {/* <TabsTrigger value="settings">Settings</TabsTrigger> */}
        </TabsList>
        <Separator />
        <TabsContent value="actions" className="flex flex-col gap-4 p-4">
          {Object.entries(EditorCanvasDefaultCardTypes)
            .filter(
              ([_, cardType]) =>
                (!nodes.length && cardType.type === "Trigger") ||
                (nodes.length && cardType.type === "Action"),
            )
            .map(([cardKey, cardValue]) => (
              <Card
                key={cardKey}
                draggable
                className="w-full cursor-grab border-black bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900"
                onDragStart={(event) =>
                  onDragStart(event, cardKey as EditorCanvasTypes)
                }
              >
                <CardHeader className="flex flex-row items-center justify-between gap-4 p-4">
                  <EditorCanvasCardIconHelper
                    type={cardKey as EditorCanvasTypes}
                  />
                  <CardTitle className="text-md text-center sm:text-left flex w-full flex-1 flex-col items-center sm:items-start">
                    {cardKey}
                    <CardDescription>{cardValue.description}</CardDescription>
                  </CardTitle>
                  <Button
                    variant={"ghost"}
                    className="p-0 m-0"
                    onClick={() => handleCardAdd(cardKey as EditorCanvasTypes)}
                  >
                    <Plus className="min-h-6 min-w-6" />
                  </Button>
                </CardHeader>
              </Card>
            ))}
        </TabsContent>
        <TabsContent value="settings" className="flex flex-col gap-4 p-4">
          Change your password here.
        </TabsContent>
      </Tabs>
    </aside>
  );
};

export default EditorCanvasSideBar;
