import { CopyBlock, nord } from "react-code-blocks";
import { functionGenerator } from "@/helpers/functionGenerator";
import { useEffect, useState } from "react";

export default function Home() {
  const [arr, setArr] = useState<number[] | undefined>(undefined);
  const [nodes, setNodes] = useState<number>(2);
  const [generatedFunction, setGeneratedFunction] = useState<string>('');
  
  // generate a function with a random array of 8 elements numbers
  const generateArray = () => {
    const arr = Array.from({ length: nodes }, () => Math.floor(Math.random() * 100));
    setArr(arr);
  }

  useEffect(() => {
    if (arr) {
      setGeneratedFunction(functionGenerator(arr).function)
    }
  }, [arr]);

  return (
    <div className="">
      <div className="container">
        <div className="row">
        <button className="col-4" onClick={()=>generateArray()}>
          GENERATE RANDOM ARRAY
        </button>
        <div className="col-4">
        <input placeholder="Elija cantidad de nodos" type="number" min={2} onChange={(e)=>setNodes(Number(e.target.value))} value={nodes}></input>
        </div>
        <div className="col-4">
          {arr}
        </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
        <div className="col-12">
          <CopyBlock text={generatedFunction} theme={nord} language="typescript" wrapLongLines={true} showLineNumbers={true}/>
        </div>
        </div>
      </div>
    </div>
  );
}


