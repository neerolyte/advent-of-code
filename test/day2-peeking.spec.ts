import { expect } from 'chai';
import * as fs from 'fs';

/**
 * After completing the challenge myself I looked at someone else's solution and
 * wanted to understand how the spread (...) operator was applying to interfaces
 * in it.
 */

describe('day 2 after peeking', () => {
  enum Direction { up, down, forward };

  function parseDirection(direction: string): Direction {
    switch(direction) {
      case 'up': return Direction.up;
      case 'down': return Direction.down;
      case 'forward': return Direction.forward;
    }
    throw new Error('wtf');
  }
  function parseMoves(moves: string[]): Move[] {
    return moves.map((s: string): Move => {
      let a = s.split(' ');
      return { direction: parseDirection(a[0]), distance: parseInt(a[1]) };
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

  interface Move {
    direction: Direction;
    distance: number;
  }

  interface Position {
    horizontal: number;
    depth: number;
  }

  interface PositionWithAim extends Position {
    aim: number;
  }

  const position0: Position = { horizontal: 0, depth: 0 };
  const applyMove = (current: Position, move: Move) => {
    // ...current is copying in all of the state from current with any filled in
    // properties overwritten from the right
    switch (move.direction) {
        case Direction.forward: return {...current, horizontal: current.horizontal + move.distance};
        case Direction.up:      return {...current, depth: current.depth - move.distance};
        case Direction.down:    return {...current, depth: current.depth + move.distance};
    }
  };

  function multiplyPosition(position: Position): number {
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

  const positionWithAim0: PositionWithAim = { ...position0, aim: 0 };
  const applyMoveWithAim = (current: PositionWithAim, move: Move) => {
    switch (move.direction) {
        case Direction.forward: return {
          ...current,
          horizontal: current.horizontal + move.distance,
          depth: current.depth + current.aim * move.distance,
        };
        case Direction.up:      return {...current, aim: current.aim - move.distance };
        case Direction.down:    return {...current, aim: current.aim + move.distance };
    }
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
