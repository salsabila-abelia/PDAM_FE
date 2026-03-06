"use client";

import Link from "next/link";
import { useState } from "react";
import { storeCookie } from "@/lib/client-cookies";

export default function SignUpPage() {
  const [username, setUsername] = useState<string>("");
  // const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const [phone, setPhone] = useState<string>("");

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    try {
      const request = JSON.stringify({
        username,
        password,
        // name,
        // phone
      });
      const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "app-key": `${process.env.NEXT_PUBLIC_APP_KEY}`,
        },
        body: request,
      });
      if (!response.ok) {
        alert("Register failed");
        return;
      }
      const responseData = await response.json();
      storeCookie("accessToken", responseData.token, 1);
      if (responseData.role == "ADMIN") {
        window.location.href = "/admin/dashboard";
      } else if (responseData.role == "CUSTOMER") {
        window.location.href = "/customer/dashboard";
      }
      alert(responseData.message);
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 px-6 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-white/40 bg-white/50 shadow-2xl backdrop-blur-xl lg:grid-cols-2">
          {/* LEFT SIDE */}
          <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 p-10 text-white">
            <div>
              <Link
                href="/"
                className="inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-md transition hover:bg-white/25"
              >
                ← Back to Home
              </Link>
            </div>

            <div className="py-10">
              <p className="mb-3 text-sm uppercase tracking-[0.3em] text-white/80">
                PDAM APP
              </p>

              <h1 className="text-4xl font-bold leading-tight">
                Welcome back to your dashboard
              </h1>

              <p className="mt-4 max-w-md text-white/85">
                Kelola data admin, customer, dan layanan dengan tampilan
                modern, cepat, dan mudah digunakan.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-sm font-semibold">Admin Management</p>
                <p className="mt-1 text-sm text-white/80">
                  Kelola akun administrator sistem.
                </p>
              </div>

              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-sm font-semibold">Customer Management</p>
                <p className="mt-1 text-sm text-white/80">
                  Atur data pelanggan dan kebutuhan layanan.
                </p>
              </div>

              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-sm font-semibold">Service Packages</p>
                <p className="mt-1 text-sm text-white/80">
                  Kelola paket layanan air sesuai kebutuhan.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE / FORM */}
          <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <Link
                  href="/"
                  className="mb-4 inline-flex items-center text-sm font-medium text-gray-500 transition hover:text-purple-600 lg:hidden"
                >
                  ← Back to Home
                </Link>

                <h2 className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-3xl font-bold text-transparent">
                  Sign In
                </h2>

                <p className="mt-2 text-sm text-gray-600">
                  Masuk untuk melanjutkan ke dashboard sistem.
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSignIn}>
                <div>
                  <label
                    htmlFor="username"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-xl border border-white/50 bg-white/80 px-4 py-3 text-slate-900 outline-none transition placeholder:text-gray-400 focus:border-purple-300 focus:ring-4 focus:ring-purple-200/50"
                    placeholder="Masukkan username"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-white/50 bg-white/80 px-4 py-3 text-slate-900 outline-none transition placeholder:text-gray-400 focus:border-purple-300 focus:ring-4 focus:ring-purple-200/50"
                    placeholder="Masukkan password"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 px-4 py-3 font-semibold text-white shadow-lg shadow-purple-200 transition hover:scale-[1.02] hover:shadow-xl"
                >
                  Sign In
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-gray-500">
                Secure access for admin and customer dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}