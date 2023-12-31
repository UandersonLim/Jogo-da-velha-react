import React from 'react';
import { useState, useEffect } from 'react';
type Players = "O" | "X";
function App() {
  const [turn, setTurn] = useState<Players>("O");
  const [winner, setWinner] = useState<Players | null>(null);
  const [draw, setDraw] = useState<boolean | null>(null);
  const [marks, setMarks] = useState<{ [key: string]: Players }>({});
  const gameOver = !!winner || !!draw;
  const getSquares = () => {
    return new Array(9).fill(true)
  };
  const play = (index: number) => {
    if (marks[index] || gameOver) {
      return;
    }
    setMarks(prev => ({ ...prev, [index]: turn }))
    setTurn(prev => prev === 'O' ? "X" : "O")
  };

  const getCellplayer = (index: number) => {
    if (!marks[index]) {
      return;

    }
    return marks[index];
  }

  const getWinner = () => {
    const victoryLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],

      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],

      [1, 4, 7],
      [2, 5, 8]

    ]

    for (const line of victoryLines) {
      const [a, b, c] = line;

      if (marks[a] && marks[a] === marks[b] && marks[a] === marks[c])
        return marks[a];
    }
  }
  useEffect(() => {
    const winner = getWinner()

    if (winner) {
      setWinner(winner)
    } else {
      if (Object.keys(marks).length === 9) {
        setDraw(true)
      }
    }
  }, [marks]);

  const reset = () => {
    setTurn(marks[0] === "O" ? "X" : "O");
    setMarks({});
    setWinner(null);
    setDraw(null);
  }

  return (
    <div className="container">
      {winner && <h1>{winner} Ganhou</h1>}
      {draw && <h1>Empate</h1>}
      {gameOver && <button onClick={reset}>Jogar Novamente</button>}
      {!gameOver && <p>É a vez de {turn}</p>}
      <div className={`board ${gameOver ? "gameOver" : null}`}>
        {getSquares().map((_, i) => (
          <div className={`cell ${getCellplayer(i)}`} onClick={() => play(i)}>
            {marks[i]}

          </div>
        ))}

      </div>
    </div>
  );
}
export default App;
