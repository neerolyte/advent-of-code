export function countIncreases(inputs: Array<number>, window: number = 1): number {
  let last: number = null;
  let increases = 0;
  for (let i = 0; i < inputs.length - (window - 1); i++) {
    let current = inputs.slice(i, i + window).reduce((a, b) => { return a + b; });
    if (last && current > last) {
      increases++;
    }
    last = current;
  }
  return increases;
};
