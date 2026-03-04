import AddCustomer from "./add"
import { Services, Customer } from "@/app/types"
import { cookies } from "next/headers"

async function getServices(): Promise<Services[]> {
  const token = (await cookies()).get("token")?.value

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/services`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  )

  if (!response.ok) {
    throw new Error("Failed to fetch services")
  }

  return response.json()
}

async function getCustomers(): Promise<Customer[]> {
  const token = (await cookies()).get("token")?.value

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/customers`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  )

  if (!response.ok) {
    throw new Error("Failed to fetch customers")
  }

  return response.json()
}

export default async function Page() {
  const services = await getServices()
  const customers = await getCustomers()

  return (
    <div className="p-6 space-y-4">
      <div className="ml-4">
        <AddCustomer serviceData={services} />
      </div>

      {/* Contoh render customer */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Customer List</h2>

        <ul className="mt-2 space-y-2">
          {customers.map((customer) => (
            <li
              key={customer.id}
              className="border p-3 rounded-md"
            >
              <p><strong>{customer.name}</strong></p>
              <p>{customer.username}</p>
              <p>{customer.phone}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}