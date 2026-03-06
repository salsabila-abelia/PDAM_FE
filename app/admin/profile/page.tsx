import { Admin } from "@/app/types";
import { getCookies } from "@/lib/server-cookie";
import AdminProfileForm from "./form";

type ResultData = {
    success: boolean,
    message: string,
    data: Admin,
}

async function getAdminProfile(): Promise<Admin | null> {
    try {

        const token = await getCookies("accessToken")

        const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/admins/me`

        const response = await fetch(
            url,
            {
                method: "GET",
                headers: {
                    "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
                    "Authorization": `Bearer ${token}`,
                },
                cache: "no-store"
            }
        )

        const responseData: ResultData = await response.json()

        if (!response.ok) {
            console.log(responseData?.message)
            return null
        }

        return responseData.data

    } catch (error) {
        console.log(error)
        return null
    }
}

export default async function AdminProfilePage() {

    const adminData = await getAdminProfile()

    if (!adminData) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
                <div className="bg-white/70 backdrop-blur-lg p-6 rounded-xl shadow">
                    Sorry, admin data does not exist
                </div>
            </div>
        )
    }

    return (

        <div className="w-full min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-8">

            {/* HEADER */}
            <div className="mb-8 max-w-3xl mx-auto">

                <h1 className="text-2xl font-bold 
                bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 
                text-transparent bg-clip-text">

                    My Profile

                </h1>

                <p className="text-gray-600 text-sm">
                    Manage your administrator account information
                </p>

            </div>


            {/* PROFILE CARD */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/40 p-6 max-w-3xl mx-auto">

                {/* AVATAR */}
                <div className="flex items-center gap-4 mb-6">

                    <div className="w-14 h-14 rounded-full 
                    bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 
                    flex items-center justify-center text-white font-bold text-lg">

                        {adminData.name.charAt(0)}

                    </div>

                    <div>

                        <h2 className="font-semibold text-gray-800">
                            {adminData.name}
                        </h2>

                        <p className="text-sm text-gray-500">
                            Administrator
                        </p>

                    </div>

                </div>


                {/* FORM (TIDAK DIUBAH) */}
                <AdminProfileForm admin={adminData} />

            </div>

        </div>
    )
}