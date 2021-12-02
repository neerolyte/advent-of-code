
interface position {
  horizontal: number;
  depth: number;
}

let a: position = {
  horizontal: 1,
  depth: 2
};

let b = { ...a, depth: 3 };

console.log(b)
