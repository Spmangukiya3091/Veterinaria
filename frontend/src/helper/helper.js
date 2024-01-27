function formatCreatedAtDate(createdAt) {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", options);

  return formattedDate;
}
export default formatCreatedAtDate;
