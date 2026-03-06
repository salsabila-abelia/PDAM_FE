import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-6 py-5 md:px-10">
        <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
          PDAM APP
        </h1>

        <Link
          href="/sign-in"
          className="rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 px-5 py-2.5 text-sm md:text-base font-semibold text-white shadow-lg shadow-purple-200 transition hover:scale-105"
        >
          Sign In
        </Link>
      </nav>

      {/* HERO */}
      <section className="px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          {/* LEFT */}
          <div>
            <p className="mb-4 inline-block rounded-full bg-white/60 px-4 py-2 text-sm font-medium text-purple-700 backdrop-blur-md border border-white/40">
              Smart Water Service Dashboard
            </p>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
              Water Service Management System
            </h2>

            <p className="mt-6 max-w-xl text-gray-600 text-base md:text-lg">
              Sistem manajemen pelanggan, layanan, dan administrator dengan
              tampilan modern, rapi, dan mudah digunakan.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/sign-in"
                className="rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 px-6 py-3 font-semibold text-white shadow-lg shadow-purple-200 transition hover:scale-105"
              >
                Login Dashboard
              </Link>

              <Link
                href="/sign-in"
                className="rounded-xl border border-white/40 bg-white/70 px-6 py-3 font-semibold text-gray-700 backdrop-blur-md transition hover:bg-white/90"
              >
                Get Started
              </Link> 
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 blur-2xl opacity-30"></div>

            <div className="relative rounded-3xl border border-white/40 bg-white/70 p-6 shadow-2xl backdrop-blur-xl">
              <div className="mb-5 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-pink-400"></div>
                <div className="h-3 w-3 rounded-full bg-purple-400"></div>
                <div className="h-3 w-3 rounded-full bg-blue-400"></div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-2xl border border-white/40 bg-white/80 p-5 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Customer Management
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Kelola data pelanggan dengan tampilan yang lebih rapi dan
                    terstruktur.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/40 bg-white/80 p-5 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Service Packages
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Atur paket layanan air berdasarkan pemakaian dengan mudah.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/40 bg-white/80 p-5 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Admin Dashboard
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Kontrol penuh untuk administrator dalam mengelola sistem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section className="px-6 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/40 bg-white/70 p-6 shadow-xl backdrop-blur-lg">
            <h3 className="text-lg font-semibold text-gray-800">
              Modern Interface
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Desain clean dengan nuansa gradient pink, ungu, dan biru.
            </p>
          </div>

          <div className="rounded-2xl border border-white/40 bg-white/70 p-6 shadow-xl backdrop-blur-lg">
            <h3 className="text-lg font-semibold text-gray-800">
              Responsive Layout
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Tampilan tetap nyaman digunakan di desktop maupun mobile.
            </p>
          </div>

          <div className="rounded-2xl border border-white/40 bg-white/70 p-6 shadow-xl backdrop-blur-lg">
            <h3 className="text-lg font-semibold text-gray-800">
              Easy Navigation
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Dari halaman awal langsung terhubung ke halaman sign-in.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
