const parseTimeFromTimeMode = (timeMode: string): number | null => {
  if (timeMode === "Passage") return null //* No time limit
  const match = timeMode.match(/\((\d+)s\)/) //* Extract number from string
  return match ? parseInt(match[1]) : 60 //* Default to 60 if parsing fails
}

export default parseTimeFromTimeMode