const formattedDate = (dateStr) => {
  if (!/^\d{4}-\d{2}-\d{2}T/.test(dateStr)) return null;
  const date = new Date(dateStr);
  if (isNaN(date)) return null;
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
};

export default formattedDate;
