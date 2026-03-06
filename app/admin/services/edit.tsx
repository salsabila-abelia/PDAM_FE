"use client"

import { Services } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCookie } from "@/lib/client-cookies";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

const EditService = ({
    selectedData
}: {
    selectedData: Services
}) => {
    const router = useRouter()
    const [open, setOpen] = useState<boolean>(false)
    const [name, setName] = useState<string>("")
    const [min_usage, setMinUsage] = useState<number>(0)
    const [max_usage, setMaxUsage] = useState<number>(0)
    const [price, setPrice] = useState<number>(0)

    const openModal = () => {
        setOpen(true)
        setName(selectedData.name)
        setMinUsage(selectedData.min_usage)
        setMaxUsage(selectedData.max_usage)
        setPrice(selectedData.price)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()

            const token = await getCookie("accessToken");
            const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/services/${selectedData.id}`;
            const playload = JSON.stringify({
                name,
                min_usage,
                max_usage,
                price
            })

            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
                    "Authorization": `Bearer ${token}`,
                },
                body: playload
            })
            const result = await response.json()
            if (result?.success) {
                toast.success(result.message)
                setOpen(false)
                setTimeout(() => router.refresh(), 1000);
            } else {
                toast.warning(result.message)
            }
        } catch (error) {
            toast.error(`Sorry, something went wrong, ${error}`)
        }
    }
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button onClick={openModal} variant="outline">Edit</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                    <form onSubmit={handleSubmit}>
                        <DialogHeader>
                            <DialogTitle>Edit Service</DialogTitle>
                            <DialogDescription>
                                Make changes to your services here. Click save when you&apos;re
                                done.
                            </DialogDescription>
                        </DialogHeader>
                        <FieldGroup>
                            <Field>
                                <Label htmlFor="name-1">Name</Label>
                                <Input id="name-1" name="name" type="text" defaultValue="Service Name" value={name} onChange={(e) => setName(e.target.value)} />
                            </Field>
                            <Field>
                                <Label htmlFor="username-1">Price</Label>
                                <Input id="username-1" name="price" type="number" defaultValue="0" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                            </Field>
                            <Field>
                                <Label htmlFor="min_usage">Min Usage</Label>
                                <Input id="min_usage" name="min_usage" type="number" defaultValue="0" value={min_usage} onChange={(e) => setMinUsage(Number(e.target.value))} />
                            </Field>
                            <Field>
                                <Label htmlFor="max_usage">Max Usage</Label>
                                <Input id="max_usage" name="max_usage" type="number" defaultValue="0" value={max_usage} onChange={(e) => setMaxUsage(Number(e.target.value))} />
                            </Field>
                        </FieldGroup>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
export default EditService