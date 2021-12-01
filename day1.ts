import * as fs from 'fs';
import { Day1 } from './src/day1';

let inputs = fs.readFileSync('day1-full-input.txt','utf8').trim().split("\n").map((input: string): number => {
  return parseInt(input);
});
let day1 = new Day1(inputs);
console.log(day1.getIncreases());
