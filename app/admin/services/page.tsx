import { Services } from "@/app/types";
import { getCookies } from "@/lib/server-cookie";
import AddService from "./add";
import DeleteService from "./delete";
import EditService from "./edit";
import Search from "@/components/Search";
import Pagination from "@/components/pagination";

type ResultData = {
  success: boolean;
  data: Services[];
  message: string;
  count: number;
};

async function getServices(
  page: number,
  quantity: number,
  search: string
): Promise<ResultData> {
  try {
    const token = await getCookies("accessToken");

    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/services?page=${page}&quantity=${quantity}&search=${search}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const responseData: ResultData = await response.json();

    if (!response.ok) {
      return {
        success: false,
        data: [],
        message: responseData.message,
        count: 0,
      };
    }

    return responseData;
  } catch (error) {
    console.log(error);

    return {
      success: false,
      data: [],
      message: "Failed to fetch services",
      count: 0,
    };
  }
}

type Props = {
  searchParams: Promise<{
    page?: number;
    quantity?: number;
    search?: string;
  }>;
};

export default async function ServicesPage(prop: Props) {
  const page = (await prop.searchParams).page || 1;
  const quantity = (await prop.searchParams).quantity || 5;
  const search = (await prop.searchParams).search || "";

  const { count: counts, data: services } = await getServices(
    page,
    quantity,
    search
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-8">

      {/* HEADER */}
      <div className="mb-8">

        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
          Services Management
        </h1>

        <p className="text-gray-600 text-sm mt-1">
          Manage water service packages
        </p>

      </div>


      {/* SEARCH + ADD BUTTON */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div className="w-full md:max-w-md">
          <Search search={search ?? ""} url="/admin/services" />
        </div>

        <div className="relative group">

          {/* gradient glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 rounded-xl blur opacity-60 group-hover:opacity-100 transition"></div>

          <div className="relative">
            <AddService />
          </div>

        </div>

      </div>


      {/* SERVICE CARDS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {services.length === 0 ? (

          <div className="col-span-full text-center text-gray-500">
            Data service tidak ada
          </div>

        ) : (

          services.map((service) => (

            <div
              key={service.id}
              className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/40 p-6 space-y-4 hover:scale-[1.02] transition"
            >

              {/* TITLE */}
              <h2 className="text-lg font-semibold text-gray-800">
                {service.name}
              </h2>


              {/* PRICE */}
              <p className="text-sm text-gray-600">
                <span className="font-medium">Harga:</span>{" "}
                Rp {service.price}
              </p>


              {/* USAGE */}
              <p className="text-sm text-gray-600">
                <span className="font-medium">Pemakaian:</span>{" "}
                {service.min_usage} - {service.max_usage}
              </p>


              {/* ACTION */}
              <div className="flex gap-2 pt-2">

                <EditService selectedData={service} />

                <DeleteService selectedData={service} />

              </div>

            </div>

          ))

        )}

      </div>


      {/* PAGINATION */}
      <div className="mt-8 flex justify-center">

        <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg rounded-xl px-6 py-4">

          <Pagination
            count={counts}
            perPage={quantity}
            currentPage={page}
          />

        </div>

      </div>

    </div>
  );
}