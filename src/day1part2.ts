export class Day1Part2 {
  #outputs: string[] = [];
  #increases = 0;

  constructor(inputs: Array<number>) {
    let last: number = null;

    for (let i = 0; i < inputs.length - 2; i++) {
      let input = inputs[i] + inputs[i+1] + inputs[i+2];
      let output = '';
      if (last === null) {
        output = `${input} (N/A - no previous sum)`;
      } else if (last < input) {
        output = `${input} (increased)`;
        this.#increases++;
      } else if (last == input) {
        output = `${input} (no change)`;
      } else {
        output = `${input} (decreased)`;
      }
      last = input;
      this.#outputs.push(output);
    }
  }

  getOutputs(): string[] {
    return this.#outputs;
  }

  getIncreases(): number {
    return this.#increases;
  }
  };
