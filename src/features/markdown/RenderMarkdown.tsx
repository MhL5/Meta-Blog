import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

type RenderMarkdownProps = { markdown: string };

/**
 * receives a markdown string and renders it as HTML, including syntax highlighting for code blocks.
 */
export default function RenderMarkdown({ markdown }: RenderMarkdownProps) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      className="prose prose-slate max-w-none dark:prose-invert prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-pre:bg-transparent prose-pre:p-0"
      components={{
        code({ node, inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || "");

          return !inline && match ? (
            <SyntaxHighlighter
              style={oneDark}
              PreTag="div"
              language={match[1]}
              showLineNumbers={true}
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {markdown}
    </Markdown>
  );
}
