"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <main className="min-h-screen bg-gray-950 text-white p-8 max-w-3xl mx-auto flex flex-col items-center justify-center">
      <div className="text-5xl mb-4">⚠️</div>
      <h2 className="text-xl font-bold mb-2">Quelque chose s'est mal passé</h2>
      <p className="text-gray-400 text-sm mb-6">{error.message}</p>
      <button
        onClick={reset}
        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg transition-colors"
      >
        Réessayer
      </button>
    </main>
  )
}