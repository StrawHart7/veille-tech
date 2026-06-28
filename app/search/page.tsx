import SearchForm from "./SearchForm"

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">Rechercher un sujet</h1>
      <p className="text-gray-400 mt-2">
        Entre un sujet pour voir les dernières news
      </p>
      <SearchForm />
    </main>
  )
}