import * as fs from 'fs';
import { Day1 } from './src/day1';

let inputs = fs.readFileSync('day1-full-input.txt','utf8').trim().split("\n").map((input: string): number => {
  return parseInt(input);
});
console.log(`part1 (window=1): ${(new Day1(inputs)).getIncreases()}`);
console.log(`part1 (window=3): ${(new Day1(inputs, 3)).getIncreases()}`);
