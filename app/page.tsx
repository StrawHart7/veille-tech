import Link from "next/link"
import Dashboard from "./components/Dashboard"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white p-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold">Veille Tech</h1>
          <p className="text-gray-400 mt-1">Tes sujets sauvegardés</p>
        </div>
        <Link
          href="/search"
          className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          + Nouveau sujet
        </Link>
      </div>

      <Dashboard />
    </main>
  )
}