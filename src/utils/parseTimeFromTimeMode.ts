const parseTimeFromTimeMode = (timeMode: string): number | null => {
  if (timeMode === "Passage") return null //* No time limit
  const match = timeMode.match(/\((\d+)s\)/) //* Capture time limit from timeMode state string
  return match ? parseInt(match[1]) : 60 //* Return parsed number or default to 60 if parsing fails
}

export default parseTimeFromTimeMode