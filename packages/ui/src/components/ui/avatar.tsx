import * as React from "react"
import { cn } from "../../lib/utils"

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  initials?: string
  src?: string
  alt?: string
  size?: "sm" | "md" | "lg"
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
}

function Avatar({
  className,
  initials,
  src,
  alt,
  size = "md",
  ...props
}: AvatarProps) {
  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-medium shrink-0 overflow-hidden",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt || ""} className="w-full h-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  )
}

export { Avatar }

