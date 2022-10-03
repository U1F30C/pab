export function getDateNYearsAgo(years: number) {
  const msInAYear = 31536000000;
  return new Date(Date.now() - msInAYear * years);
}

export function stringToBoolean(value: string): boolean | undefined {
  if (value == 'true') {
    return true;
  }
  if (value == 'false') {
    return false;
  }
}
