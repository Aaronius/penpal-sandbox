import { WorkerMessenger, connect, debug } from "penpal";
import { ChildMethods, ParentMethods } from "../types/Methods.ts";

declare const self: DedicatedWorkerGlobalScope;

const messenger = new WorkerMessenger({
  worker: self,
});

const methods: ChildMethods = {
  multiply(num1: number, num2: number) {
    return num1 * num2;
  },
  divide(num1: number, num2: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(num1 / num2);
      }, 1000);
    });
  },
};

const connection = connect<ParentMethods>({
  messenger,
  methods,
  log: debug("Child"),
});

const remote = await connection.promise;
const additionResult = await remote.add(2, 6);
console.log(additionResult); // 8
