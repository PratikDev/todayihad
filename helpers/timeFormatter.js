export function timeFormatter(epochTimestamp) {
  const currentTimestamp = Date.now();
  const difference = currentTimestamp - epochTimestamp;
  const oneHour = 60 * 60 * 1000;
  const oneDay = oneHour * 24;
  const oneMonth = oneDay * 30;

  if (difference < oneHour) {
    return `${Math.round(difference / (60 * 1000))} minutes ago`;
  } else if (difference < oneDay) {
    return `${Math.round(difference / oneHour)} hours ago`;
  } else if (difference < oneMonth) {
    return `${Math.round(difference / oneDay)} days ago`;
  } else {
    const date = new Date(epochTimestamp);

    return date.toLocaleString("default", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  }
}
