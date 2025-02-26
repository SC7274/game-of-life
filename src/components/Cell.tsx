import React from "react";

interface CellProps {
  isActive: boolean;
  onClick: () => void;
}

const Cell: React.FC<CellProps> = ({ isActive, onClick }) => (
  <div
    onClick={onClick}
    style={{
      width: 20,
      height: 20,
      backgroundColor: isActive ? "darkgray" : undefined,
      border: "solid 1px gray",
    }}
  />
);

export default Cell;
