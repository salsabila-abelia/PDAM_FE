import Link from "next/link"
import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

export default function AdminDashboardLayout({ children }: Props) {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">

            {/* TOPBAR */}
            <header className="w-full backdrop-blur-md bg-white/60 border-b border-white/40 shadow-sm">

                <div className="w-full flex items-center justify-between px-8 py-4">

                    {/* LEFT */}
                    <div className="flex items-center gap-4">

                        <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
                            PDAM Dashboard
                        </h1>

                        <span className="text-sm text-gray-500">
                            Administrator Panel
                        </span>

                    </div>


                    {/* NAVIGATION */}
                    <div className="flex gap-3">

                        <Link
                            href="/admin/customer"
                            className="px-4 py-2 text-sm rounded-xl bg-blue-100 hover:bg-blue-200 transition shadow-sm"
                        >
                            Customers
                        </Link>

                        <Link
                            href="/admin/services"
                            className="px-4 py-2 text-sm rounded-xl bg-purple-100 hover:bg-purple-200 transition shadow-sm"
                        >
                            Services
                        </Link>

                        <Link
                            href="/admin/bill"
                            className="px-4 py-2 text-sm rounded-xl bg-pink-100 hover:bg-pink-200 transition shadow-sm"
                        >
                            Bill
                        </Link>

                        <Link
                            href="/admin/payments"
                            className="px-4 py-2 text-sm rounded-xl bg-green-100 hover:bg-green-200 transition shadow-sm"
                        >
                            Payments
                        </Link>

                    </div>


                    {/* RIGHT */}
                    <div className="flex items-center gap-3">

                        <div className="text-right">
                            <p className="text-sm font-semibold text-gray-700">
                                Admin
                            </p>
                            <p className="text-xs text-gray-500">
                                PDAM System
                            </p>
                        </div>

                        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 flex items-center justify-center text-white font-bold">
                            A
                        </div>

                    </div>

                </div>

            </header>


            {/* CONTENT */}
            <main className="flex-1 p-8">
                {children}
            </main>

        </div>
    )
}