import { ReactNode } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

interface AdminLayoutProps {
  children: ReactNode;
}
export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="font-poppins bg-[var(--color-background)] text-[var(--color-text)]">
      <AdminSidebar />

      <div className="ml-64 min-h-screen">
        <AdminTopbar />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
