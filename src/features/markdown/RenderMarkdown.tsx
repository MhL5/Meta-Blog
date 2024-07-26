import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import CopyToClipboard from "./CopyToClipboard";
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
              <div className="flex items-stretch">
                <div className="flex-1 basis-11/12">
                  <SyntaxHighlighter
                    style={oneDark}
                    PreTag="div"
                    language={match[1]}
                    showLineNumbers={true}
                    customStyle={{
                      borderTopRightRadius: "0",
                      borderBottomRightRadius: "0",
                    }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                </div>
                <div className="m-[7px] ml-0 flex-1 basis-1/12 rounded-r-md bg-[#282c34]">
                  <div className="flex items-start">
                    <CopyToClipboard
                      content={String(children).replace(/\n$/, "")}
                      language={match[1]}
                    />
                  </div>
                </div>
              </div>
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
