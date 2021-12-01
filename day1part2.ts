import * as fs from 'fs';
import { Day1Part2 } from './src/day1part2';

let inputs = fs.readFileSync('day1-full-input.txt','utf8').trim().split("\n").map((input: string): number => {
  return parseInt(input);
});
let day1part2 = new Day1Part2(inputs);
console.log(day1part2.getIncreases());
