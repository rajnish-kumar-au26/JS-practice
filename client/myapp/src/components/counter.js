import { useState } from "react";
import "./styles.css";

function Counter() {
  const [counter, setCounter] = useState(0);
  const increase = () => {
    setCounter(counter + 1);
  };
  const decrease = () => {
    setCounter(counter - 1);
  };

  return (
    <div>
      <h4>{counter}</h4>
      <button onClick={() => increase()}>Increase</button>
      <button onClick={() => decrease()}>Decrease</button>
    </div>
  );
}

export default Counter;
