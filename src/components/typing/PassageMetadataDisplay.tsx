import { useTypingStore } from '@/store/typingStore'

interface PassageMetadataDisplayProps {
  className?: string
}

const PassageMetadataDisplay = ({ className = '' }: PassageMetadataDisplayProps) => {
  const { passageMetadata } = useTypingStore()

  if (!passageMetadata) return null


  const hasContent = passageMetadata.title || passageMetadata.author ||
    passageMetadata.speaker || passageMetadata.year

  if (!hasContent) return null

  return (
    <div className={`inline-flex items-center justify-center gap-2 px-4 py-1.5 
      bg-neutral-800/60 backdrop-blur-sm rounded-lg border border-neutral-700/50 
      text-[.75rem] text-neutral-400 ${className}`}>

      {/* Title */}
      {passageMetadata.title && (
        <span className="font-medium text-neutral-300">
          {passageMetadata.title}
        </span>
      )}

      {/* Separator */}
      {passageMetadata.title && (passageMetadata.author || passageMetadata.speaker) && (
        <span className="text-neutral-500">•</span>
      )}

      {/* Author/Speaker */}
      {passageMetadata.author || passageMetadata.speaker ? (
        <span className="italic">
          {passageMetadata.author || passageMetadata.speaker}
        </span>
      ) : null}

      {/* Year */}
      {passageMetadata.year && (
        <>
          <span className="text-neutral-500">•</span>
          <span className="text-neutral-500">
            {typeof passageMetadata.year === 'number' ? passageMetadata.year : passageMetadata.year}
          </span>
        </>
      )}
    </div>
  )
}

export default PassageMetadataDisplay