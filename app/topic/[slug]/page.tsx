import TopicSaver from "@/app/components/TopicSaver";

type Article = {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: { name: string };
};

type Props = {
  params: Promise<{ slug: string }>;
};

async function getNews(topic: string): Promise<Article[]> {
  const res = await fetch(
    `https://newsapi.org/v2/everything?q=${topic}&language=fr&sortBy=publishedAt&pageSize=10`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEWS_API_KEY}`,
      },
      next: { revalidate: 3600 }, // cache 1h
    },
  );

  if (!res.ok) throw new Error("Erreur lors de la récupération des news");

  const data = await res.json();
  return data.articles ?? [];
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  return {
    title: `${slug} — Veille Tech`,
    description: `Les dernières news sur ${slug}`,
  }
}

export default async function TopicPage({ params }: Props) {
  const { slug } = await params;
  const articles = await getNews(slug);

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8 max-w-3xl mx-auto">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">
            Sujet : <span className="text-blue-400">{slug}</span>
          </h1>
          <p className="text-gray-400">{articles.length} articles trouvés</p>
        </div>
        <TopicSaver slug={slug} />
      </div>

      <div className="flex flex-col gap-4">
        {articles.map((article, i) => (
          <a
            key={i}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-blue-500 transition-colors group"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-blue-400 font-medium">
                {article.source.name}
              </span>
              <span className="text-xs text-gray-600">
                {new Date(article.publishedAt).toLocaleDateString("fr-FR")}
              </span>
            </div>
            <h2 className="font-semibold text-white group-hover:text-blue-400 transition-colors mb-2">
              {article.title}
            </h2>
            <p className="text-gray-400 text-sm line-clamp-2">
              {article.description}
            </p>
          </a>
        ))}
      </div>
    </main>
  );
}
