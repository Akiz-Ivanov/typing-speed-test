// components/SettingDropdown.tsx
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface SettingDropdownProps<T extends string> {
  label?: string
  value: T
  options: { value: T; label: string }[]
  onChange: (value: T) => void
  minWidth?: string
  labelClassName?: string
  btnClassName?: string
  contentClassName?: string
}

export function SettingDropdown<T extends string>({
  label,
  value,
  options,
  onChange,
  minWidth = "min-w-25",
  labelClassName,
  btnClassName,
  contentClassName
}: SettingDropdownProps<T>) {
  const currentLabel = options.find(option => option.value === value)?.label || value

  const handleChange = (newValue: string) => {
    onChange(newValue as T)
  }

  return (
    <>
      {label && (
        <label
          className={cn(
            "text-neutral-400 whitespace-nowrap",
            labelClassName
          )}
        >
          {label}:
        </label>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className={cn(
              `flex justify-center items-center gap-2.5 border border-border bg-neutral-800 rounded-lg px-4 py-4 hover:border-blue-400 hover:text-blue-400 focus-visible:border-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600/50 text-center h-8 cursor-pointer transition-[color,box-shadow] duration-200 whitespace-nowrap ${minWidth}`,
              btnClassName
            )}
          >
            {currentLabel}
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className={cn(
            "w-[var(--radix-dropdown-menu-trigger-width)]",
            contentClassName
          )}
        >
          <DropdownMenuRadioGroup value={value} onValueChange={handleChange}>
            {options.map((option, index) => (
              <div key={option.value}>
                <DropdownMenuRadioItem value={option.value}>
                  {option.label}
                </DropdownMenuRadioItem>
                {index < options.length - 1 && <DropdownMenuSeparator />}
              </div>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}