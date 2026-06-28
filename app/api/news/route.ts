import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const topic = searchParams.get("topic")

  if (!topic) {
    return NextResponse.json(
      { error: "Le paramètre topic est requis" },
      { status: 400 }
    )
  }

  const res = await fetch(
    `https://newsapi.org/v2/everything?q=${topic}&language=fr&sortBy=publishedAt&pageSize=10`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEWS_API_KEY}`,
      },
    }
  )

  if (!res.ok) {
    return NextResponse.json(
      { error: "Erreur NewsAPI" },
      { status: 500 }
    )
  }

  const data = await res.json()

  return NextResponse.json({
    topic,
    count: data.articles?.length ?? 0,
    articles: data.articles ?? [],
  })
}