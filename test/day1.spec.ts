import { expect } from 'chai';
import { countIncreases } from '../src/day1';
import * as fs from 'fs';

describe('day 1', () => {
  const exampleInputs = [
    199,
    200,
    208,
    210,
    200,
    207,
    240,
    269,
    260,
    263,
  ];
  const realInputs = fs.readFileSync(__dirname + '/inputs/day1.txt','utf8').trim().split("\n").map((input: string): number => {
    return parseInt(input);
  });

  describe("part 1", () => {
    it("calculates increases with default window of 1", () => {
      expect(countIncreases(exampleInputs)).to.eql(7);
    })
    const answer = 1292;
    it(`is ${answer}`, () => {
      expect(countIncreases(realInputs)).to.eql(answer);
    })
  });

  describe('part 2', () => {
    it("calculates increases with window of 3", () => {
      expect(countIncreases(exampleInputs, 3)).to.eql(5);
    })
    const answer = 1262;
    it(`is ${answer}`, () => {
      expect(countIncreases(realInputs, 3)).to.eql(answer);
    })
  });
});
