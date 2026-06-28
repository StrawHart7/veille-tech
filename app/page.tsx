import Link from "next/link"
import Dashboard from "./components/Dashboard"

export default function HomePage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs text-blue-400 font-medium uppercase tracking-widest mb-1">
            Dashboard
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Tes sujets
          </h1>
        </div>
        <Link
          href="/search"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <span className="text-lg leading-none">+</span>
          <span className="hidden sm:inline">Nouveau sujet</span>
        </Link>
      </div>
      <Dashboard />
    </main>
  )
}