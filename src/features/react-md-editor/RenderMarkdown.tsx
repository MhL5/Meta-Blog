"use client";

import MarkdownPreview from "@uiw/react-markdown-preview";
import rehypeSanitize from "rehype-sanitize";
import "./editor.css";

const rehypePlugins = [rehypeSanitize];
export default function RenderMarkdown({ markdown }: { markdown: string }) {
  return (
    <div className="overwrite-tailwind">
      <MarkdownPreview
        source={markdown}
        // for security - sanitizes the markdown to prevent xss attacks
        rehypePlugins={rehypePlugins}
        style={{ background: "none" }}
      />
    </div>
  );
}
