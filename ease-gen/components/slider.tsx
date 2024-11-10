// create a basic tsx component with a return of a div

import { useEffect, useState } from "react";

export default function SliderNode({ onChange, index }: { onChange: (value: number, index: number) => void, index: number }) {

  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    onChange(value, index);
  }, [value]);

  return(
      <div className="slider">
        <input
          type="range"
          className="input"
          min={-1}
          max={1}
          value={value}
          step={0.01}
          onChange={(e) => setValue(Number(e.target.value))}
        />
      </div>
  )
}
