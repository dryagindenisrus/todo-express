export const jwtTokenLivetoSec = (timeStr: string) => {
  const regex = /^(\d+)([smhdw])$/i;
  const match = timeStr.match(regex);

  if (!match) {
    throw new Error('Invalid time string');
  }

  const value = parseInt(match[1], 10);
  const unit = match[2].toLowerCase();

  let milliseconds;

  switch (unit) {
    case 's':
      milliseconds = value * 1000;
      break;
    case 'm':
      milliseconds = value * 60 * 1000;
      break;
    case 'h':
      milliseconds = value * 60 * 60 * 1000;
      break;
    case 'd':
      milliseconds = value * 24 * 60 * 60 * 1000;
      break;
    case 'w':
      milliseconds = value * 7 * 24 * 60 * 60 * 1000;
      break;
    default:
      throw new Error('Unsupported time unit');
  }

  return milliseconds;
};
