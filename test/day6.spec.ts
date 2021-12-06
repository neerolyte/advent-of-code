import { expect } from 'chai';
import * as fs from 'fs';

describe("day6", () => {
  let example = [3,4,3,1,2];
  let real = [2,4,1,5,1,3,1,1,5,2,2,5,4,2,1,2,5,3,2,4,1,3,5,3,1,3,1,3,5,4,1,1,1,1,5,1,2,5,5,5,2,3,4,1,1,1,2,1,4,1,3,2,1,4,3,1,4,1,5,4,5,1,4,1,2,2,3,1,1,1,2,5,1,1,1,2,1,1,2,2,1,4,3,3,1,1,1,2,1,2,5,4,1,4,3,1,5,5,1,3,1,5,1,5,2,4,5,1,2,1,1,5,4,1,1,4,5,3,1,4,5,1,3,2,2,1,1,1,4,5,2,2,5,1,4,5,2,1,1,5,3,1,1,1,3,1,2,3,3,1,4,3,1,2,3,1,4,2,1,2,5,4,2,5,4,1,1,2,1,2,4,3,3,1,1,5,1,1,1,1,1,3,1,4,1,4,1,2,3,5,1,2,5,4,5,4,1,3,1,4,3,1,2,2,2,1,5,1,1,1,3,2,1,3,5,2,1,1,4,4,3,5,3,5,1,4,3,1,3,5,1,3,4,1,2,5,2,1,5,4,3,4,1,3,3,5,1,1,3,5,3,3,4,3,5,5,1,4,1,1,3,5,5,1,5,4,4,1,3,1,1,1,1,3,2,1,2,3,1,5,1,1,1,4,3,1,1,1,1,1,1,1,1,1,2,1,1,2,5,3];

  interface Timers {
    0: number,
    1: number,
    2: number,
    3: number,
    4: number,
    5: number,
    6: number,
    7: number,
    8: number,
  }
  const timer0 = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
  }

  function ageTimers(timers: Timers): Timers {
    return {
      0: timers[1],
      1: timers[2],
      2: timers[3],
      3: timers[4],
      4: timers[5],
      5: timers[6],
      6: timers[7] + timers[0],
      7: timers[8],
      8: timers[0],
    };
  }

  function fish2Timers(fish: number[]): Timers {
    let timers = {...timer0};
    fish.forEach((timer: number) => {
      timers[timer as keyof Timers]++;
    })
    return timers;
  }

  function sumTimers(timers: Timers): number {
    return timers[0]
      + timers[1]
      + timers[2]
      + timers[3]
      + timers[4]
      + timers[5]
      + timers[6]
      + timers[7]
      + timers[8]
  }

  describe("part 1", () => {
    it("converts array of fish to timers", () => {
      expect(fish2Timers([3,1,6,8,0,1])).to.eql({...timer0, 0:1, 1:2, 3:1, 6:1, 8:1 })
    })
    it("ages timers a", () => {
      expect(ageTimers({...timer0, 0: 1})).to.eql({...timer0, 6: 1, 8: 1})
    })
    it("ages timers b", () => {
      expect(ageTimers({...timer0, 0: 2, 7: 2, 8: 2})).to.eql({...timer0, 6:4, 7:2, 8:2})
    })
    it("calculates real answer", () => {
      let current = fish2Timers(real);
      for (let i = 0; i < 80; i++) {
        current = ageTimers(current);
      }
      expect(sumTimers(current)).to.eql(362666)
    })
  })

  describe("part 2", () => {
    it("calculates real answer", () => {
      let current = fish2Timers(real);
      for (let i = 0; i < 256; i++) {
        current = ageTimers(current);
      }
      expect(sumTimers(current)).to.eql(1640526601595)
    })
  })
})
