import React from "react";
import Square from "src/components/atoms/square";

const Board = ({ squares, onClick }: { squares: Array<any>; onClick: any }) => {
  return (
    <div className="board">
      <div>
        {squares.map((i: any, index: number) => (
          <Square value={squares[index]} onClick={() => onClick(index)} />
        ))}
      </div>
    </div>
  );
};

export default Board;
