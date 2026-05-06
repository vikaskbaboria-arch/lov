function getDateLabel(date) {
  const msgDate = new Date(date);
  const now = new Date();

  // remove time part
  const msg = new Date(msgDate.getFullYear(), msgDate.getMonth(), msgDate.getDate());
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const diff = (today - msg) / (1000 * 60 * 60 * 24);

  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";

  return msgDate.toLocaleDateString();
}
export default getDateLabel;