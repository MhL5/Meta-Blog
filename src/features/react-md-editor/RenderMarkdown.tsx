"use client";

import MarkdownPreview from "@uiw/react-markdown-preview";
import rehypeSanitize from "rehype-sanitize";

const rehypePlugins = [rehypeSanitize];
export default function RenderMarkdown({ markdown }: { markdown: string }) {
  return (
    <MarkdownPreview
      source={markdown}
      // for security - sanitizes the markdown to prevent xss attacks
      rehypePlugins={rehypePlugins}
      style={{ whiteSpace: "pre-wrap", background: "none" }}
    />
  );
}
