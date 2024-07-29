"use client";

import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

export default function TempUnderDev() {
  const { toast } = useToast();

  useEffect(() => {
    setTimeout(() => {
      toast({
        variant: "destructive",
        title: "Under Development",
        description:
          "This website is under development. You are using an un released version.",
      });
    }, 3000);
  }, [toast]);

  return null;
}
