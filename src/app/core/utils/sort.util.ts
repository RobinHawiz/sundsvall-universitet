export function alphabetize(a: string | number, b: string | number) {
  if (a > b) return 1;
  else if (a < b) return -1;
  else return 0;
}
