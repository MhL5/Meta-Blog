import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import customAdmonitionPlugin from "./customAdmonitionPlugin";

type RenderMarkdownProps = { markdown: string };

/**
 * we need to render markdown in write-article page too
 * but since mdxeditor is {ssr:false} and does not support ssr
 * it results in error if we try to use something which is not available in browser
 * like using dompurify, server actions ....
 *
 * we have to make two versions of this component:
 *
 * Recommended: RenderMarkdownWithSanitization
 * use it for all pages
 *
 * not Recommended: RenderMarkdown
 * this component does not support sanitization so only use it in pages like write-article that is not ssr
 * the only reason to use this is when RenderMarkdownWithSanitization does not work.
 */
export default function RenderMarkdown({ markdown }: RenderMarkdownProps) {
  return (
    <article className="prose prose-slate max-w-none dark:prose-invert prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-pre:bg-transparent prose-pre:p-0">
      <Markdown
        remarkPlugins={[remarkGfm, customAdmonitionPlugin]}
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
        {markdown}
      </Markdown>
    </article>
  );
}
