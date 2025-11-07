interface LogoProps {
  className?: string
  iconOnly?: boolean
  size?: "sm" | "md" | "lg"
  showText?: boolean
}

export function Logo({ className = "", iconOnly = false, size = "md", showText = false }: LogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-16 w-16",
  }

  const textSizeClasses = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-3xl",
  }

  const shouldShowText = showText || !iconOnly

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Logo Icon - consistent blue gradient */}
      <div className="relative">
        <svg className={sizeClasses[size]} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <rect width="32" height="32" rx="8" fill="url(#logo-gradient)" />
          <path d="M16 8L22 14L16 20L10 14L16 8Z" fill="white" opacity="0.95" />
          <circle cx="16" cy="22" r="2" fill="white" opacity="0.95" />
        </svg>
      </div>
      {shouldShowText && <span className={`${textSizeClasses[size]} font-semibold`}>AgentFlow</span>}
    </div>
  )
}
