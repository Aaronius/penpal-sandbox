import { WindowMessenger, connect, debug } from 'penpal';
import {ChildMethods, ParentMethods} from "./Methods.ts";

const iframe = document.createElement('iframe');
iframe.src = 'iframe.html';
document.body.appendChild(iframe);

const messenger = new WindowMessenger({
    remoteWindow: iframe.contentWindow!,
});

const methods: ParentMethods = {
    add(num1: number, num2: number) {
        return num1 + num2;
    },
}

const connection = connect<ChildMethods>({
    messenger,
    // Methods the parent window is exposing to the iframe window.
    methods,
    log: debug('Parent')
});

const remote = await connection.promise;
// Calling a remote method will always return a promise.
const multiplicationResult = await remote.multiply(2, 6);
console.log(multiplicationResult); // 12
const divisionResult = await remote.divide(12, 4);
console.log(divisionResult); // 3