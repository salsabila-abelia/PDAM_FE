import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";
import { items } from "@/app/admin/admin_menus";
import Link from "next/link";

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-white/30 bg-white/70 backdrop-blur-xl shadow-xl">
      <SidebarHeader className="border-b border-white/30 px-4 py-5">
        <div className="rounded-2xl border border-white/40 bg-white/70 px-4 py-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-lg font-bold text-white shadow-lg">
              P
            </div>

            <div className="flex flex-col">
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-lg font-bold text-transparent">
                PDAM
              </span>
              <span className="text-xs text-gray-500">Management Panel</span>
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="overflow-y-auto px-4 py-4">
        <div className="mb-3 px-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
          Administrator
        </div>

        <div className="space-y-4 pb-24">
          {items.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              className="group flex items-center gap-4 rounded-3xl border border-white/50 bg-white/65 px-5 py-5 text-gray-800 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-lg"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 text-gray-700 shadow-sm transition-all duration-200 group-hover:from-pink-500 group-hover:via-purple-500 group-hover:to-blue-500 group-hover:text-white">
                <item.icon className="h-6 w-6" />
              </div>

              <span className="text-[15px] font-medium">{item.title}</span>
            </Link>
          ))}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}