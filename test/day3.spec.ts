import { expect } from 'chai';
import * as fs from 'fs';


describe('day 3', () => {
  let exampleReport = [
    '00100',
    '11110',
    '10110',
    '10111',
    '10101',
    '01111',
    '00111',
    '11100',
    '10000',
    '11001',
    '00010',
    '01010',
  ];
  const realReport = fs.readFileSync(__dirname + '/inputs/day3.txt','utf8').trim().split("\n");

  function mostCommonBits(lines: string[]): string {
    return lines.map((line: string): number[] => {
      return line.split('').map((s: string) => { return parseInt(s); });
    }).reduce((state: number[], current: number[]): number[] => {
      return state.map((num, index) => {
        return num + current[index];
      })
    }).map((num) => ( num > lines.length / 2 ? 1 : 0))
    .join('');
  }

  function invertBits(line: string): string {
    return line.split('')
    .map((num) => (num === '1' ? 0 : 1))
    .join('')
  }

  function leastCommonBits(lines: string[]): string {
    return invertBits(mostCommonBits(lines));
  }

  function calculateGammaRate(lines: string[]): number {
    return parseInt(mostCommonBits(lines), 2);
  }

  function calculateEpsilonRate(lines: string[]): number {
    return parseInt(leastCommonBits(lines), 2);
  }

  function calculatePower(lines: string[]): number {
    return calculateGammaRate(lines) * calculateEpsilonRate(lines);
  }

  describe("part 1", () => {
    it("calculates most common bits", () => {
      expect(mostCommonBits(exampleReport)).to.eql('10110');
    })
    it("calculates least common bits", () => {
      expect(leastCommonBits(exampleReport)).to.eql('01001');
    })
    it("calculates gamma rate", () => {
      expect(calculateGammaRate(exampleReport)).to.eql(22)
    })
    it("calculates epsilon rate", () => {
      expect(calculateEpsilonRate(exampleReport)).to.eql(9)
    })
    it("calculates power", () => {
      expect(calculatePower(exampleReport)).to.eql(198)
    })
    const answer = 3429254;
    it(`is ${answer}`, () => {
      expect(calculatePower(realReport)).to.eql(answer);
    })
  })
});
