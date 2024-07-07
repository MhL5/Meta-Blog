"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

type Tab = {
  title: string;
  value: string;
  content?: string | ReactNode | any;
};

type TabsProps = {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
};

type FadeInDivProps = {
  className?: string;
  key?: string;
  tabs: Tab[];
  active: Tab;
  hovering?: boolean;
};

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: TabsProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [tabs, setTabs] = useState<Tab[]>(propTabs);
  const [active, setActive] = useState<Tab>(propTabs[0]);
  const [hovering, setHovering] = useState(false);

  const tab = searchParams.get("tab");

  const moveSelectedTabToTop = useCallback(
    (idx: number) => {
      const newTabs = [...propTabs];
      const selectedTab = newTabs.splice(idx, 1);
      newTabs.unshift(selectedTab[0]);
      setTabs(newTabs);
      setActive(newTabs[0]);
    },
    [propTabs]
  );

  useEffect(() => {
    propTabs.forEach(({ value }, i) => {
      tab === value.toLowerCase() && moveSelectedTabToTop(i);
    });
  }, [searchParams, propTabs, moveSelectedTabToTop, tab]);

  return (
    <>
      <div
        className={cn(
          "flex flex-row items-center justify-start [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full ",
          containerClassName
        )}
      >
        {propTabs.map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => {
              moveSelectedTabToTop(idx);
              router.push(`${pathname}`);
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={cn("relative px-4 py-2 rounded-full", tabClassName)}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{
                  type: "spring",
                  bounce: 0.3,
                  duration: 0.6,
                }}
                className={cn(
                  "absolute inset-0 bg-background rounded-full ",
                  activeTabClassName
                )}
              />
            )}

            <span className="relative block text-black dark:text-white">
              {tab.title}
            </span>
          </button>
        ))}
      </div>
      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active.value}
        hovering={hovering}
        className={cn("mt-32", contentClassName)}
      />
    </>
  );
};

export const FadeInDiv = ({ className, tabs, hovering }: FadeInDivProps) => {
  const isActive = (tab: Tab) => {
    return tab.value === tabs[0].value;
  };
  return (
    <div className="relative w-full h-full">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.1,
            top: hovering ? idx * -50 : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0,
          }}
          animate={{
            y: isActive(tab) ? [0, 40, 0] : 0,
          }}
          className={cn("w-full h-full absolute top-0 left-0", className)}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
};