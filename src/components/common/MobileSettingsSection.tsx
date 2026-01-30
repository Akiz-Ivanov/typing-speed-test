import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { ReactNode } from "react"

interface MobileSettingSectionProps<T extends string> {
  icon: ReactNode
  title: string
  description: string
  value: T
  options: { value: T; label: string }[]
  onChange: (value: T) => void
  className?: string
}

export function MobileSettingSection<T extends string>({
  icon,
  title,
  description,
  value,
  options,
  onChange,
  className
}: MobileSettingSectionProps<T>) {
  return (
    <div>
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-neutral-300 mb-1 flex items-center gap-2">
          {icon}
          {title}
        </h3>
        <p className="text-xs text-neutral-500">{description}</p>
      </div>
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={onChange}
        className={className}
        spacing={1.5}
      >
        {options.map((option) => (
          <ToggleGroupItem
            key={option.value}
            value={option.value}
            variant="outline"
          >
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}