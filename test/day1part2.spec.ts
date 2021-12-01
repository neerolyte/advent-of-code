import { expect } from 'chai';
import { Day1Part2 } from '../src/day1part2';

describe('day1 part2', () => {
  let inputs = [
    199,
    200,
    208,
    210,
    200,
    207,
    240,
    269,
    260,
    263,
  ];

  it("gets expected output", () => {
    let expectedOutput = [
      '607 (N/A - no previous sum)',
      '618 (increased)',
      '618 (no change)',
      '617 (decreased)',
      '647 (increased)',
      '716 (increased)',
      '769 (increased)',
      '792 (increased)',
    ];
    let day1 = new Day1Part2(inputs);
    let result = day1.getOutputs();
    expect(result).to.eql(expectedOutput);
  })

  it("gets expected count of increases", () => {
    let day1 = new Day1Part2(inputs);
    let result = day1.getIncreases();
    expect(result).to.eql(5);
  })
});
