import { expect } from 'chai';
import { calculatePosition, calculatePositionWithAim, createMove, Direction, Move, Position, PositionWithAim } from '../src/day2';
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
  const realMoves = fs.readFileSync(__dirname + '/inputs/day2.txt','utf8').trim().split("\n");

  describe("part 1", () => {
    it("converts move", () => {
      expect(createMove('forward 5')).to.eql(new Move(Direction.Forward, 5));
      expect(createMove('down 3')).to.eql(new Move(Direction.Down, 3));
      expect(createMove('up 2')).to.eql(new Move(Direction.Up, 2));
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

  describe("part 2", () => {
    it("can move", () => {
      expect((new PositionWithAim(12, 5, 0)).move(new Move(Direction.Up, 3))).to.eql(new PositionWithAim(12, 5, -3));
      expect((new PositionWithAim(12, 5, 0)).move(new Move(Direction.Down, 3))).to.eql(new PositionWithAim(12, 5, 3));
      expect((new PositionWithAim(12, 5, 0)).move(new Move(Direction.Forward, 2))).to.eql(new PositionWithAim(12, 7, 0));
      expect((new PositionWithAim(12, 5, 3)).move(new Move(Direction.Forward, 2))).to.eql(new PositionWithAim(18, 7, 3));
    })
    it("calculates position", () => {
      expect(calculatePositionWithAim(exampleMoves)).to.eql(new PositionWithAim(60, 15, 10));
    })
    const answer = 1963088820;
    it(`is ${answer}`, () => {
      expect(calculatePositionWithAim(realMoves)).to.eql(new PositionWithAim(991459, 1980, 866));
      expect(991459 * 1980).to.eql(answer);
    })
  });
});
