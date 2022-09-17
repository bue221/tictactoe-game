import React from "react";

const Square = ({ value, onClick }: { value: string; onClick: any }) => {
  return (
    <button className="btn" onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;
