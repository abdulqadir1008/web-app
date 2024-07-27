export const CalculateTripDuration = (endDate: any, startDate: any) => {
  const startD = new Date(startDate);
  const endD = new Date(endDate);
  const TimeDiff = endD.getTime() - startD.getTime();

  const seconds = Math.floor(TimeDiff / 1000);
  let minutes = Math.floor(seconds / 60);
  const minuteString = JSON.stringify(Math.floor(seconds / 60));
  if (minuteString.endsWith('9')) {
    minutes = Math.floor(seconds / 60) + 1;
  } else {
    minutes = Math.floor(seconds / 60);
  }

  let hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const remainingHours = hours % 24;
  const remainingMinutes = minutes % 60;
  let tripDuration = '';
  if (days > 0) {
    tripDuration = `${days} day${days > 1 ? 's' : ''}`;
    if (remainingHours > 0) {
      tripDuration += ` ${remainingHours} hour${remainingHours > 1 ? 's' : ''}`;
    }
    if (remainingMinutes > 0) {
      tripDuration += ` ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`;
    }
  } else if (hours > 0) {
    tripDuration = `${hours} hour${hours > 1 ? 's' : ''}`;
    if (remainingMinutes > 0) {
      tripDuration += ` ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`;
    }
  } else {
    tripDuration = `${minutes} minute${minutes > 1 ? 's' : ''}`;
  }
  if (hours >= 8) {
    return tripDuration;
  }
};
