"use client"

import { useEffect, useState } from "react"

export default function OfflineBanner() {
  const [status, setStatus] = useState<"offline" | "back-online" | null>(null)

  useEffect(() => {
    const handleOffline = () => setStatus("offline")
    const handleOnline = () => {
      setStatus("back-online")
      setTimeout(() => setStatus(null), 3000)
    }

    // Vérification initiale sans setState synchrone
    const initialCheck = () => {
      if (!navigator.onLine) handleOffline()
    }

    initialCheck()

    window.addEventListener("offline", handleOffline)
    window.addEventListener("online", handleOnline)

    return () => {
      window.removeEventListener("offline", handleOffline)
      window.removeEventListener("online", handleOnline)
    }
  }, [])

  if (!status) return null

  const isOffline = status === "offline"

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-gray-900 text-gray-400 text-xs backdrop-blur-md">
        <span className={`text-[8px] ${isOffline ? "text-red-400" : "text-green-400"}`}>
          ●
        </span>
        {isOffline
          ? "Vous êtes hors ligne — contenu mis en cache affiché"
          : "De retour en ligne"}
      </div>
    </div>
  )
}