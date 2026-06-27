"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();

  // Hide footer on auth routes
  if (pathname === "/signup" || pathname === "/login") {
    return null;
  }

  return <Footer />;
}
