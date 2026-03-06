/* eslint-disable react/no-unescaped-entities */
"use client"

import { getCookie } from "@/lib/client-cookies"
import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const AddService = () => {

    const router = useRouter()

    const [open, setOpen] = useState<boolean>(false)
    const [isShow, setIsShow] = useState<boolean>(false)

    const [name, setName] = useState<string>("")
    const [min_usage, setMinUsage] = useState<number>(0)
    const [max_usage, setMaxUsage] = useState<number>(0)
    const [price, setPrice] = useState<number>(0)

    const openModal = () => {
        setOpen(true)
        setIsShow(true)

        setName("")
        setMinUsage(0)
        setMaxUsage(0)
        setPrice(0)
    }

    const handleSubmit = async (e: FormEvent) => {

        try {

            e.preventDefault()

            const token = await getCookie("accessToken")

            const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/services`

            const payload = JSON.stringify({
                name,
                min_usage,
                max_usage,
                price
            })

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: payload
            })

            const result = await response.json()

            if (result?.success) {

                setIsShow(false)
                toast.success(result.message)

                setOpen(false)

                setTimeout(() => {
                    router.refresh()
                }, 1000)

            } else {

                toast.warning(result.message)

            }

        } catch (error) {

            console.log(error)
            toast.error(`Sorry, something went wrong, ${error}`)

        }

    }

    return (

        <div>

            <Dialog open={open} onOpenChange={setOpen}>

                {/* BUTTON GRADIENT */}
                <DialogTrigger asChild>

                    <Button
                        onClick={openModal}
                        className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white border-0 shadow-lg hover:opacity-90 transition"
                    >
                        Add Data Service
                    </Button>

                </DialogTrigger>

                <DialogContent className="sm:max-w-sm">

                    <form onSubmit={handleSubmit}>

                        <DialogHeader>

                            <DialogTitle>
                                Add Service
                            </DialogTitle>

                            <DialogDescription>
                                Make changes to your services here. Click save when you're done.
                            </DialogDescription>

                        </DialogHeader>

                        <FieldGroup>

                            <Field>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Field>

                            <Field>
                                <Label htmlFor="price">Price</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(Number(e.target.value))}
                                />
                            </Field>

                            <Field>
                                <Label htmlFor="min_usage">Min Usage</Label>
                                <Input
                                    id="min_usage"
                                    type="number"
                                    value={min_usage}
                                    onChange={(e) => setMinUsage(Number(e.target.value))}
                                />
                            </Field>

                            <Field>
                                <Label htmlFor="max_usage">Max Usage</Label>
                                <Input
                                    id="max_usage"
                                    type="number"
                                    value={max_usage}
                                    onChange={(e) => setMaxUsage(Number(e.target.value))}
                                />
                            </Field>

                        </FieldGroup>

                        <DialogFooter>

                            <DialogClose asChild>

                                <Button variant="outline">
                                    Cancel
                                </Button>

                            </DialogClose>

                            <Button
                                type="submit"
                                className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white border-0 hover:opacity-90"
                            >
                                Save Changes
                            </Button>

                        </DialogFooter>

                    </form>

                </DialogContent>

            </Dialog>

        </div>

    )
}

export default AddService