"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

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

export default function Dashboard() {
  const [topics, setTopics] = useState<SavedTopic[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = JSON.parse(
      localStorage.getItem("veille-topics") ?? "[]"
    )
    setTopics(saved)
  }, [])

  function removeTopic(slug: string) {
    const updated = topics.filter((t) => t.slug !== slug)
    localStorage.setItem("veille-topics", JSON.stringify(updated))
    setTopics(updated)
  }

  if (!mounted) return null

  if (topics.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-5xl mb-4">📡</div>
        <h2 className="text-xl font-semibold mb-2">Aucun sujet sauvegardé</h2>
        <p className="text-gray-400 mb-6">
          Recherche un sujet et sauvegarde-le pour le suivre ici
        </p>
        <Link
          href="/search"
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg transition-colors"
        >
          Rechercher un sujet
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      {topics.map((topic) => (
        <div key={topic.slug}>
          <div className="flex items-center justify-between mb-3">
            <Link
              href={`/topic/${topic.slug}`}
              className="text-xl font-bold hover:text-blue-400 transition-colors capitalize"
            >
              {topic.slug} →
            </Link>
            <button
              onClick={() => removeTopic(topic.slug)}
              className="text-xs text-gray-600 hover:text-red-400 transition-colors"
            >
              Retirer
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {topic.preview.map((article, i) => (
              <a
                key={i}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 hover:border-blue-500 transition-colors group"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-blue-400">
                    {article.source.name}
                  </span>
                  <span className="text-xs text-gray-600">
                    {new Date(article.publishedAt).toLocaleDateString("fr-FR")}
                  </span>
                </div>
                <p className="text-sm text-gray-300 group-hover:text-white transition-colors line-clamp-1">
                  {article.title}
                </p>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}