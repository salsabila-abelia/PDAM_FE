import { Services } from "@/app/types";
import { Button } from "@/components/ui/button";
import { getCookies } from "@/lib/server-cookie";
import AddService from "./add";
import { Package, Tag, Clock, ChevronRight } from "lucide-react"; // Import ikon
import Search from "@/components/Search";

type ResultData = {
    success: boolean,
    data: Services[],
    message: string,
    count: number,
}

async function getServices(page: number, quantity: number, search: string): Promise<ResultData> {
    try {
        const token = await getCookies('accessToken');
        const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/services?page=${page}&quantity=${quantity}&search=${search}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
                "Authorization": `Bearer ${token}`,
            },
            cache: "no-store",
        });

        const responseData: ResultData = await response.json();

        if (!response.ok) {
            console.log(responseData.message);
            return {
                success: responseData.success,
                message: responseData.message,
                data: [],
                count: 0,
            };
        }
        return {
            success: responseData.success,
            message: responseData.message,
            data: responseData.data,
            count: responseData.count,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "failed to fetch services",
            data: [],
            count: 0,
        };
    }
}

type Props = {
    searchParams: Promise<{
        page?: number,
        quantity?: number,
        search?: string,
    }>
}

export default async function ServicesPage(prop: Props) {
    const page = (await prop.searchParams)?.page || 1
    const quantity = (await prop.searchParams)?.quantity || 5
    const search = (await prop.searchParams)?.search || ""
    const {count: counts, data: services} = await getServices(page, quantity, search)

    return (
        <div className="p-6 lg:p-10 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Daftar Layanan</h1>
                    <p className="text-slate-500 mt-1">Kelola semua layanan jasa Anda di sini.</p>
                </div>
            </div>

            <div className="flex justify-between items-center m-4">
                {/* Search Bar */}
                <div className="flex items-center w-full max-w-md grow">
                    <Search search={search ?? ``}/>
                </div>

                {/* Add Button */}
                <div className="ml-4">
                    <AddService />
                </div>
            </div>

            {/* Content Section */}
            {services.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                    <Package className="w-12 h-12 text-slate-300 mb-4" />
                    <p className="text-slate-500 font-medium">Data service tidak ditemukan</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="group bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <Tag size={20} />
                                </div>
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                    Service ID: #{service.id.toString().slice(-4)}
                                </span>
                            </div>

                            <h2 className="text-xl font-semibold text-slate-800 mb-2 capitalize">
                                {service.name}
                            </h2>

                            <div className="space-y-3">
                                <div className="flex items-center text-slate-600">
                                    <span className="text-2xl font-bold text-blue-600">
                                        Rp {Number(service.price).toLocaleString('id-ID')}
                                    </span>
                                </div>

                                <hr className="border-slate-100" />

                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                    <Clock size={16} />
                                    <span>Durasi Penggunaan:</span>
                                    <span className="font-medium text-slate-700">
                                        {service.min_usage} - {service.max_usage} Unit
                                    </span>

                                </div>
                            </div>

                            <Button className="w-full mt-6 variant-outline group-hover:bg-slate-900 group-hover:text-white transition-colors">
                                Detail Layanan
                                <ChevronRight size={16} className="ml-2" />
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}