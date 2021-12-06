import { expect } from 'chai';
import * as fs from 'fs';

describe("day6", () => {
  let example = [3,4,3,1,2];
  let real = [2,4,1,5,1,3,1,1,5,2,2,5,4,2,1,2,5,3,2,4,1,3,5,3,1,3,1,3,5,4,1,1,1,1,5,1,2,5,5,5,2,3,4,1,1,1,2,1,4,1,3,2,1,4,3,1,4,1,5,4,5,1,4,1,2,2,3,1,1,1,2,5,1,1,1,2,1,1,2,2,1,4,3,3,1,1,1,2,1,2,5,4,1,4,3,1,5,5,1,3,1,5,1,5,2,4,5,1,2,1,1,5,4,1,1,4,5,3,1,4,5,1,3,2,2,1,1,1,4,5,2,2,5,1,4,5,2,1,1,5,3,1,1,1,3,1,2,3,3,1,4,3,1,2,3,1,4,2,1,2,5,4,2,5,4,1,1,2,1,2,4,3,3,1,1,5,1,1,1,1,1,3,1,4,1,4,1,2,3,5,1,2,5,4,5,4,1,3,1,4,3,1,2,2,2,1,5,1,1,1,3,2,1,3,5,2,1,1,4,4,3,5,3,5,1,4,3,1,3,5,1,3,4,1,2,5,2,1,5,4,3,4,1,3,3,5,1,1,3,5,3,3,4,3,5,5,1,4,1,1,3,5,5,1,5,4,4,1,3,1,1,1,1,3,2,1,2,3,1,5,1,1,1,4,3,1,1,1,1,1,1,1,1,1,2,1,1,2,5,3];

  function age(timers: number[]): number[] {
    let newFish = 0;
    let agedTimers = timers.map((timer: number) => {
      if (!timer) newFish++;
      return (timer || 7) - 1;
    });
    return agedTimers.concat(Array(newFish).fill(8));
  }

  it("calculates example fish", () => {
    expect(age(example)).to.eql([2,3,2,0,1])
    expect(age([2,3,2,0,1])).to.eql([1,2,1,6,0,8])
  })
  it("calculates real answer", () => {
    let current = real;
    for (let i = 0; i < 80; i++) {
      current = age(current);
    }
    expect(current.length).to.eql(362666)
  })
})
