function getTimeAgo(date) {
  const difference = Date.now() - Date.parse(date);
  const timeAgo = Math.floor(difference / 1000);
  if (timeAgo <= 60) {
    return `${timeAgo} seconds ago`;
  } else if (timeAgo > 60 && timeAgo <= 60 * 60) {
    return `${Math.floor(timeAgo / 60)} minutes ago`;
  } else if (timeAgo > 60 * 60 && timeAgo <= 60 * 60 * 24) {
    return `${Math.floor(timeAgo / (60 * 60))} hours ago`;
  } else {
    return `${Math.floor(timeAgo / (60 * 60 * 24))} days ago`;
  }
}

export { getTimeAgo };
