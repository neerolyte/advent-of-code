export class Day1 {
  #outputs: string[] = [];
  #increases = 0;

  constructor(inputs: Array<number>, window: number = 1) {
    let last: number = null;

    for (let i = 0; i < inputs.length - (window - 1); i++) {
      let current = inputs.slice(i, i + window).reduce((a, b) => { return a + b; });
      let output = '';
      if (last === null) {
        output = `${current} (N/A - no previous sum)`;
      } else if (last > current) {
        output = `${current} (decreased)`;
      } else if (last == current) {
        output = `${current} (no change)`;
      } else {
        this.#increases++;
        output = `${current} (increased)`;
      }
      last = current;
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
