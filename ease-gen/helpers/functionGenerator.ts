import { dft } from "./FourierTransform.js";

export const functionGenerator = (arr: number[]) => {
  console.log("ARRAY IN FUNCTION GEN", arr)
  const signals = dft(arr);
  
  const f = (t: number) => { 
    const value = signals.reduce((acc, signal, index) => {
      return (
        acc +
        signal.re * Math.cos(2 * Math.PI * index * t) -
        signal.im * Math.sin(2 * Math.PI * index * t)
      );
    }, 0)
    return value
  }

  const signalstoString = function() {
    let str = "[";
    str += "\n";
    for (let i = 0; i < signals.length; i++) {
    
      str += "      {re: " + signals[i].re + ", im: " + signals[i].im + "},";
      str += "\n";
      
    }
    str += "    ]";
    return str;
  }
  
  const fString = `const f = (t: number) => { 
    const signals = ${signalstoString()}
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
    functionString: fString,
    function: f,
    
  };
};

