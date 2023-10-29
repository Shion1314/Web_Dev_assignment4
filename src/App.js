import React, { useState } from "react";

import "./styles.css";

const range = (n) => [...Array(n).keys()]; // equivalent to range() in python

export default function App() {
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);

  const addRow = () => {
    setRows((currentValue) => {
      if (currentValue <= 0) {
        setCols(1);
      }

      return currentValue + 1;
    });
  };

  const removeRow = () => {
    setRows((currentValue) => {
      if (currentValue - 1 <= 0) {
        setCols(0);
      }

      return Math.max(0, currentValue - 1);
    });
  };

  const addColumn = () => {
    setCols((currentValue) => {
      if (rows <= 0) {
        setRows(1);
      }

      return currentValue + 1;
    });
  };

  const removeColumn = () => {
    setCols((currentValue) => {
      if (currentValue - 1 <= 0) {
        setRows(0);
      }

      return Math.max(0, currentValue - 1);
    });
  };

  return (
    <div>
      <h1>Add Square to Blank Sheet</h1>

      <div className="button-group">
        <button onClick={addRow}>Add Row</button>
        <button onClick={removeRow}>Remove Row</button>
        <button onClick={addColumn}>Add Column</button>
        <button onClick={removeColumn}>Remove Column</button>
      </div>

      <table id="grid-sheet">
        <tbody>
          {range(rows).map((key) => (
            <tr key={key}>
              {range(cols).map((key) => (
                <td className="square" key={key} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
