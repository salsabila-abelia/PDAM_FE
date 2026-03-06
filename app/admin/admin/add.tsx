"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { getCookie } from "@/lib/client-cookies"

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
import { Input } from "@/components/ui/input"

function AddAdmin() {

    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [loading, setLoading] = useState(false)

    const openModal = () => {
        setOpen(true)
        setName("")
        setPhone("")
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        try {
            const token = getCookie("accessToken")
            const username = phone
            const password = phone

            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/admins`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ username, password, name, phone }),
            })

            const result = await response.json()

            if (response.ok && result?.success) {
                alert("Berhasil menambah admin!")
                setOpen(false)
                router.refresh()
            } else {
                alert(`Gagal menambah admin: ${result?.message || "Terjadi kesalahan"}`)
            }

        } catch (error) {
            console.error(error)
            alert("Terjadi kesalahan saat koneksi ke server")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>

            {/* BUTTON ADD ADMIN */}
            <DialogTrigger asChild>
                <Button
                    onClick={openModal}
                    className="
                    bg-gradient-to-r 
                    from-pink-500 
                    via-purple-500 
                    to-blue-500
                    text-white
                    shadow-md
                    hover:scale-105
                    transition
                    duration-200
                    "
                >
                    + Add Admin
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-sm rounded-xl">

                <form onSubmit={handleSubmit}>

                    <DialogHeader>
                        <DialogTitle>Add Admin</DialogTitle>
                        <DialogDescription>
                            Masukkan nama dan nomor telepon admin
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">

                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
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
    )
}

export default AddAdmin