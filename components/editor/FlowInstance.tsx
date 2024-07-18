"use client";

import { EditorNode } from "@/lib/types";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useEditor } from "@/providers/editor-provider";

type Props = {
  edges: any[];
  nodes: EditorNode[];
};

const FlowInstance = ({ nodes, edges }: Props) => {
  const [isFlow, setIsFlow] = useState([]);

  const {state, dispatch} = useEditor();

  const onSaveWorkflow = () => {
    //Call Server Action to save workflow (nodes & edges) to database

    toast.message("Your workflow has been saved!");
  };

  const onPublishWorkflow = () => {
    //Call Server Action to push workflow (state) to database

    toast.message("Your workflow has been published!");
  };


  const onAutomateFlow = useCallback(async () => {
    const flows: any = []
    const connectedEdges = edges.map((edge) => edge.target)
    connectedEdges.map((target) => {
      nodes.map((node) => {
        if (node.id === target) {
          flows.push(node.type)
        }
      })
    })

    setIsFlow(flows)
  },[edges, nodes])

  useEffect(() => {
    onAutomateFlow()
  }, [edges, onAutomateFlow])

  const onUndo = () => {
    dispatch({
      type: "UNDO",
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-3 p-4">
        <Button onClick={onSaveWorkflow} disabled={isFlow.length < 1}>
          Save
        </Button>
        <Button onClick={onPublishWorkflow} disabled={isFlow.length < 1}>
          Publish
        </Button>
      {/* <Button onClick={onUndo}>
        Undo
      </Button> */}
      </div>
    </div>
  );
};

export default FlowInstance;
