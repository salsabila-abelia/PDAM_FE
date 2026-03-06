"use client"

import { useState } from "react"
import { Admin } from "@/app/types"

type Props = {
    admin: Admin
}

export default function AdminProfileForm({ admin }: Props) {

    const [isEdit, setIsEdit] = useState(false)

    const [profile, setProfile] = useState({
        name: admin.name,
        username: admin.user.username,
        phone: admin.phone,
    })

    return (

        <div className="w-full">

            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/40">

                {/* HEADER */}
                <div className="flex items-center justify-between mb-6">

                    <h2 className="text-lg font-semibold text-gray-800">
                        Admin Profile
                    </h2>

                    {!isEdit ? (

                        <button
                            onClick={() => setIsEdit(true)}
                            className="px-4 py-2 text-sm rounded-lg 
                            bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 
                            text-white hover:opacity-90 transition"
                        >
                            Edit
                        </button>

                    ) : (

                        <div className="flex gap-2">

                            <button
                                onClick={() => {
                                    setProfile({
                                        name: admin.name,
                                        username: admin.user.username,
                                        phone: admin.phone,
                                    })
                                    setIsEdit(false)
                                }}
                                className="px-4 py-2 text-sm rounded-lg 
                                bg-gray-200 text-gray-700 hover:bg-gray-300"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => {
                                    console.log("submit", profile)
                                    setIsEdit(false)
                                }}
                                className="px-4 py-2 text-sm rounded-lg 
                                bg-green-600 text-white hover:bg-green-700"
                            >
                                Save
                            </button>

                        </div>

                    )}

                </div>


                {/* FORM */}
                <div className="space-y-4">

                    {/* NAME */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">
                            Name
                        </label>

                        <input
                            type="text"
                            value={profile.name}
                            disabled={!isEdit}
                            onChange={(e) =>
                                setProfile({ ...profile, name: e.target.value })
                            }
                            className={`w-full rounded-lg border px-3 py-2 text-sm 
                            ${isEdit
                                    ? "border-gray-300 focus:ring-2 focus:ring-purple-400"
                                    : "bg-gray-100 border-gray-200 text-gray-500"
                                }`}
                        />
                    </div>


                    {/* USERNAME */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">
                            Username
                        </label>

                        <input
                            type="text"
                            value={profile.username}
                            disabled={!isEdit}
                            onChange={(e) =>
                                setProfile({ ...profile, username: e.target.value })
                            }
                            className={`w-full rounded-lg border px-3 py-2 text-sm 
                            ${isEdit
                                    ? "border-gray-300 focus:ring-2 focus:ring-purple-400"
                                    : "bg-gray-100 border-gray-200 text-gray-500"
                                }`}
                        />
                    </div>


                    {/* PHONE */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">
                            Phone
                        </label>

                        <input
                            type="tel"
                            value={profile.phone}
                            disabled={!isEdit}
                            onChange={(e) =>
                                setProfile({ ...profile, phone: e.target.value })
                            }
                            className={`w-full rounded-lg border px-3 py-2 text-sm 
                            ${isEdit
                                    ? "border-gray-300 focus:ring-2 focus:ring-purple-400"
                                    : "bg-gray-100 border-gray-200 text-gray-500"
                                }`}
                        />
                    </div>

                </div>

            </div>

        </div>

    )
}