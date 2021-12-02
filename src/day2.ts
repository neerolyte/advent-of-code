export class Position {
  depth: number;
  horizontal: number;

  constructor(depth: number, horizontal: number) {
    this.depth = depth;
    this.horizontal = horizontal;
  }

  add(other: Position): Position {
    return new Position(this.depth + other.depth, this.horizontal + other.horizontal);
  }

  move(move: Move): Position {
    return new Position(this.depth + move.depth(), this.horizontal + move.horizontal());
  }
}

export class PositionWithAim extends Position {
  aim: number;

  constructor(depth: number, horizontal: number, aim: number) {
    super(depth, horizontal);
    this.aim = aim;
  }

  move(move: Move): PositionWithAim {
    return new PositionWithAim(
      this.depth + move.horizontal() * this.aim,
      this.horizontal + move.horizontal(),
      this.aim + move.aim()
    );
  }
}

export enum Direction {
  Up, Down, Forward
};

export class Move {
  direction: Direction;
  distance: number;

  constructor(direction: Direction, distance: number) {
    this.direction = direction;
    this.distance = distance;
  }

  depth() {
    switch (this.direction) {
      case Direction.Forward:
        return 0;
      case Direction.Up:
        return 0 - this.distance;
    }
    return this.distance;
  }

  horizontal() {
    switch (this.direction) {
      case Direction.Forward:
        return this.distance;
    }
    return 0;
  }

  aim() {
    return this.depth();
  }
};

const directionMap: { [key: string]: Direction } = {
  'forward': Direction.Forward,
  'up': Direction.Up,
  'down': Direction.Down,
}

export function createMove(move: string): Move {
  let match = move.match(/^(forward|down|up) ([0-9]+)$/);
  if (!match) {
    throw new Error(`Could not parse move: ${move}`);
  }
  return new Move(directionMap[match[1]], parseInt(match[2]));
}

export function calculatePosition(movements: Array<string>): Position {
  let start = new Position(0, 0);
  let moves = movements.map((move: string): Move => {
    return createMove(move);
  });
  let final: Position = moves.reduce((previous: Position, current: Move): Position => {
    return previous.move(current);
  }, start);
  return final;
};
export function calculatePositionWithAim(movements: Array<string>): PositionWithAim {
  let start = new PositionWithAim(0, 0, 0);
  let moves = movements.map((move: string): Move => {
    return createMove(move);
  });
  let final: PositionWithAim = moves.reduce((previous: PositionWithAim, current: Move): PositionWithAim => {
    return previous.move(current);
  }, start);
  return final;
};
