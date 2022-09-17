import { useReducer } from "react";
import Board from "src/components/molecules/board";

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "JUMP":
      return {
        ...state,
        xIsNext: action.payload.step % 2 === 0,
        history: state.history.slice(0, action.payload.step + 1),
      };
    case "MOVE":
      return {
        ...state,
        history: state.history.concat({
          squares: action.payload.squares,
        }),
        xIsNext: !state.xIsNext,
      };
    default:
      return state;
  }
};

const Game = () => {
  const [state, dispatch] = useReducer(reducer, {
    xIsNext: true,
    history: [{ squares: Array(9).fill(null) }],
  });
  const { xIsNext, history } = state;

  const jumpto = (step: any) => dispatch({ type: "JUMP", payload: { step } });
  const hanldeClick = (index: number) => {
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const winner = calculateWinner(squares);

    if (winner || squares[index]) return;

    squares[index] = xIsNext ? "X" : "O";
    dispatch({ type: "MOVE", payload: { squares } });
  };

  const current = history[history.length - 1];
  const winner = calculateWinner(current.squares);

  const status = winner
    ? winner === "D"
      ? "Draw"
      : `Winner is ${winner}`
    : `Next player is ${xIsNext ? "X" : "O"}`;
  const moves = history.map((step: any, move: any) => {
    const desc = move ? "Go to #" + move : "Start game";
    return (
      <li key={move}>
        <button onClick={() => jumpto(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div>
      <h1 className="title">TIC TAC TOE GAME</h1>
      <div className="game">
        <div className="game-board">
          <Board
            onClick={(id: number) => hanldeClick(id)}
            squares={current.squares}
          />
        </div>
        <div className="game-info">
          <div>
            <h3>Status of the game:</h3>
            <div>{status}</div>
          </div>
          <div>
            <h3>History of the game:</h3>
            <div>{moves}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const calculateWinner = (squares: Array<null | String>) => {
  const winnerLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [6, 4, 2],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];
  let isDraw = true;

  for (let i = 0; i < winnerLines.length; i++) {
    const [a, b, c] = winnerLines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[b] &&
      squares[b] === squares[c]
    )
      return squares[a];

    if (!squares[a] || !squares[b] || !squares[c]) {
      isDraw = false;
    }
  }

  if (isDraw) return "D";

  return null;
};

export default Game;
