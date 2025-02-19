import { PortMessenger, connect, debug } from "penpal";
import { ChildMethods, ParentMethods } from "../types/Methods.ts";

const initPenpal = async () => {
  const { port1, port2 } = new MessageChannel();

  navigator.serviceWorker.controller?.postMessage(
    {
      type: "INIT_PENPAL",
      port: port2,
    },
    {
      transfer: [port2],
    },
  );

  const messenger = new PortMessenger({
    port: port1,
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
};

if (navigator.serviceWorker.controller) {
  initPenpal();
}

navigator.serviceWorker.addEventListener("controllerchange", initPenpal);
navigator.serviceWorker.register(
  new URL("./serviceWorker.js", import.meta.url),
);
