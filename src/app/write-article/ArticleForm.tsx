"use client";

import GoogleReCAPTCHA from "@/components/GoogleReCAPTCHA";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import MarkdownEditor from "@/features/react-md-editor/MarkdownEditor";
import { zodResolver } from "@hookform/resolvers/zod";
import { Categories } from "@prisma/client";
import { CloudUpload, ImageUp } from "lucide-react";
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { useRouter } from "next/navigation";
import { ChangeEvent, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import writeArticleSchema, {
  WriteArticleSchemaType,
} from "./writeArticleSchema";

export default function ArticleForm() {
  const [editorValue, setEditorValue] = useState<string | undefined>("");
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<WriteArticleSchemaType>({
    resolver: zodResolver(writeArticleSchema),
    mode: "all",
    defaultValues: {
      title: "",
      readingTime: 3,
      tags: [""],
      avatar: "",
      content: "",
      captcha: "",
    },
  });

  async function onSubmit(values: WriteArticleSchemaType) {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APPLICATION_DOMAIN}/api/article`,
        {
          method: "POST",
          body: JSON.stringify({ ...values }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      if (data?.articleSlug) router.push(`/article/${data?.articleSlug}`);
    } catch (error) {
      toast({
        variant: "destructive",
        description:
          "Something went wrong while receiving the data from server!",
      });
    } finally {
      setLoading(false);
    }
  }

  function handleUploadButton(res: CloudinaryUploadWidgetResults) {
    // @ts-expect-error todo: temp solution ⏰
    if (res?.info?.secure_url) form.setValue("avatar", res.info.secure_url);
    else
      toast({
        variant: "destructive",
        description: "Upload failed, please try again",
      });
  }

  const formList = useMemo(() => {
    return [
      {
        name: "title",
        label: "title",
        description: "this is your blog title",
        inputType: "text",
        id: "672d496c68f60ca300b9b6f91748fdf59713b4b3f4a689f37da1f81d8b27435ad356d22817a7ade8c0d528ca575ca063dee5cccdde3b199f48d16e12bce3c00d",
        placeholder: "example: My cool blog title",
        onChange: null,
      },
      {
        name: "readingTime",
        label: "Reading time (minutes)",
        description: "This is your blog reading time in minutes.",
        inputType: "number",
        id: "d18106b36f9d2bcf55c9e0b8590017692e07d5bdad74bb88d300831d8bd3aed6a9f9506b07872f7c2c7085a96f116a64d711c6572213172624f917b93591dd30",
        placeholder: "",
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
          form.setValue("readingTime", Number(e.target.value));
        },
      },
      {
        name: "tags",
        label: "tags (comma separated)",
        description: "",
        inputType: "text",
        id: "8a894c5dc74e89490d6ab5af9b0f83874bc285315219173b0a02ec738a2fe76cf8f50a64dfaf5c790c3d5ccc13d2bf4b678f28bfa168d642e43163dc547b63ba",
        placeholder: "example: nextJs,react,typescript,git,github",
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
          form.setValue("tags", e.target.value.trim().split(","));
        },
      },
    ] as const;
  }, [form]);

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          // filling editor markdown data before passing data to react hookform
          if (editorValue) form.setValue("content", editorValue);

          form.handleSubmit(onSubmit)(e);
        }}
        className="space-y-8"
      >
        {formList.map(
          ({
            description,
            id,
            inputType,
            label,
            name,
            placeholder,
            onChange,
          }) => {
            return (
              <FormField
                key={id}
                control={form.control}
                name={name}
                disabled={loading}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormDescription>{description}</FormDescription>
                    <FormControl>
                      {onChange ? (
                        <Input
                          placeholder={placeholder}
                          type={inputType}
                          {...field}
                          onChange={onChange}
                        />
                      ) : (
                        <Input
                          placeholder={placeholder}
                          type={inputType}
                          {...field}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          },
        )}

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select a category : </FormLabel>

              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Please select a category for your article." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(Categories).map((category) => {
                    return (
                      <SelectItem
                        key={category}
                        value={category}
                        className="capitalize"
                      >
                        {category.replaceAll("_", " ")}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="avatar"
          disabled={loading}
          render={({ field }) => (
            <FormItem className="m-0 w-full space-y-1 p-0">
              <FormLabel>upload a picture for your blog avatar:</FormLabel>
              <FormDescription>
                blog avatar Max image size is 2MB.Only .jpg, .jpeg, .png and
                .webp formats are supported.
              </FormDescription>
              <Button asChild variant="secondary">
                <CldUploadButton
                  uploadPreset="blog-avatar"
                  onSuccess={handleUploadButton}
                  className="w-full"
                >
                  <span className="px-2">
                    <ImageUp />
                  </span>
                  Upload article avatar
                </CldUploadButton>
              </Button>
              <FormControl>
                <Input type="text" className="hidden" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          disabled={loading}
          render={({ field }) => (
            <FormItem className="m-0 w-full space-y-1 p-0">
              <FormLabel>
                This is your blog content :
                <span className="text-sm">
                  {" "}
                  for now we only support markdown
                </span>
              </FormLabel>
              <FormControl>
                <Input type="text" className="hidden" {...field} />
              </FormControl>
              <FormMessage />

              <MarkdownEditor
                editorValue={editorValue}
                setEditorValue={setEditorValue}
              />
            </FormItem>
          )}
        />

        <GoogleReCAPTCHA
          onChange={(val) => form.setValue("captcha", val || "")}
        />
        <FormField
          control={form.control}
          name="captcha"
          disabled={loading}
          render={({ field }) => (
            <FormItem className="m-0 space-y-0 p-0">
              <FormControl>
                <Input type="text" className="hidden" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          variant="secondary"
          disabled={loading}
        >
          <span className="px-2">
            <CloudUpload />
          </span>
          {loading ? `Publishing...` : `Publish blog`}
        </Button>
      </form>
    </Form>
  );
}
