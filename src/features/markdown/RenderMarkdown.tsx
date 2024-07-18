import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";

type RenderMarkdownProps = { markdown: string };

/**
 * receives a markdown string and renders it as HTML, including syntax highlighting for code blocks.
 */
export default function RenderMarkdown({ markdown }: RenderMarkdownProps) {
  // sanitize markdown
  // this happens on server so we need JSDOM to create a window object for DOMPurify.
  const window = new JSDOM("").window;
  const DOMPurify = createDOMPurify(window);
  const sanitizeMarkdown = DOMPurify.sanitize(markdown);

  return (
    <article className="prose prose-slate max-w-none dark:prose-invert prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-pre:bg-transparent prose-pre:p-0">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        disallowedElements={["script"]}
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
        {sanitizeMarkdown}
      </Markdown>
    </article>
  );
}
