"use client";

import { EditorCanvasTypes, EditorNode } from "@/lib/types";
import { useEditor } from "@/providers/editor-provider";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "../ui/separator";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import EditorCanvasCardIconHelper from "./EditorCanvasCardIconHelper";
import { EditorCanvasDefaultCardTypes } from "@/lib/constants";
import { onDragStart } from "@/lib/editor-utils";

import { ScrollArea } from "@/components/ui/scroll-area"


type Props = {
  nodes: EditorNode[];
};

const EditorCanvasSideBar = ({ nodes }: Props) => {
  const { state } = useEditor();
  return (
    <aside>
      <Tabs defaultValue="actions" className="h-[80vh] overflow-scroll">
        <TabsList className="bg-transparent">
          <TabsTrigger value="actions">Actions</TabsTrigger>
          {/* <TabsTrigger value="settings">Settings</TabsTrigger> */}
        </TabsList>
        <Separator />
        <TabsContent
          value="actions"
          className="flex flex-col gap-4 p-4"
        >
          {Object.entries(EditorCanvasDefaultCardTypes)
            .filter(
              ([_, cardType]) =>
                (!nodes.length && cardType.type === 'Trigger') ||
                (nodes.length && cardType.type === 'Action')
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
                <CardHeader className="flex flex-row items-center gap-4 p-4">
                  <EditorCanvasCardIconHelper type={cardKey as EditorCanvasTypes} />
                  <CardTitle className="text-md">
                    {cardKey}
                    <CardDescription>{cardValue.description}</CardDescription>
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
        </TabsContent>
        <TabsContent value="settings" className="flex flex-col gap-4 p-4">Change your password here.</TabsContent>
      </Tabs>
    </aside>
  );
};

export default EditorCanvasSideBar;
