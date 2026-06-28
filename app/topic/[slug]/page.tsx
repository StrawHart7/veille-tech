import TopicSaver from "@/app/components/TopicSaver"

type Article = {
  title: string
  description: string
  url: string
  publishedAt: string
  source: { name: string }
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  return {
    title: `${slug} — Veille Tech`,
    description: `Les dernières news sur ${slug}`,
  }
}

async function getNews(topic: string): Promise<Article[]> {
  const res = await fetch(
    `https://newsapi.org/v2/everything?q=${topic}&language=fr&sortBy=publishedAt&pageSize=10`,
    {
      headers: { Authorization: `Bearer ${process.env.NEWS_API_KEY}` },
      next: { revalidate: 3600 },
    }
  )
  if (!res.ok) throw new Error("Erreur lors de la récupération des news")
  const data = await res.json()
  return data.articles ?? []
}

export default async function TopicPage({ params }: Props) {
  const { slug } = await params
  const articles = await getNews(slug)

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-10">
        <div>
          <p className="text-xs text-blue-400 font-medium uppercase tracking-widest mb-1">
            Sujet
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white capitalize">
            {slug}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {articles.length} articles trouvés
          </p>
        </div>
        <TopicSaver slug={slug} />
      </div>

      {/* Grid articles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {articles.map((article, i) => (
          <a
            key={i}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-gray-900/50 border border-white/5 hover:border-blue-500/40 rounded-2xl p-5 flex flex-col gap-3 transition-all hover:bg-gray-900"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-blue-400 truncate">
                {article.source.name}
              </span>
              <span className="text-xs text-gray-600 shrink-0">
                {new Date(article.publishedAt).toLocaleDateString("fr-FR")}
              </span>
            </div>
            <h2 className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors leading-snug line-clamp-2">
              {article.title}
            </h2>
            {article.description && (
              <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mt-auto">
                {article.description}
              </p>
            )}
            <div className="flex items-center gap-1 text-xs text-gray-600 group-hover:text-blue-400 transition-colors mt-auto">
              Lire l'article
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </main>
  )
}