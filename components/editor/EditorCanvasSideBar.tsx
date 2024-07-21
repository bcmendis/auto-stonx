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
import { useEffect, useState } from "react";

type Props = {
  nodes: EditorNode[];
  onClickAdd: (
    type: EditorCanvasCardType["type"],
  ) => void;
};

const EditorCanvasSideBar = ({ nodes, onClickAdd }: Props) => {
    const {state} = useEditor();
    const [value, setValue] = useState("triggers");

    useEffect(()=>{
        const isTriggerPresent = !!state.editor.elements.find(
            (node) => node.data.type === "Trigger",
          );

          if(isTriggerPresent) setValue("actions");
          else setValue("triggers")

    },[state])

  const handleCardAdd = (type: EditorCanvasTypes) => {
    onClickAdd(type);
  };
  return (
    <aside>
      <Tabs value={value} onValueChange={setValue} className="overflow-scroll md:h-[80vh]">
        <TabsList className="bg-transparent">
          <TabsTrigger value="triggers">Triggers</TabsTrigger>
          <TabsTrigger value="actions" disabled={!nodes.length}>Actions</TabsTrigger>
        </TabsList>
        <Separator />
        <TabsContent value="triggers" className="flex flex-col gap-4 p-4 data-[state=inactive]:hidden">
          {filterCards({handleCardAdd, type:"Trigger"})}
        </TabsContent>
        <TabsContent value="actions" className="flex flex-col gap-4 p-4">
        {filterCards({handleCardAdd, type:"Action"})}
        </TabsContent>
      </Tabs>
    </aside>
  );
};

export default EditorCanvasSideBar;

type FilterCardProps = {
    type: string;
    handleCardAdd: (type: EditorCanvasTypes) => void;
}

const filterCards = ({handleCardAdd, type} : FilterCardProps) => {
  return Object.entries(EditorCanvasDefaultCardTypes)
    .filter(
      ([_, cardType]) =>
        (cardType.type === type)
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
          <EditorCanvasCardIconHelper type={cardKey as EditorCanvasTypes} />
          <CardTitle className="text-md flex w-full flex-1 flex-col items-center text-center sm:items-start sm:text-left">
            {cardKey}
            <CardDescription>{cardValue.description}</CardDescription>
          </CardTitle>
          <Button
            variant={"ghost"}
            className="m-0 p-0"
            onClick={() => handleCardAdd(cardKey as EditorCanvasTypes)}
          >
            <Plus className="min-h-6 min-w-6" />
          </Button>
        </CardHeader>
      </Card>
    ));
};
