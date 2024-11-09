import { dft } from "./FourierTransform.js";

export const functionGenerator = (arr: number[]) => {
  const signals = dft(arr);
  signals.toString = function() {
    let str = "[";
    str += "\n";
    for (let i = 0; i < signals.length; i++) {
    
      str += "      {re: " + signals[i].re + ", im: " + signals[i].im + "},";
      str += "\n";
      
    }
    str += "    ]";
    return str;
  }
  const f = `const f = (t: number) => { 
    const signals = ${signals.toString()}
    signals.reduce((acc, signal, index) => {
      return (
        acc +
        signal.re * Math.cos(2 * Math.PI * index * t) -
        signal.im * Math.sin(2 * Math.PI * index * t)
      );
    }, 0)
  }`

  return {
    signals: signals.toString(),
    function: f,
  };
};

