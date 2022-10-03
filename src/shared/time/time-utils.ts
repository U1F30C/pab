export function toDisplayableShortDate(date: Date, separator: string = '/') {
  return `${toStringPad2(date.getDate())}${separator}${toStringPad2(
    date.getMonth() + 1,
  )}${separator}${toStringPad2(date.getFullYear())}`;
}

function toStringPad2(number: number) {
  return number.toString().padStart(2, '0');
}


export function now() {
  return new Date();
}
