import { expect } from 'chai';
import * as _ from 'lodash';
import { max, min } from 'lodash';

describe("day 17", () => {
  type Range = [number, number];
  type Target = { x: Range, y: Range };
  type Point = { x: number, y: number};
  // target area: x=20..30, y=-10..-5
  const example: Target = {
    x: [20, 30],
    y: [-10, -5],
  };
  // target area: x=156..202, y=-110..-69
  const real: Target = {
    x: [156, 202],
    y: [-110, -69],
  };
  type Velocity = {x: number, y: number};
  type State = {
    point: Point,
    velocity: Velocity,
  };
  const probeStartPoint: Point = { x: 0, y:0 };

  function calculateMaxYSpeed(target: Target): number {
    return max(possibleYSpeeds(target))
  }

  function calculateMaxYHeightFromYSpeed(y: number): number {
    return y * (y + 1) / 2
  }

  function hitsTarget(start: State, target: Target): boolean {
    let state = {...start};
    while (state.point.y >= min(target.y) && state.point.x <= max(target.x)) {
      state = step(state);
      if (withinTarget(state.point, target)) {
        return true;
      }
    }
    return false;
  }

  function withinRange(value: number, range: Range): boolean {
    return (value >= min(range)) && (value <= max(range));
  }

  function withinTarget(point: Point, target: Target): boolean {
    return withinRange(point.x, target.x) && withinRange(point.y, target.y);
  }

  function drag(number: number): number {
    if (number > 0) {
      return number - 1;
    }
    if (number < 0) {
      return number + 1;
    }
    return 0;
  }

  function step(state: State): State
  {
    return stepX(stepY(state))
  }

  function stepX(start: State): State
  {
    return {
      point: {
        ...start.point,
        x: start.point.x + start.velocity.x,
      },
      velocity: {
        ...start.velocity,
        x: drag(start.velocity.x),
      },
    }
  }

  function stepY(start: State): State
  {
    return {
      point: {
        ...start.point,
        y: start.point.y + start.velocity.y,
      },
      velocity: {
        ...start.velocity,
        y: start.velocity.y - 1,
      },
    }
  }

  function isValidXStartSpeed(x: number, target: Target): boolean {
    let start: State = {
      point: { x: 0, y: target.y[0] },
      velocity: { x: x, y: 0 }
    }
    let state = {...start};
    while (state.velocity.x != 0) {
      state = stepX(state);
      if (withinTarget(state.point, target)) {
        return true;
      }
    }
    return false;
  }

  function isValidYStartSpeed(y: number, target: Target): boolean {
    let start: State = {
      point: { x: target.x[0], y: 0 },
      velocity: { x: 0, y: y }
    }
    let state = {...start};
    while (state.point.y >= min(target.y) || state.velocity.y >= 0) {
      state = stepY(state);
      if (withinTarget(state.point, target)) {
        return true;
      }
    }
    return false;
  }

  function possibleXStartSpeeds(target: Target): number[] {
    return _.range(0, max(target.x) + 1)
    .filter((x) => isValidXStartSpeed(x, target))
  }

  function possibleYSpeeds(target: Target): number[] {
    return _.range(min(target.y), -min(target.y))
    .filter((y) => isValidYStartSpeed(y, target))
  }

  function initialValidVelocities(target: Target): Velocity[] {
    let velocities: Velocity[] = [];
    let xRange: number[] = possibleXStartSpeeds(target);
    let yRange: number[] = possibleYSpeeds(target);
    xRange.forEach((x) => {
      yRange.forEach((y) => {
        velocities.push({x:x, y:y})
      })
    })
    return velocities.filter((v) => hitsTarget({point: {...probeStartPoint}, velocity: v}, target));
  }

  describe("part 1", () => {
    [
      [{x:20,y:-10}, true],
      [{x:30,y:-10}, true],
      [{x:31,y:-10}, false],
      [{x:19,y:-10}, false],
      [{x:25,y:-10}, true],
      [{x:25,y:-5}, true],
      [{x:25,y:-4}, false],
      [{x:25,y:-11}, false],
    ].forEach((v: any[]) => {
      let point: Point, expected: boolean;
      [point, expected] = v;
      it(`knows if point is within target - ${JSON.stringify(v)}`, () => {
        expect(withinTarget(point, example)).to.eql(expected);
      })
    });

    [
      [{point:{x:20,y:10}, velocity:{x:10, y: 3}}, {point:{x:30,y:13}, velocity:{x:9, y: 2}}],
      [{point:{x:-6,y:-5}, velocity:{x:-3, y: -7}}, {point:{x:-9,y:-12}, velocity:{x:-2, y: -8}}],
    ].forEach((v: any[]) => {
      let start: State, end: State;
      [start, end] = v;
      it(`knows steps - ${JSON.stringify(v)}`, () => {
        expect(step(start)).to.eql(end);
      })
    });

    [
      [{velocity: {x:7,y:2}, point: {x:0,y:0}}, true],
      [{velocity: {x:6,y:3}, point: {x:0,y:0}}, true],
      [{velocity: {x:9,y:0}, point: {x:0,y:0}}, true],
      [{velocity: {x:17,y:-4}, point: {x:0,y:0}}, false],
    ].forEach((v: any[]) => {
      let start: State, expected: boolean;
      [start, expected] = v;
      it(`knows which initial velocities hit the target - ${JSON.stringify(v)}`, () => {
        expect(hitsTarget(start, example)).to.eql(expected);
      });
    });

    [
      [example, [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]],
    ].forEach((v: any[]) => {
      let target: Target, expected: boolean;
      [target, expected] = v;
      it(`knows valid xs - ${JSON.stringify(v)}`, () => {
        expect(possibleXStartSpeeds(target)).to.eql(expected);
      });
    });

    it("knows maximum y of example", () => {
      expect(calculateMaxYHeightFromYSpeed(calculateMaxYSpeed(example))).to.eql(45);
    });
    it("knows maximum y of challenge", () => {
      // 500500 is too high
      // 29999 is too high
      // 1000 is too low
      expect(calculateMaxYHeightFromYSpeed(calculateMaxYSpeed(real))).to.eql(5995);
    });
  });

  describe("part 2", () => {
    [
      [example, _.range(-10, 10)],
    ].forEach((v: any[]) => {
      let target: Target, expected: boolean;
      [target, expected] = v;
      it(`knows valid ys - ${JSON.stringify(v)}`, () => {
        expect(possibleYSpeeds(target)).to.eql(expected);
      });
    });
    it("knows initial valid velocities of example", () => {
      expect(initialValidVelocities(example).length).to.eql(112)
    });
    it("knows initial valid velocities of challenge", () => {
      expect(initialValidVelocities(real).length).to.eql(3202)
    });
  });
})
