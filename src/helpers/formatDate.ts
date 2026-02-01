export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();

  // Check if it's today
  if (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  ) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + ", Today";
  }

  // Otherwise show full date
  return date.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
};
