export function valueSecurity(value, defaultValue) {
  return value !== null ? value : defaultValue;
}
export function priceStrGenerator(num, digits, rate) {
  let fixedNum = num.toFixed(digits);
  return rate >= 0 ? fixedNum + ' ▲' : fixedNum + ' ▼';
}
export function priceStr2Generator(num, digits) {
  let fixedNum = num.toFixed(digits);
  return fixedNum;
}
export function rateStrGenerator(num, digits, isRate) {
  let symbol = num >= 0 ? '+' : '-';
  let numWithSymbol = symbol + Math.abs(num.toFixed(digits));
  return isRate ? numWithSymbol + '%' : numWithSymbol;
}