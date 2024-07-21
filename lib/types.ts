export type EditorCanvasTypes =
  | "Watch Price"
  | "Trigger"
  | "Condition"
  | "AI"
  | "Buy"
  | "Sell"
  | "Restart"
  | "Action"
  | "Wait";

export type EditorCanvasCardType = {
  title: string;
  description: string;
  completed: boolean;
  current: boolean;
  metadata: any;
  type: EditorCanvasTypes;
};

export type EditorNodeType = {
  id: string;
  type: EditorCanvasCardType["type"];
  position: {
    x: number;
    y: number;
  };

  data: EditorCanvasCardType;
  measured?: { width: number; height: number };
  selected?: boolean;
  dragging?: boolean;
};

export type EditorNode = EditorNodeType;

export type EditorEdge = { id: string; source: string; sourceHandle?: string; target: string };

export type EditorActions =
  | {
      type: "LOAD_DATA";
      payload: {
        elements: EditorNode[];
        edges: EditorEdge[];
      };
    }
  | {
      type: "UPDATE_NODE";
      payload: {
        elements: EditorNode[];
      };
    }
  | { type: "REDO" }
  | { type: "UNDO" }
  | {
      type: "SELECTED_ELEMENT";
      payload: {
        element: EditorNode;
      };
    };
