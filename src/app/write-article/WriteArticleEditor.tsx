"use client";

import { TextEditor } from "@/features/textEditor/Editor";
import { useRef } from "react";
import {
  AdmonitionDirectiveDescriptor,
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  codeBlockPlugin,
  codeMirrorPlugin,
  CodeToggle,
  CreateLink,
  directivesPlugin,
  headingsPlugin,
  imagePlugin,
  InsertAdmonition,
  InsertCodeBlock,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditorMethods,
  quotePlugin,
  Separator,
  StrikeThroughSupSubToggles,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

export default function WriteArticleEditor() {
  const ref = useRef<MDXEditorMethods>(null);

  return (
    <>
      <button
        onClick={() => ref.current?.insertMarkdown("new markdown to insert")}
      >
        Insert new markdown
      </button>
      <button onClick={() => console.log(ref.current?.getMarkdown())}>
        Get markdown
      </button>
      <article className="prose prose-slate w-full max-w-[200rem]">
        <TextEditor
          className="h-full min-h-96 rounded-lg bg-white"
          markdown={`initial value do i need? `}
          ref={ref}
          plugins={[
            directivesPlugin({
              directiveDescriptors: [AdmonitionDirectiveDescriptor],
            }),
            headingsPlugin(),
            listsPlugin(),
            quotePlugin(),
            thematicBreakPlugin(),
            markdownShortcutPlugin(),
            codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
            codeMirrorPlugin({
              codeBlockLanguages: {
                js: "JavaScript",
                css: "CSS",
                ts: "typescript",
                html: "html",
              },
            }),
            // TODO: adding images
            imagePlugin({
              imageUploadHandler: async (image: File) => {
                console.log(`hello there`);
                // TODO:
                // steps ?
                // a loader while its uploading and something when its done in client side
                // sanitize validation
                // below 2mb
                // upload
                // return url

                // plan?
                // execute a server action that handles image upload and returns the url to client
                // error handling ? will see

                const formData = new FormData();
                formData.append("image", image);
                // send the file to your server and return
                // the URL of the uploaded image in the response
                const response = await fetch("/uploads/new", {
                  method: "POST",
                  body: formData,
                });
                const json = (await response.json()) as { url: string };
                return json.url;
              },
              imageAutocompleteSuggestions: [
                "https://res.cloudinary.com/",
                "https://picsum.photos/",
                "https://unsplash.com/",
              ],
            }),
            tablePlugin(),
            listsPlugin(),
            linkPlugin(),
            linkDialogPlugin({
              linkAutocompleteSuggestions: [
                "https://virtuoso.dev",
                "https://mdxeditor.dev",
              ],
            }),
            toolbarPlugin({
              toolbarContents: () => (
                <>
                  <UndoRedo />

                  <Separator />

                  <BoldItalicUnderlineToggles />
                  <CodeToggle />

                  <Separator />

                  <StrikeThroughSupSubToggles />

                  <Separator />

                  <ListsToggle />

                  <Separator />

                  <BlockTypeSelect />

                  <Separator />

                  <CreateLink />
                  <InsertImage />

                  <Separator />

                  <InsertTable />
                  <InsertThematicBreak />

                  <Separator />

                  <InsertCodeBlock />

                  <Separator />

                  <InsertAdmonition />

                  <Separator />
                  <div className="w-96"></div>
                </>
              ),
            }),
          ]}
        />
      </article>
    </>
  );
}
