export class Position {
  depth: number;
  forward: number;

  constructor(depth: number, forward: number) {
    this.depth = depth;
    this.forward = forward;
  }

  add(other: Position): Position {
    return new Position(this.depth + other.depth, this.forward + other.forward);
  }
}

export function moveToPosition(move: string): Position {
  let match = move.match(/^(forward|down|up) ([0-9]+)$/);
  if (!match) {
    throw new Error(`Could not parse move: ${move}`);
  }
  let direction = match[1];
  let distance = parseInt(match[2]);
  let depth: number = direction == 'forward' ? 0 : ( direction == 'up' ? -1 : 1) * distance;
  let forward: number = (direction == 'forward') ? distance : 0;
  return new Position(depth, forward);
}

export function calculatePosition(movements: Array<string>): Position {
  let start = new Position(0, 0);
  let movePositions = movements.map((move: string): Position => {
    return moveToPosition(move);
  });
  let final: Position = movePositions.reduce((previous: Position, current: Position): Position => {
    return previous.add(current);
  }, start);
  return final;
};
