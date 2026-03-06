import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin-template/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex w-full min-h-screen overflow-hidden">
            <SidebarProvider>
                <AppSidebar />

                <main className="flex-1 w-full">
                    <SidebarTrigger />
                    {children}
                </main>

            </SidebarProvider>
        </div>
    );
}