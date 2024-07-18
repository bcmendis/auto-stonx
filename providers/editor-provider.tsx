"use client";

import { EditorActions, EditorNode, EditorNodeType } from "@/lib/types";
import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react";

export type Editor = {
  elements: EditorNode[];
  edges: {
    id: string;
    source: string;
    target: string;
  }[];
  selectedNode: EditorNodeType;
};

export type HistoryState = {
  historyArray: Editor[];
  currentIndex: number;
};

export type EditorState = {
  editor: Editor;
  history: HistoryState;
};

const initialEditorState: EditorState["editor"] = {
  elements: [],
  edges: [],
  selectedNode: {
    id: "",
    type: "Trigger",
    position: {
      x: 0,
      y: 0,
    },
    data: {
      title: "",
      description: "",
      completed: false,
      current: false,
      metadata: {},
      type: "Trigger",
    },
  },
};

const initialHistoryState: HistoryState = {
  historyArray: [initialEditorState],
  currentIndex: 0,
};

const initialState: EditorState = {
  editor: initialEditorState,
  history: initialHistoryState,
};

const editorReducer = (
  state: EditorState = initialState,
  action: EditorActions,
): EditorState => {
  switch (action.type) {
    case "REDO":
      if (state.history.currentIndex < state.history.historyArray.length - 1) {
        const nextIndex = state.history.currentIndex + 1;
        const nextEditorState = { ...state.history.historyArray[nextIndex] };
        const redoState = {
          ...state,
          editor: nextEditorState,
          history: {
            ...state.history,
            currentIndex: nextIndex,
          },
        };
        return redoState;
      } else return state;
    case "UNDO":
      if (state.history.currentIndex > 0) {
        const prevIndex = state.history.currentIndex - 1;
        const prevEditorState = { ...state.history.historyArray[prevIndex] };
        const undoState = {
          ...state,
          editor: prevEditorState,
          history: {
            ...state.history,
            currentIndex: prevIndex,
          },
        };
        return undoState;
      } else return state;
    case "LOAD_DATA":
      const newEditorState = {
        ...state.editor,
        elements: action.payload.elements || initialEditorState.elements,
        edges: action.payload.edges,
      };
      const currentIndex = state.history.currentIndex;
      const currentHistoryArray = state.history.historyArray.slice(0,currentIndex+1);
      const recentEditorInHistory =
        currentHistoryArray[currentIndex];
      let newHistoryState = state.history;
      if (
        recentEditorInHistory.edges.length !== newEditorState.edges.length ||
        recentEditorInHistory.elements.length !== newEditorState.elements.length
      ) {
        const newHistoryArray = [...state.history.historyArray, newEditorState];
        newHistoryState = {
          ...state.history,
          historyArray: newHistoryArray,
          currentIndex: currentIndex + 1,
        };
      }
      return {
        ...state,
        editor: newEditorState,
        history: newHistoryState,
      };
    case "SELECTED_ELEMENT":
      return {
        ...state,
        editor: {
          ...state.editor,
          selectedNode: action.payload.element,
        },
      };
    default:
      return state;
  }
};

export type EditorContextData = {
  previewMode: boolean;
  setPreviewMode: (previewMode: boolean) => void;
};

export const EditorContext = createContext<{
  state: EditorState;
  dispatch: Dispatch<EditorActions>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

type EditorProps = {
  children: ReactNode;
};

const EditorProvider = (props: EditorProps) => {
  const [state, dispatch] = useReducer(editorReducer, initialState);

  return (
    <EditorContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {props.children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditor hook must be used within the editor Provider");
  }
  return context;
};

export default EditorProvider;
