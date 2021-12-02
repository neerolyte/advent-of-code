import { expect } from 'chai';
import { calculatePosition, moveToPosition, Position } from '../src/day2';
import * as fs from 'fs';

describe('day 2', () => {
  const exampleMoves = [
    'forward 5',
    'down 5',
    'forward 8',
    'up 3',
    'down 8',
    'forward 2',
  ];
  const realMoves = fs.readFileSync(__dirname + '/inputs/day2.txt','utf8').trim().split("\n").map((input: string): string => {
    return input;
  });

  describe("part 1", () => {
    it("converts move to position", () => {
      expect(moveToPosition('forward 5')).to.eql(new Position(0, 5));
      expect(moveToPosition('down 3')).to.eql(new Position(3, 0));
      expect(moveToPosition('up 2')).to.eql(new Position(-2, 0));
    })
    it("can add positions", () => {
      expect((new Position(12, 5)).add(new Position(-3, 6))).to.eql(new Position(9, 11));
    })
    it("calculates position", () => {
      expect(calculatePosition(exampleMoves)).to.eql(new Position(10, 15));
    })
    const answer = 1714680;
    it(`is ${answer}`, () => {
      expect(calculatePosition(realMoves)).to.eql(new Position(866, 1980));
      expect(866 * 1980).to.eql(answer);
    })
  });
});
