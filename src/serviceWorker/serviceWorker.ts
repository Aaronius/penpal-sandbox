import { PortMessenger, connect, debug } from "penpal";
import { ChildMethods, ParentMethods } from "../types/Methods.ts";

declare const self: ServiceWorkerGlobalScope;

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", () => self.clients.claim());
self.addEventListener("message", async (event) => {
  if (event.data?.type !== "INIT_PENPAL") {
    return;
  }

  const { port } = event.data;

  const messenger = new PortMessenger({
    port,
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
});
