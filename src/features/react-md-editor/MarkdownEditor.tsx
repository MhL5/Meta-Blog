import { Skeleton } from "@/components/ui/skeletion";
import "@uiw/react-markdown-preview/markdown.css";
import "@uiw/react-md-editor/markdown-editor.css";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction } from "react";
import rehypeSanitize from "rehype-sanitize";
import "./editor.css";
import RenderMarkdown from "./RenderMarkdown";

type MarkdownEditorProps = {
  editorValue: string | undefined;
  setEditorValue: Dispatch<SetStateAction<string | undefined>>;
};

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
  loading: () => (
    <Skeleton className="grid h-96 w-full place-items-center">
      <p className="text-2xl font-bold">Loading Editor...</p>
    </Skeleton>
  ),
});

export default function MarkdownEditor({
  editorValue,
  setEditorValue,
}: MarkdownEditorProps) {
  return (
    <div className="overwrite-tailwind">
      <MDEditor
        value={editorValue}
        onChange={(e) => setEditorValue(e)}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
        textareaProps={{
          placeholder: "Don't you love GITHUB markdown😁? ",
        }}
        className="h-full min-h-96"
      />
      <RenderMarkdown markdown={editorValue || ""} />
    </div>
  );
}
