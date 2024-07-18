import EditorCanvas from "@/components/editor/EditorCanvas";
import EditorProvider from "@/providers/editor-provider";

export default function Home() {
  return (
    <main className="h-full w-full">
      <EditorProvider>
        <EditorCanvas />
      </EditorProvider>
    </main>
  );
}
