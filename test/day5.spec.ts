import { expect } from 'chai';
import * as fs from 'fs';
import { start } from 'repl';


describe('day 3', () => {
  interface Point {
    x: number,
    y: number,
  };
  interface Line {
    start: Point,
    end: Point,
  };
  function parseLines(strLines: string[]): Line[] {
    return strLines.map((line: string): Line => {
      let match = line.match(/^([0-9]+),([0-9]+) -> ([0-9]+),([0-9]+)$/);
      if (!match) {
        throw new Error("WTF")
      }
      return {
        start: { x: parseInt(match[1]), y: parseInt(match[2])},
        end: { x: parseInt(match[3]), y: parseInt(match[4])},
      }
    });
  }
  let example = parseLines([
    '0,9 -> 5,9',
    '8,0 -> 0,8',
    '9,4 -> 3,4',
    '2,2 -> 2,1',
    '7,0 -> 7,4',
    '6,4 -> 2,0',
    '0,9 -> 2,9',
    '3,4 -> 1,4',
    '0,0 -> 8,8',
    '5,5 -> 8,2',
  ]);
  const real = parseLines(fs.readFileSync(__dirname + '/inputs/day5.txt','utf8').trim().split("\n"));
  it("parses lines", () => {
    expect(example[0].start).to.eql({x: 0, y: 9});
    expect(example[0].end).to.eql({x: 5, y: 9});
  })
  function calculatePoints(line: Line): Point[] {
    let points: Point[] = [];
    let distance = Math.max(
      Math.abs(line.start.x - line.end.x),
      Math.abs(line.start.y - line.end.y),
    );
    let xStep = (line.end.x - line.start.x) / distance;
    let yStep = (line.end.y - line.start.y) / distance;
    for (let i = 0; i <= distance; i++) {
      points.push({
        x: line.start.x + xStep * i,
        y: line.start.y + yStep * i,
      });
    }
    return points;
  }

  it("calculates all points on a line", () => {
    expect(calculatePoints({
      start: { x: 3, y: 5 },
      end: { x: 3, y: 10 },
    })).to.eql([
      { x: 3, y: 5 },
      { x: 3, y: 6 },
      { x: 3, y: 7 },
      { x: 3, y: 8 },
      { x: 3, y: 9 },
      { x: 3, y: 10 },
    ])
  })

  it("calculates all points on a diagonal line", () => {
    expect(calculatePoints({
      start: { x: 5, y: 3 },
      end: { x: 3, y: 5 },
    })).to.eql([
      { x: 5, y: 3 },
      { x: 4, y: 4 },
      { x: 3, y: 5 },
    ])
  })

  function getPoints(lines: Line[]) {
    lines.forEach((line: Line) => {
      calculatePoints(line).forEach((point: Point) => {
        console.log(point)
      })
    })
  }
  // getPoints(real); // - and then:
  // sort temp.txt | uniq -c | sort -rn | view -
  // + :set number


});
