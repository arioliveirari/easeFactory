import { CopyBlock, nord } from "react-code-blocks";
import { functionGenerator } from "@/helpers/functionGenerator";
import { useEffect, useState } from "react";
import SliderNode from "@/components/slider";

export default function Home() {
  const [arr, setArr] = useState<number[]>([0, 0]);
  const [nodes, setNodes] = useState<number>(2);
  const [generatedFunction, setGeneratedFunction] = useState<string>("");

  const changeItem = (index: number, value: number) => {
    const newArr = [...arr];
    newArr[index] = value;
    setArr(newArr);
  };

  // create a function that draws a line between the points of arr
  const drawLine = () => {
    // draw a line between the thumb position
    const canvas = document.getElementById("canva") as HTMLCanvasElement;
    //resize canvas to fit the container
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 1;
      const x = canvas.width / (nodes - 1);
      for (let i = 0; i < nodes; i++) {
        ctx.beginPath();
        ctx.moveTo(x * i, 0);
        ctx.lineTo(x * i, canvas.height);
        ctx.stroke();
        ctx.closePath();
      }
      for (let i = 0; i < 20; i++) {
        ctx.beginPath();
        ctx.moveTo(0, (x / 20) * i);
        ctx.lineTo(canvas.width, (x / 20) * i);
        ctx.stroke();
        ctx.closePath();
      }
 
      // create an array between 0 and 1 and include 0 and 1
      const xValues = Array.from({ length: 21 }, (_, i) => i / 20);
      console.log("XVALUES", xValues)
      const yValues = xValues.map((t: number) => functionGenerator(arr).function(t) as number);
      console.log(yValues, "YVALUES")

      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      for (let i = 0; i < yValues.length; i++) {
        ctx.lineTo((canvas.width / 21) * i, canvas.height / 2 - yValues[i]);
        console.log("Y VALUE", canvas.height / 2 + yValues[i]*canvas.height/2)
      }
      ctx.stroke();
      ctx.closePath();

    }
  };

  useEffect(() => {
    if (arr) {
      setGeneratedFunction(functionGenerator(arr).functionString);
    }
    console.log("ARRAY", arr);
    drawLine();
  }, [arr, nodes]);

  return (
    <div className="">
      <div className="container">
        <div className="row">
          <input
            placeholder="Elija cantidad de nodos"
            type="number"
            min={2}
            onChange={(e) => setNodes(Number(e.target.value))}
            value={nodes}
          ></input>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="slider-container" id="slider-container">
              <canvas
                id="canva"
                style={{ width: "100%", height: "100%" }}
              ></canvas>
              {Array.from({ length: nodes }).map((_, i) => (
                <SliderNode
                  key={i}
                  onChange={(value: number, index: number) =>
                    changeItem(index, value)
                  }
                  index={i}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <CopyBlock
              text={generatedFunction}
              theme={nord}
              language="typescript"
              wrapLongLines={true}
              showLineNumbers={true}
              customStyle={{
                borderRadius: "8px",
                padding: "20px",
                fontSize: "16px",
                minHeight: "300px",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
