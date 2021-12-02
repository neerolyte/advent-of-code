import { expect } from 'chai';
import * as fs from 'fs';

/**
 * After completing the challenge myself I looked at someone else's solution and
 * wanted to understand how the spread (...) operator was applying to interfaces
 * in it.
 */

describe('day 2 after peeking', () => {
  function parseMoves(moves: string[]): move[] {
    return moves.map((s: string): move => {
      let a = s.split(' ');
      return { direction: a[0], distance: parseInt(a[1]) };
    })
  }
  const exampleMoves = parseMoves([
    'forward 5',
    'down 5',
    'forward 8',
    'up 3',
    'down 8',
    'forward 2',
  ]);
  const realMoves = parseMoves(fs.readFileSync(__dirname + '/inputs/day2.txt','utf8').trim().split("\n"));

  interface move {
    direction: string;
    distance: number;
  }

  interface position {
    horizontal: number;
    depth: number;
  }

  interface positionWithAim extends position {
    aim: number;
  }

  const position0: position = { horizontal: 0, depth: 0 };
  const applyMove = (current: position, move: move) => {
    // ...current is copying in all of the state from current with any filled in
    // properties overwritten from the right
    switch (move.direction) {
        case 'forward': return {...current, horizontal: current.horizontal + move.distance};
        case 'up':      return {...current, depth: current.depth - move.distance};
        case 'down':    return {...current, depth: current.depth + move.distance};
    }
    throw new Error('wtf');
  };

  function multiplyPosition(position: position): number {
    return position.depth * position.horizontal;
  }

  describe("part 1", () => {
    it("calculates example position", () => {
      expect(multiplyPosition(exampleMoves.reduce(applyMove, position0))).to.eql(150);
    })
    it("calculates real position", () => {
      expect(multiplyPosition(realMoves.reduce(applyMove, position0))).to.eql(1714680);
    })
  })

  const positionWithAim0: positionWithAim = { ...position0, aim: 0 };
  const applyMoveWithAim = (current: positionWithAim, move: move) => {
    switch (move.direction) {
        case 'forward': return {
          ...current,
          horizontal: current.horizontal + move.distance,
          depth: current.depth + current.aim * move.distance,
        };
        case 'up':      return {...current, aim: current.aim - move.distance };
        case 'down':    return {...current, aim: current.aim + move.distance };
    }
    throw new Error('wtf');
  };
  describe("part 2", () => {
    it("calculates example position", () => {
      expect(multiplyPosition(exampleMoves.reduce(applyMoveWithAim, positionWithAim0))).to.eql(900);
    })
    it("calculates real position", () => {
      expect(multiplyPosition(realMoves.reduce(applyMoveWithAim, positionWithAim0))).to.eql(1963088820);
    })
  })
});
