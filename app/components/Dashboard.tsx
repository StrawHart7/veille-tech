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

function getTopics(): SavedTopic[] {
  if (typeof window === "undefined") return []
  return JSON.parse(localStorage.getItem("veille-topics") ?? "[]")
}

export default function Dashboard() {
  const [topics, setTopics] = useState<SavedTopic[]>([])

  useEffect(() => {
    setTopics(getTopics())
  }, [])

  function removeTopic(slug: string) {
    const updated = topics.filter((t) => t.slug !== slug)
    localStorage.setItem("veille-topics", JSON.stringify(updated))
    setTopics(updated)
  }

  if (topics.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center text-2xl mb-5">
          📡
        </div>
        <h2 className="text-lg font-semibold text-white mb-2">
          Aucun sujet suivi
        </h2>
        <p className="text-gray-500 text-sm mb-6 max-w-xs">
          Recherche un sujet et sauvegarde-le pour recevoir ses dernières news ici
        </p>
        <Link
          href="/search"
          className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
        >
          Rechercher un sujet
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {topics.map((topic) => (
        <div
          key={topic.slug}
          className="bg-gray-900/50 border border-white/5 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <Link
              href={`/topic/${topic.slug}`}
              className="group flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="font-semibold text-white capitalize group-hover:text-blue-400 transition-colors">
                {topic.slug}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5 text-gray-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <button
              onClick={() => removeTopic(topic.slug)}
              className="text-xs text-gray-600 hover:text-red-400 transition-colors px-2 py-1 rounded hover:bg-red-400/10"
            >
              Retirer
            </button>
          </div>

          <div className="flex flex-col divide-y divide-white/5">
            {topic.preview.map((article, i) => (
              <a
                key={i}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group py-3 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-blue-400">
                    {article.source.name}
                  </span>
                  <span className="text-xs text-gray-600">
                    {new Date(article.publishedAt).toLocaleDateString("fr-FR")}
                  </span>
                </div>
                <p className="text-sm text-gray-300 group-hover:text-white transition-colors line-clamp-1 leading-relaxed">
                  {article.title}
                </p>
              </a>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-white/5">
            <Link
              href={`/topic/${topic.slug}`}
              className="text-xs text-gray-500 hover:text-blue-400 transition-colors"
            >
              Voir tous les articles →
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}