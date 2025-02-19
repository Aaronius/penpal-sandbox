import { WorkerMessenger, connect, debug } from "penpal";
import { ChildMethods, ParentMethods } from "../types/Methods.ts";

const worker = new Worker(new URL("./worker.js", import.meta.url));

const messenger = new WorkerMessenger({
  worker,
});

const methods: ParentMethods = {
  add(num1: number, num2: number) {
    return num1 + num2;
  },
};

const connection = connect<ChildMethods>({
  messenger,
  methods,
  log: debug("Parent"),
});

const remote = await connection.promise;
const multiplicationResult = await remote.multiply(2, 6);
console.log(multiplicationResult); // 12
const divisionResult = await remote.divide(12, 4);
console.log(divisionResult); // 3
