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
    let maxy: number = 0;
    let matched: boolean = false;
    possibleXVelocities(target).forEach((x) => {
      for (let y = maxy; y <= 500; y++) {
        let start: State = {
          point: {...probeStartPoint},
          velocity: {x: x, y: y},
        };
        if (hitsTarget(start, target)) {
          maxy = y;
          matched = true;
        }
      }
    })
    return matched ? maxy : -1;
  }

  function calculateMaxYHeightFromYSpeed(y: number): number {
    return y * (y + 1) / 2
  }

  function hitsTarget(start: State, target: Target): boolean {
    let state = {...start};
    while (state.point.y >= min(target.y) || state.velocity.y >= 0) {
      state = step(state);
      if (withinTarget(state.point, target)) {
        /*
        console.log({
          start: start,
          state: state,
        })//*/
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

  function step(start: State): State
  {
    return {
      point: {
        x: start.point.x + start.velocity.x,
        y: start.point.y + start.velocity.y,
      },
      velocity: {
        x: drag(start.velocity.x),
        y: start.velocity.y - 1,
      },
    }
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

  function validXVelocity(x: number, target: Target): boolean {
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

  function possibleXVelocities(target: Target): number[] {
    return _.range(0, max(target.x) + 1)
    .filter((x) => validXVelocity(x, target))
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
        expect(possibleXVelocities(target)).to.eql(expected);
      });
    });

    it("knows maximum y of example", () => {
      expect(calculateMaxYHeightFromYSpeed(calculateMaxYSpeed(example))).to.eql(45);
    });
    it("knows maximum y of answer", () => {
      // 500500 is too high
      // 29999 is too high
      // 1000 is too low
      expect(calculateMaxYHeightFromYSpeed(calculateMaxYSpeed(real))).to.eql(5995);
    });
  })
})
