"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SearchForm() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    router.push(`/topic/${query.trim().toLowerCase()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex gap-3">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="ex: react, intelligence artificielle, startup..."
        className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors"
      >
        Rechercher
      </button>
    </form>
  )
}