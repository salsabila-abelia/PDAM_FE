"use client"

import { Admin } from "@/app/types"
import { getCookie } from "@/lib/client-cookies"
import { useRouter } from "next/navigation"
import { useState, FormEvent } from "react"
import { toast } from "react-toastify"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Props = {
    selectedData: Admin
}

export default function EditAdmin({ selectedData }: Props) {

    const router = useRouter()
    const [open, setOpen] = useState<boolean>(false)

    const [name, setName] = useState<string>("")
    const [phone, setPhone] = useState<string>("")

    const openModal = () => {
        setOpen(true)
        setName(selectedData.name)
        setPhone(selectedData.phone)
    }

    const handleSubmit = async (e: FormEvent) => {

        try {

            e.preventDefault()

            const token = getCookie("accessToken")

            const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/admins/${selectedData.id}`

            const payload = JSON.stringify({
                name,
                phone
            })

            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
                    Authorization: `Bearer ${token}`,
                },
                body: payload
            })

            const result = await response.json()

            if (result?.success) {
                toast.success(result.message)
                setOpen(false)
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast.warning(result.message)
            }

        } catch (error) {
            toast.error(`Something went wrong, ${error}`)
        }

    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>

            <DialogTrigger asChild>
                <Button onClick={openModal} variant="outline">
                    Edit
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-sm">

                <form onSubmit={handleSubmit}>

                    <DialogHeader>
                        <DialogTitle>Edit Admin</DialogTitle>
                        <DialogDescription>
                            Update admin data here
                        </DialogDescription>
                    </DialogHeader>

                    <FieldGroup>
                        <Field>
                            <Label>Name</Label>
                            <Input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Field>

                        <Field>
                            <Label>Phone</Label>
                            <Input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </Field>
                    </FieldGroup>

                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button type="submit">
                            Save changes
                        </Button>
                    </DialogFooter>

                </form>

            </DialogContent>

        </Dialog>
    )

}