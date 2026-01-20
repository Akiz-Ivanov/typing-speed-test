export const validateNickname = (nickname: string) => {
  const trimmed = nickname.trim()

  if (trimmed.length < 2) return { valid: false, message: 'Nickname must be at least 2 characters' }
  if (trimmed.length > 20) return { valid: false, message: 'Nickname must be 20 characters or less' }

  // Allow letters, numbers, spaces, underscores, hyphens
  if (!/^[a-zA-Z0-9 _-]+$/.test(trimmed)) {
    return { valid: false, message: 'Only letters, numbers, spaces, underscores, and hyphens allowed' }
  }
  
  return { valid: true }
}

export const validateScore = (wpm: number, accuracy: number) => {
  if (wpm < 0 || wpm > 500) {
    return { valid: false, message: 'Invalid WPM score' }
  }

  if (accuracy < 0 || accuracy > 100) {
    return { valid: false, message: 'Invalid accuracy score' }
  }

  return { valid: true }
}