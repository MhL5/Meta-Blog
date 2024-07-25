"use client";

import { Button } from "@/components/ui/button";
import { Copy, CopyCheck } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

type CopyToClipboardProps = { language?: string; content: string };

/**
 * Requires a parent with relative position
 */
export default function CopyToClipboard({
  language,
  content,
}: CopyToClipboardProps) {
  const [isCopied, setIsCopied] = useState(false);

  async function handleCopyClick() {
    setIsCopied(true);
    await navigator.clipboard.writeText(content);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  }

  const MotionCheck = motion(CopyCheck);
  const MotionCopy = motion(Copy);

  return (
    <div className="absolute right-0 top-0 flex flex-row items-center p-2">
      <span className="m-1 basis-3/4 pb-1 text-xs font-bold">
        {isCopied ? `Copied to clipboard` : language}
      </span>

      <Button variant="ghost" size="xs" onClick={handleCopyClick}>
        {isCopied ? (
          <MotionCheck
            className="h-4 w-4"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        ) : (
          <MotionCopy
            className="h-4 w-4"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        )}
      </Button>
    </div>
  );
}
