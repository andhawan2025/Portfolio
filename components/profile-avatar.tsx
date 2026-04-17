"use client"

import { useEffect, useState } from "react"

const CANDIDATES = [
  "/profile-photo.jpg",
  "/profile-photo.jpeg",
  "/profile-photo.png",
  "/profile-photo.webp",
  "/profile-photo.svg",
] as const

const FALLBACK_SVG = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128" fill="none">
    <rect width="128" height="128" rx="64" fill="#1e293b"/>
    <circle cx="64" cy="48" r="22" fill="#22d3ee" fill-opacity="0.9"/>
    <path d="M24 108C28 85 45 74 64 74C83 74 100 85 104 108" fill="#22d3ee" fill-opacity="0.85"/>
    <text x="64" y="122" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" fill="#94a3b8">AD</text>
  </svg>`
)

const DATA_URI = `data:image/svg+xml;charset=utf-8,${FALLBACK_SVG}`

const avatarClassName =
  "block h-[76px] w-[76px] shrink-0 rounded-full border-2 border-primary bg-muted object-cover lg:h-[92px] lg:w-[92px]"

async function exists(path: string): Promise<boolean> {
  try {
    const r = await fetch(path, { method: "HEAD", cache: "force-cache" })
    if (r.ok) return true
    if (r.status === 405) {
      const g = await fetch(path, { method: "GET", cache: "force-cache" })
      return g.ok
    }
    return false
  } catch {
    return false
  }
}

export function ProfileAvatar() {
  const [src, setSrc] = useState<string>(DATA_URI)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      for (const path of CANDIDATES) {
        if (await exists(path)) {
          if (!cancelled) setSrc(path)
          return
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <img
      src={src}
      alt="Profile photo"
      width={92}
      height={92}
      loading="eager"
      decoding="async"
      className={avatarClassName}
    />
  )
}
