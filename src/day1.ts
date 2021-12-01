export class Day1 {
  #inputs;
  #outputs: string[];
  #increases = 0;

  constructor(inputs: Array<number>) {
    this.#inputs = inputs;
    let last: number = null;

    this.#outputs = this.#inputs.map((input): string => {
      let output = '';
      if (last === null) {
        output = `${input} (N/A - no previous measurement)`;
      } else if (last < input) {
        output = `${input} (increased)`;
        this.#increases++;
      } else {
        output = `${input} (decreased)`;
      }
      last = input;
      return output;
    });
  }

  getOutputs(): string[] {
    return this.#outputs;
  }

  getIncreases(): number {
    return this.#increases;
  }
};
