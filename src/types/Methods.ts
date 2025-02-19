export type ChildMethods = {
  multiply: (num1: number, num2: number) => number;
  divide: (num1: number, num2: number) => Promise<number>;
};

export type ParentMethods = {
  add: (num1: number, num2: number) => number;
};
