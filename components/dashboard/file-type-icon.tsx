interface FileTypeIconProps {
  fileName: string
  className?: string
}

export function FileTypeIcon({ fileName, className = "h-10 w-10" }: FileTypeIconProps) {
  const extension = fileName.split(".").pop()?.toLowerCase()

  if (extension === "pdf") {
    return (
      <div className={className}>
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect width="48" height="48" rx="4" fill="#E53935" />
          <text x="24" y="32" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle" fontFamily="sans-serif">
            PDF
          </text>
        </svg>
      </div>
    )
  }

  if (["xls", "xlsx", "csv"].includes(extension || "")) {
    return (
      <div className={className}>
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect width="48" height="48" rx="4" fill="#1E7E34" />
          <text x="24" y="32" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle" fontFamily="sans-serif">
            XLS
          </text>
        </svg>
      </div>
    )
  }

  if (["doc", "docx"].includes(extension || "")) {
    return (
      <div className={className}>
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect width="48" height="48" rx="4" fill="#2B579A" />
          <text x="24" y="32" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle" fontFamily="sans-serif">
            DOC
          </text>
        </svg>
      </div>
    )
  }

  if (["ppt", "pptx"].includes(extension || "")) {
    return (
      <div className={className}>
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect width="48" height="48" rx="4" fill="#D24726" />
          <text x="24" y="32" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle" fontFamily="sans-serif">
            PPT
          </text>
        </svg>
      </div>
    )
  }

  if (["jpg", "jpeg", "png", "gif", "svg", "webp", "bmp"].includes(extension || "")) {
    return (
      <div className={className}>
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect width="48" height="48" rx="4" fill="#9C27B0" />
          <rect x="12" y="12" width="24" height="24" rx="2" stroke="white" strokeWidth="2" fill="none" />
          <circle cx="19" cy="19" r="2" fill="white" />
          <path d="M12 30l6-6 4 4 6-8 8 10v4H12v-4z" fill="white" />
        </svg>
      </div>
    )
  }

  if (["txt", "md", "log"].includes(extension || "")) {
    return (
      <div className={className}>
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect width="48" height="48" rx="4" fill="#607D8B" />
          <path d="M16 18h16M16 24h16M16 30h10" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    )
  }

  if (["js", "ts", "jsx", "tsx", "py", "java", "cpp", "c", "html", "css", "json", "xml"].includes(extension || "")) {
    return (
      <div className={className}>
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect width="48" height="48" rx="4" fill="#455A64" />
          <path d="M18 20l-4 4 4 4M30 20l4 4-4 4M26 16l-4 16" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    )
  }

  if (["zip", "rar", "7z", "tar", "gz"].includes(extension || "")) {
    return (
      <div className={className}>
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect width="48" height="48" rx="4" fill="#FFA726" />
          <rect x="20" y="12" width="8" height="2" fill="white" />
          <rect x="20" y="16" width="8" height="2" fill="white" />
          <rect x="20" y="20" width="8" height="2" fill="white" />
          <path d="M16 24h16v10a2 2 0 0 1-2 2H18a2 2 0 0 1-2-2V24z" fill="white" />
          <circle cx="24" cy="29" r="2" fill="#FFA726" />
        </svg>
      </div>
    )
  }

  if (["mp4", "avi", "mov", "wmv", "flv", "mkv", "webm"].includes(extension || "")) {
    return (
      <div className={className}>
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect width="48" height="48" rx="4" fill="#E91E63" />
          <rect x="12" y="16" width="24" height="16" rx="2" stroke="white" strokeWidth="2" fill="none" />
          <path d="M20 20l8 4-8 4v-8z" fill="white" />
        </svg>
      </div>
    )
  }

  if (["mp3", "wav", "ogg", "m4a", "flac", "aac"].includes(extension || "")) {
    return (
      <div className={className}>
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect width="48" height="48" rx="4" fill="#00BCD4" />
          <path d="M20 18v12M24 16v16M28 20v8M16 22v4" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M32 22v4" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    )
  }

  return (
    <div className={className}>
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="48" height="48" rx="4" fill="#78909C" />
        <path
          d="M28 12H16a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V20l-6-8z"
          fill="white"
          stroke="white"
          strokeWidth="1"
        />
        <path d="M28 12v8h6" fill="#78909C" />
        <path d="M18 24h12M18 28h12M18 32h8" stroke="#78909C" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  )
}
