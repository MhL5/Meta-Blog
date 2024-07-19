"use client";

import TextEditor from "@/features/textEditor/Editor";
import { forwardRef } from "react";
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
import imageSchema from "./imageSchema";
import { ZodError } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { fromZodError } from "zod-validation-error";
import { urlSchema } from "@/lib/utils";
import Link from "next/link";

const WriteArticleEditor = forwardRef<MDXEditorMethods>(
  function WriteArticleEditor(_, ref) {
    const { toast } = useToast();

    async function imageUploadHandlerFn(image: File) {
      try {
        const validImage = imageSchema.parse(image);
        const formData = new FormData();
        formData.append("image", validImage);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APPLICATION_DOMAIN}/api/uploadImage`,
          {
            method: "POST",
            body: formData,
          },
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const json = await response.json();
        const validUrl = urlSchema.parse(json);
        return validUrl;
      } catch (error) {
        if (error instanceof ZodError && fromZodError(error))
          toast({
            variant: "destructive",
            title: "upload failed",
            description: `${error.issues
              .map((i) => `${i.path} ${i.message}`)
              .join(", ")}`,
          });
        else
          toast({
            variant: "destructive",
            title: "upload failed,please try again!",
            description: (
              <Link
                className="underline-blue-500 text-blue-500"
                href="https://t.me/mhl_5"
                target="_blank"
              >
                Contact customer support
              </Link>
            ),
          });

        return "/failed-to-upload.png";
      }
    }

    return (
      <>
        <article className="prose prose-slate w-full max-w-7xl py-4">
          <TextEditor
            className="rounded-md border bg-white"
            markdown={`### Start writing your awesome blog here 😀🎉`}
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
                  ts: "typescript",
                  css: "CSS",
                  html: "html",
                  jsx: "jsx",
                  python: "python",
                  java: "Java",
                  csharp: "C#",
                  markdown: "Markdown",
                  json: "JSON",
                  ruby: "Ruby",
                  swift: "Swift",
                  php: "PHP",
                  go: "Go",
                  rust: "Rust",
                  c: "C",
                  "c++": "C++",
                  bash: "bash",
                },
              }),
              imagePlugin({
                // since its ssr false and only renders on client we can not use server actions
                // we need an api route
                imageUploadHandler: imageUploadHandlerFn,
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
                  </>
                ),
              }),
            ]}
          />
        </article>
      </>
    );
  },
);

export default WriteArticleEditor;
