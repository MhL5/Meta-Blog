import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import RenderMarkdown from "./RenderMarkdown";

type RenderMarkdownWithSanitizationProps = {
  markdown: string;
};

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
export default function RenderMarkdownWithSanitization({
  markdown,
}: RenderMarkdownWithSanitizationProps) {
  // sanitize markdown
  // this happens on server so we need JSDOM to create a window object for DOMPurify.
  const window = new JSDOM("").window;
  const DOMPurify = createDOMPurify(window);
  const sanitizeMarkdown = DOMPurify.sanitize(markdown);

  return <RenderMarkdown markdown={sanitizeMarkdown} />;
}
