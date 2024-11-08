import { dft } from "./easeGenerator.js";

const testFunction = (arr) => {
  // gets the dtf of the array
  const signals = dft(arr);
    // returns the function that goes through the array
    const f = (t) =>
        signals.reduce((acc, signal, index) => {
        return (
            acc +
            signal.re * Math.cos(2 * Math.PI * index * t) -
            signal.im * Math.sin(2 * Math.PI * index * t)
        );
        }, 0);

    const values = Array.from({ length: 8 }, (_, index) => f(index / 8));

    return ({
        function: f,
        values: values
    });

};

const testArray = [1, 2, 3, 4, 5, 6, 7, 8]

console.log("initial array", testArray)
console.log("estimated values", testFunction(testArray).values)

console.log("difference", testFunction(testArray).values.map((x, i) => x - testArray[i]))
console.log("function", testFunction(testArray).function)
