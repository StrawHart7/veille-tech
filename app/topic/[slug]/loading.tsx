export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-950 text-white p-8 max-w-3xl mx-auto">
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="h-9 w-48 bg-gray-800 rounded-lg animate-pulse mb-2" />
          <div className="h-4 w-24 bg-gray-800 rounded animate-pulse" />
        </div>
        <div className="h-9 w-28 bg-gray-800 rounded-lg animate-pulse" />
      </div>

      <div className="flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="bg-gray-900 border border-gray-800 rounded-xl p-5"
          >
            <div className="flex gap-2 mb-3">
              <div className="h-3 w-20 bg-gray-800 rounded animate-pulse" />
              <div className="h-3 w-16 bg-gray-800 rounded animate-pulse" />
            </div>
            <div className="h-5 w-full bg-gray-800 rounded animate-pulse mb-2" />
            <div className="h-4 w-3/4 bg-gray-800 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </main>
  )
}