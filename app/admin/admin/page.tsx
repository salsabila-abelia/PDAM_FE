import { getCookies } from "@/lib/server-cookie";
import { Admin } from "@/app/types";
import Search from "@/components/Search";
import Pagination from "@/components/pagination";
import EditAdmin from "./edit";
import DeleteAdmin from "./delete";
import AddAdmin from "./add";
import ResetPasswordAdmin from "./resetpw";

type ResultData = {
  success: boolean;
  message: string;
  data: Admin[];
  count: number;
};

async function getAdmins(
  page: number,
  quantity: number,
  search: string,
): Promise<ResultData> {
  try {
    const token = await getCookies("accessToken");

    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/admins?page=${page}&quantity=${quantity}&search=${search}`;

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
        message: responseData.message,
        data: [],
        count: 0,
      };
    }

    return responseData;
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to fetch admins",
      data: [],
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

export default async function AdminPage(props: Props) {
  const page = (await props.searchParams)?.page || 1;
  const quantity = (await props.searchParams)?.quantity || 5;
  const search = (await props.searchParams)?.search || "";

  const { count, data: admins } = await getAdmins(page, quantity, search);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-8">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
          Admin Management
        </h1>

        <p className="text-gray-600 text-sm mt-1">
          Manage administrator accounts in your system
        </p>
      </div>

      {/* SEARCH + ADD BUTTON */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        {/* SEARCH */}
        <div className="w-full md:max-w-md">
          <Search url="/admin/admin" search={search} />
        </div>

        {/* ADD ADMIN BUTTON */}
        <div className="flex justify-start md:justify-end">
          <div className="relative group">
            {/* gradient glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 rounded-xl blur opacity-60 group-hover:opacity-100 transition"></div>

            <div className="relative">
              <AddAdmin />
            </div>
          </div>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/40 overflow-hidden">
        {/* TABLE HEADER */}
        <div className="px-6 py-4 border-b border-white/40 flex items-center justify-between">
          <h2 className="font-semibold text-gray-700">Administrator List</h2>

          <span className="text-sm text-gray-500">Total: {count}</span>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-gray-600 text-sm uppercase tracking-wide">
              <tr className="border-b border-white/40">
                <th className="px-6 py-4 w-16">No</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4 text-center w-48">Action</th>
              </tr>
            </thead>

            <tbody>
              {admins.map((admin, index) => (
                <tr
                  key={admin.id}
                  className="border-b border-white/30 hover:bg-white/50 transition-all duration-200"
                >
                  <td className="px-6 py-4 text-gray-700">
                    {(page - 1) * quantity + index + 1}
                  </td>

                  {/* NAME */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 flex items-center justify-center text-white font-semibold text-sm">
                        {admin.name.charAt(0)}
                      </div>

                      <span className="font-semibold text-gray-800">
                        {admin.name}
                      </span>
                    </div>
                  </td>

                  {/* PHONE */}
                  <td className="px-6 py-4 text-gray-600">{admin.phone}</td>

                  {/* ACTION */}
                  <td className="px-6 py-4">
                    <div className="flex gap-2 justify-center">
                      <EditAdmin selectedData={admin} />
                      <DeleteAdmin selectedData={admin} />
                      <ResetPasswordAdmin selectedData={admin} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION */}
      <div className="mt-8 flex justify-center">
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg rounded-xl px-6 py-4">
          <Pagination count={count} currentPage={page} perPage={quantity} />
        </div>
      </div>
    </div>
  );
}
