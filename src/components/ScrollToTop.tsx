"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * https://github.com/vercel/next.js/issues/45187
 * There is bug which causes the scroll to remain its position after navigation to another page
 * a work around is to use this hook until this issue gets fixed
 */
export default function ScrollToTop() {
  // when clicking a link, user will not scroll to the top of the page if the header is sticky.
  // their current scroll position will persist to the next page.
  // this useEffect is a workaround to 'fix' that behavior.
  const pathname = usePathname();

  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  return null;
}
