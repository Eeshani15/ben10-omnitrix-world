import React, { useState } from "react";
import "./App.css";

// Aliens
const aliens = [
  { name: "Heatblast", img: "/images/heatblast.png" },
  { name: "Four Arms", img: "/images/fourarms.png" },
  { name: "XLR8", img: "/images/xlr8.png" },
  { name: "Diamondhead", img: "/images/diamondhead.png" },
];

// Sounds
const clickSound = new Audio("/sounds/click.mp3");
const transformSound = new Audio("/sounds/transform.mp3");

function App() {
  const [started, setStarted] = useState(false);
  const [entered, setEntered] = useState(false); // 🔥 NEW
  const [index, setIndex] = useState(0);
  const [flash, setFlash] = useState(false);

  const handleClick = () => {
    clickSound.currentTime = 0;
    clickSound.play();

    setFlash(true);
    setTimeout(() => setFlash(false), 400);

    if (!started) {
      setStarted(true);
      return;
    }

    transformSound.currentTime = 0;
    transformSound.play();

    setIndex((prev) => (prev + 1) % aliens.length);
  };

  // 🔥 WELCOME PAGE FIRST
  if (!entered) {
    return (
      <div className="welcome">
        <h1> Welcome to Ben 10 Omnitrix World</h1>
        <button onClick={() => setEntered(true)}>
          Enter Omnitrix
        </button>
      </div>
    );
  }

  // 🔥 YOUR ORIGINAL APP (UNCHANGED)
  return (
    <div className="container">

      <div className={`flash ${flash ? "active" : ""}`}></div>

      <h1>Omnitrix</h1>

      <div className="watch" onClick={handleClick}>
        <div className="innerCircle">

          {!started ? (
            <img src="/images/watch.png" className="frameImg pop" />
          ) : (
            <img
              key={index}
              src={aliens[index].img}
              className="frameImg pop"
              alt="alien"
            />
          )}

        </div>
      </div>

      {started && <h2 className="name">{aliens[index].name}</h2>}
    </div>
  );
}

export default App;