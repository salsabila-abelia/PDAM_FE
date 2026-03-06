"use client"

import { Services } from "@/app/types"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"

import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useState } from "react"

const AddCustomer = ({
    serviceData,
}: {
    serviceData: Services[]
}) => {

    const router = useRouter()

    const [open, setOpen] = useState(false)
    const [customerNumber, setCustomerNumber] = useState("")
    const [address, setAddress] = useState("")
    const [serviceId, setServiceId] = useState(0)
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [loading, setLoading] = useState(false)

    const openModal = () => {
        setOpen(true)
        setCustomerNumber("")
        setAddress("")
        setServiceId(0)
        setName("")
        setPhone("")
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        const username = customerNumber
        const password = customerNumber

        const payload = {
            username,
            password,
            customer_number: customerNumber,
            address,
            service_id: Number(serviceId),
            name,
            phone,
        }

        try {

            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/customers`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
                },
                body: JSON.stringify(payload),
            })

            if (response.ok) {
                setOpen(false)
                router.refresh()
                alert("Berhasil menambah customer!")
            } else {
                const errorData = await response.json()
                alert(`Gagal: ${errorData.message || "Terjadi kesalahan"}`)
            }

        } catch (error) {
            console.error("Error:", error)
            alert("Koneksi ke server gagal!")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>

                {/* BUTTON ADD CUSTOMER */}
                <DialogTrigger asChild>
                    <button
                        onClick={openModal}
                        className="
                        px-5 py-2.5
                        rounded-lg
                        text-white
                        font-semibold
                        bg-gradient-to-r
                        from-pink-500
                        via-purple-500
                        to-blue-500
                        hover:opacity-90
                        transition
                        shadow-md
                        "
                    >
                        Add Data Customer
                    </button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-sm">

                    <form onSubmit={handleSubmit}>

                        <DialogHeader>
                            <DialogTitle>Add Customer</DialogTitle>
                            <DialogDescription>
                                Isi data customer dengan lengkap lalu klik save.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto px-1">

                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="customerNumber">Customer ID</Label>
                                <Input
                                    id="customerNumber"
                                    type="text"
                                    value={customerNumber}
                                    onChange={(e) => setCustomerNumber(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>

                            <div>
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="address"
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>

                            <div>
                                <Label htmlFor="service">Service</Label>

                                <select
                                    id="service"
                                    className="w-full border rounded-md p-2 text-sm"
                                    value={serviceId}
                                    onChange={(e) => setServiceId(Number(e.target.value))}
                                    required
                                >
                                    <option value="">
                                        Pilih Service
                                    </option>

                                    {serviceData.map((service) => (
                                        <option
                                            key={service.id}
                                            value={service.id}
                                        >
                                            {service.name}
                                        </option>
                                    ))}

                                </select>

                            </div>

                        </div>

                        <DialogFooter className="gap-2">

                            <DialogClose asChild>
                                <Button
                                    variant="outline"
                                    type="button"
                                    disabled={loading}
                                >
                                    Cancel
                                </Button>
                            </DialogClose>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="
                                bg-gradient-to-r
                                from-pink-500
                                via-purple-500
                                to-blue-500
                                text-white
                                hover:opacity-90
                                "
                            >
                                {loading ? "Saving..." : "Save"}
                            </Button>

                        </DialogFooter>

                    </form>

                </DialogContent>

            </Dialog>
        </div>
    )
}

export default AddCustomer