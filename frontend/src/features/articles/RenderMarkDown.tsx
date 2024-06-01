import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/prism";
import { useDarkModeContext } from "../theme/DarkModeContext";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

type RenderMarkDownProps = { data: string };

export default function RenderMarkDown({ data }: RenderMarkDownProps) {
  const { isDarkMode } = useDarkModeContext();

  return (
    <article className="prose prose-slate max-w-none dark:prose-invert prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-pre:bg-transparent prose-pre:p-0">
      <ReactMarkdown
        children={data}
        components={{
          code(props) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter
                {...rest}
                PreTag="div"
                children={String(children).replace(/\n$/, "")}
                language={match[1]}
                style={isDarkMode ? oneDark : oneLight}
                wrapLongLines={true}
              />
            ) : (
              // @ts-expect-error The 'inline' attribute in ReactMarkDown implementation is mistakenly set as a boolean value 'true'. Overwriting it to a string 'true' to prevent console errors in the browser.
              <code {...rest} className={className} inline="true">
                {children}
              </code>
            );
          },
        }}
      />
    </article>
  );
}
