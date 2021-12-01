import { expect } from 'chai';
import { Day1 } from '../src/day1';

describe('day1', () => {
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
      '199 (N/A - no previous sum)',
      '200 (increased)',
      '208 (increased)',
      '210 (increased)',
      '200 (decreased)',
      '207 (increased)',
      '240 (increased)',
      '269 (increased)',
      '260 (decreased)',
      '263 (increased)',
    ];
    let day1 = new Day1(inputs);
    let result = day1.getOutputs();
    expect(result).to.eql(expectedOutput);
  })

  it("gets expected count of increases", () => {
    let day1 = new Day1(inputs);
    let result = day1.getIncreases();
    expect(result).to.eql(7);
  })
});

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
    let day1 = new Day1(inputs, 3);
    let result = day1.getOutputs();
    expect(result).to.eql(expectedOutput);
  })

  it("gets expected count of increases", () => {
    let day1 = new Day1(inputs, 3);
    let result = day1.getIncreases();
    expect(result).to.eql(5);
  })
});
