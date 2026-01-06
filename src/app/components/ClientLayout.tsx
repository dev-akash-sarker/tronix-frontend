"use client";

import { usePathname } from "next/navigation";
import Sidebar from "../dashboard";
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const noSidebarRoutes = ["/admin/login", "/admin/registration"];
  const showSidebar = !noSidebarRoutes.includes(pathname);

  return showSidebar ? <Sidebar>{children}</Sidebar> : <>{children}</>;
}
