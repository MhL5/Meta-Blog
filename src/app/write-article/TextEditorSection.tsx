import { forwardRef, useState } from "react";
import WriteArticleEditor from "./WriteArticleEditor";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { Button } from "@/components/ui/button";
import RenderMarkdown from "@/features/markdown/RenderMarkdown";
import { cn } from "@/lib/utils";

/**
 * We use css for displaying the tabs instead of state 
 * because we don't want to reset editor state
 */
const TextEditorSection = forwardRef<MDXEditorMethods, any>(
  (_, markdownRef) => {
    const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
    const isEditTab = activeTab === "edit";
    const IsPreviewTab = activeTab === "preview";

    return (
      <section>
        <div className="flex rounded-lg bg-muted">
          <Button
            size="md"
            type="button"
            variant="secondary"
            onClick={() => setActiveTab("edit")}
            className={`m-1 w-full py-3 transition-all duration-300 hover:bg-background/50 ${cn(
              `bg-muted`,
              `${isEditTab && `bg-background text-primary`}`,
            )}`}
          >
            Edit
          </Button>
          <Button
            size="md"
            type="button"
            variant="secondary"
            onClick={() => setActiveTab("preview")}
            className={`m-1 w-full py-3 transition-all duration-300 hover:bg-background/50 ${cn(
              `bg-muted`,
              `${IsPreviewTab && `bg-background text-primary`}`,
            )}`}
          >
            Preview
          </Button>
        </div>

        <div
          className={`${!isEditTab && "h-0 opacity-0"} overflow-hidden transition-all duration-300 ease-linear`}
        >
          <WriteArticleEditor ref={markdownRef} />
        </div>

        <div
          className={`${!IsPreviewTab && "h-0 opacity-0"} overflow-hidden transition-all duration-300 ease-linear`}
        >
          <div className="my-4 rounded-lg border px-3 py-8">
            <RenderMarkdown
              // @ts-expect-error todo: temp solution ⏰
              markdown={markdownRef?.current?.getMarkdown() || ""}
            />
          </div>
        </div>
      </section>
    );
  },
);

TextEditorSection.displayName = "TextEditorSection";
export default TextEditorSection;
