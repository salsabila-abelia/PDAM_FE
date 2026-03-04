"use client";

import { Services } from "@/app/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { getCookie } from "@/lib/client-cookies";
import { useRouter} from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";


const DeleteService = ({ selectedData }: { selectedData: Services 

}) => {
    const router = useRouter()
    const [open,setOpen] = useState<boolean>(false)

    const openModal = () => {
        setOpen(true)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()

            const token = await getCookie("accessToken")
            const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/services/${selectedData.id}`;

        const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
          Authorization: `Bearer ${token}`,
        }
      })

       const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        setOpen(false)
        setTimeout(() => router.refresh(), 1000)
      } else {
        toast.warning(result.message);
      }
    } catch (error) {
      toast.error(`Something wrong: ${error}`);
    }
  }


  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" onClick={openModal}>Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form onSubmit={handleSubmit}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure delete this data?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete service data {selectedData.name} 
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button type="submit">Continue</Button>
        </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteService;
