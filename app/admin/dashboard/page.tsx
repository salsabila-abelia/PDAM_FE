/* eslint-disable @typescript-eslint/no-explicit-any */
import { Admin } from "@/app/types";
import { getCookies } from "@/lib/server-cookie";

type ResultData = {
    success: boolean,
    data: Admin,
    message: string,
}

async function getAdminProfile(): Promise<Admin | null> {
    try {
        const token = await getCookies('accessToken');

        const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/admins/me`

        const response = await fetch(url,{
            method: "GET",
            headers:{
                "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
                "Authorization": `Bearer ${token}`,
            },
            cache:"no-store"
        })

        const responseData: ResultData = await response.json()

        if(!response.ok){
            console.log(responseData.message)
            return null
        }

        return responseData.data

    } catch (error) {
        console.log(error)
        return null
    }
}


/* ============================
   TAMBAHAN API (TIDAK MENGUBAH YANG ADA)
============================ */

async function getCustomers(){
    try{

        const token = await getCookies("accessToken")

        const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/customers?quantity=5`

        const response = await fetch(url,{
            method:"GET",
            headers:{
                "APP-KEY":process.env.NEXT_PUBLIC_APP_KEY || "",
                "Authorization":`Bearer ${token}`
            },
            cache:"no-store"
        })

        const result = await response.json()

        if(!response.ok){
            return {data:[],count:0}
        }

        return {
            data:result.data,
            count:result.count
        }

    }catch(error){
        console.log(error)
        return {data:[],count:0}
    }
}

async function getServicesCount(){
    try{

        const token = await getCookies("accessToken")

        const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/services?quantity=1`

        const response = await fetch(url,{
            method:"GET",
            headers:{
                "APP-KEY":process.env.NEXT_PUBLIC_APP_KEY || "",
                "Authorization":`Bearer ${token}`
            },
            cache:"no-store"
        })

        const result = await response.json()

        if(!response.ok) return 0

        return result.count

    }catch(error){
        console.log(error)
        return 0
    }
}

async function getPayments(){
    try{

        const token = await getCookies("accessToken")

        const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/payments`

        const response = await fetch(url,{
            method:"GET",
            headers:{
                "APP-KEY":process.env.NEXT_PUBLIC_APP_KEY || "",
                "Authorization":`Bearer ${token}`
            },
            cache:"no-store"
        })

        const result = await response.json()

        if(!response.ok) return []

        return result.data

    }catch(error){
        console.log(error)
        return []
    }
}

async function getWaterUsage(){
    try{

        const token = await getCookies("accessToken")

        const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/usages`

        const response = await fetch(url,{
            method:"GET",
            headers:{
                "APP-KEY":process.env.NEXT_PUBLIC_APP_KEY || "",
                "Authorization":`Bearer ${token}`
            },
            cache:"no-store"
        })

        const result = await response.json()

        if(!response.ok) return []

        return result.data

    }catch(error){
        console.log(error)
        return []
    }
}



export default async function AdminDashboardPage(){

    const adminData = await getAdminProfile()

    if(adminData == null){
        return(
            <div className="p-6">
                Admin data not found
            </div>
        )
    }

    const {data:recentCustomers,count:totalCustomers} = await getCustomers()
    const totalServices = await getServicesCount()
    const payments = await getPayments()
    const waterUsage = await getWaterUsage()

    return(

        <div className="w-full p-6 space-y-6">

            {/* HEADER */}
            <div className="bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 p-6 rounded-xl shadow">

                <h1 className="text-2xl font-bold text-gray-700">
                    Welcome, {adminData.name}
                </h1>

                <p className="text-gray-600">
                    PDAM Management Dashboard
                </p>

            </div>


            {/* STAT CARDS */}

            <div className="grid md:grid-cols-3 gap-4">

                <div className="bg-white rounded-xl shadow p-4 border-l-4 border-blue-400">
                    <p className="text-gray-500 text-sm">
                        Total Customers
                    </p>

                    <h2 className="text-3xl font-bold text-blue-500 mt-2">
                        {totalCustomers}
                    </h2>
                </div>


                <div className="bg-white rounded-xl shadow p-4 border-l-4 border-purple-400">
                    <p className="text-gray-500 text-sm">
                        Payments
                    </p>

                    <h2 className="text-3xl font-bold text-purple-500 mt-2">
                        {payments.length}
                    </h2>
                </div>


                <div className="bg-white rounded-xl shadow p-4 border-l-4 border-pink-400">
                    <p className="text-gray-500 text-sm">
                        Total Services
                    </p>

                    <h2 className="text-3xl font-bold text-pink-500 mt-2">
                        {totalServices}
                    </h2>
                </div>

            </div>



            {/* CHART SECTION */}

            <div className="grid md:grid-cols-2 gap-4">

                {/* WATER USAGE */}

                <div className="bg-white rounded-xl shadow p-4">

                    <h2 className="font-bold text-gray-700 mb-4">
                        Water Usage
                    </h2>

                    <div className="space-y-2">

                        {waterUsage.slice(0,5).map((item:any)=>(
                            <div
                                key={item.id}
                                className="flex justify-between text-sm border-b pb-1"
                            >
                                <span>{item.month}</span>
                                <span className="font-semibold">
                                    {item.total_usage} m³
                                </span>
                            </div>
                        ))}

                    </div>

                </div>


                {/* PAYMENT CHART */}

                <div className="bg-white rounded-xl shadow p-4">

                    <h2 className="font-bold text-gray-700 mb-4">
                        Payments
                    </h2>

                    <div className="space-y-2">

                        {payments.slice(0,5).map((item:any)=>(
                            <div
                                key={item.id}
                                className="flex justify-between text-sm border-b pb-1"
                            >
                                <span>{item.customer?.name}</span>
                                <span className="font-semibold text-green-600">
                                    Rp {item.total}
                                </span>
                            </div>
                        ))}

                    </div>

                </div>

            </div>



            {/* RECENT CUSTOMER */}

            <div className="bg-white rounded-xl shadow p-4">

                <h2 className="font-bold text-gray-700 mb-4">
                    Recent Customers
                </h2>

                <table className="w-full text-sm">

                    <thead className="bg-gray-100">

                        <tr>
                            <th className="p-2 text-left">Name</th>
                            <th className="p-2 text-left">Service</th>
                            <th className="p-2 text-left">Phone</th>
                        </tr>

                    </thead>


                    <tbody>

                        {recentCustomers.map((customer:any)=>(
                            <tr
                                key={customer.id}
                                className="border-b"
                            >

                                <td className="p-2">
                                    {customer.name}
                                </td>

                                <td className="p-2">
                                    {customer.service?.name}
                                </td>

                                <td className="p-2">
                                    {customer.phone}
                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>


        </div>

    )
}