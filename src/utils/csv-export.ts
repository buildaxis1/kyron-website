export function exportToCSV<T extends object>(
  data: T[],
  filename = "export.csv",
) {
  if (data.length === 0) return;

  // Get headers from the first object
  const headers = Object.keys(data[0] as Record<string, unknown>);

  // Create CSV content
  const csvContent = [
    headers.join(","), // Header row
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = (row as Record<string, unknown>)[header];
          // Handle values that need quotes (contain commas, quotes, or newlines)
          if (
            typeof value === "string" &&
            (value.includes(",") || value.includes('"') || value.includes("\n"))
          ) {
            return `"${value.replace(/\"/g, '""')}"`;
          }
          return value as string | number | boolean | null | undefined;
        })
        .join(","),
    ),
  ].join("\n");

  // Create and download the file
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
