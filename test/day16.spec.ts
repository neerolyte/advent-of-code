import { expect } from 'chai';
import * as _ from 'lodash';
import { max, min } from 'lodash';

describe("day 16", () => {
  type RawTransmission = string;
  enum Type {
    literal = 4,
  }
  type Transmission = {
    version: number,
    type: Type,
    value: number,
  };

  function sumVersions(transmission: RawTransmission): number {
    return 3;
  }

  function toBinaryString(hex: string): string {
    return hex.split('')
    .flatMap((d) => (parseInt(d, 16).toString(2).padStart(4, '0').split('')))
    .join('')
  }

  function parseValue(bin: string): number {
    // break in to 5 bit chunks
    return _.chunk(bin, 5)
    // parse in to actual numbers
    .map((d) => parseInt(d.join(''), 2))
    // sum numbers
    .reduce((previous, current) => {
      return current & 0b11111 ? (previous << 4) + (current & 0b1111) : previous;
    }, 0)
  }

  function parse(transmission: RawTransmission): Transmission {
    let binTrans = toBinaryString(transmission)
    return {
      // version is the first 3 bits
      version: parseInt(binTrans.substring(0, 3), 2),
      // type is the 2nd 3 bits
      type: parseInt(binTrans.substring(3, 6), 2),
      value: parseValue(binTrans.substring(6)),
    }
  }

  describe("part 1", () => {

    it("parses version from literal value", () => {
      expect(parse('D2FE28')).to.eql({
        version: 6,
        type: Type.literal,
        value: 2021,
      });
    })

    describe.skip("calculates version sums", () => {
      ([
        ['8A004A801A8002F478', 16],
        ['620080001611562C8802118E34', 12],
        ['C0015000016115A2E0802F182340', 23],
        ['A0016C880162017C3686B18A3D4780', 31],
      ] as [RawTransmission, number][]).forEach((t) => {
        let transmission: RawTransmission = t[0];
        let sum: number = t[1];
        it(`${transmission} => ${sum}`, () => {
          expect(sumVersions(transmission)).to.eql(sum);
        })
      })
    })
  })
})
