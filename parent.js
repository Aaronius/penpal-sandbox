import { connectToChild } from 'penpal';

const iframe = document.createElement('iframe');
iframe.src = 'child.html';
if (
  document.readyState === 'complete' ||
  document.readyState === 'interactive'
) {
  document.body.appendChild(iframe);
} else {
  document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(iframe);
  });
}

const connection = connectToChild({
  // The iframe to which a connection should be made
  iframe,
  // Methods the parent is exposing to the child
  methods: {
    add(num1, num2) {
      return num1 + num2;
    },
  },
});

connection.promise.then((child) => {
  child.multiply(2, 6).then((total) => console.log("2*6", total));
  child.divide(12, 4).then((total) => console.log("12/4", total));
});
