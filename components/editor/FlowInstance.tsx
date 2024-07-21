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

    toast.success("Your workflow has been saved!");
  };

  const onPublishWorkflow = () => {
    const triggerNode = state.editor.elements.find((node) => node.data.type === "Trigger");
    const isTriggerPresent = !!triggerNode
    const isTriggerConnected = !!state.editor.edges.find((node) => node.source === triggerNode?.id);
    if(!isTriggerPresent) toast.warning("Workflow must contain a Trigger!");
    else if(!isTriggerConnected) toast.warning("Trigger must have a valid connection!");
    else toast.success("Your workflow has been published!");
    
    //Call Server Action to push workflow (state) to database
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
