"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type Article = {
  title: string
  url: string
  source: { name: string }
  publishedAt: string
}

type SavedTopic = {
  slug: string
  savedAt: string
  preview: Article[]
}

export default function TopicSaver({ slug }: { slug: string }) {
  const [saved, setSaved] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const topics: SavedTopic[] = JSON.parse(
      localStorage.getItem("veille-topics") ?? "[]"
    )
    setSaved(topics.some((t) => t.slug === slug))
  }, [slug])

  async function handleSave() {
    const topics: SavedTopic[] = JSON.parse(
      localStorage.getItem("veille-topics") ?? "[]"
    )

    if (saved) {
      const updated = topics.filter((t) => t.slug !== slug)
      localStorage.setItem("veille-topics", JSON.stringify(updated))
      setSaved(false)
      return
    }

    // Fetch preview via notre API
    const res = await fetch(`/api/news?topic=${slug}`)
    const data = await res.json()

    const newTopic: SavedTopic = {
      slug,
      savedAt: new Date().toISOString(),
      preview: data.articles.slice(0, 3),
    }

    localStorage.setItem(
      "veille-topics",
      JSON.stringify([...topics, newTopic])
    )
    setSaved(true)
    router.refresh()
  }

  return (
    <button
      onClick={handleSave}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        saved
          ? "bg-blue-600 hover:bg-red-600 text-white"
          : "bg-gray-800 hover:bg-blue-600 text-gray-300 hover:text-white"
      }`}
    >
      {saved ? "✓ Sauvegardé" : "+ Sauvegarder"}
    </button>
  )
}