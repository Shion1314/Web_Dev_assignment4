import { useRef, useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { Popover } from "react-tiny-popover";

import "./styles.css";

const range = (n) => [...Array(n).keys()]; // equivalent to range() in python

export default function App() {
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);

  const [color, setColor] = useState("#fff");
  const [isPickerOpened, setIsPickerOpened] = useState(false);

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

  const colorCell = (cell) => {
    cell.style.backgroundColor = color;
  };

  const colorAllCell = () => {
    document.querySelectorAll("td").forEach((td) => {
      td.style.backgroundColor = color;
    })
  }

  const colorUncolored = () => {
    document.querySelectorAll("td").forEach((td) => {
      const currentColor = td.style.backgroundColor;
      if (currentColor === "" || currentColor === "transparent"){
        td.style.backgroundColor = color;
      }
    })
  }

  return (
    <div>
      <h1>Add Square to Blank Sheet</h1>

      <div className="flex-row">
        <div className="button-group">
          <button onClick={addRow}>Add Row</button>
          <button onClick={removeRow}>Remove Row</button>
          <button onClick={addColumn}>Add Column</button>
          <button onClick={removeColumn}>Remove Column</button>
          <button onClick={colorAllCell}>Color All Cells</button>
          <button onClick={colorUncolored}>Color All Uncolored Cells</button>
        </div>

        <Popover
          isOpen={isPickerOpened}
          padding={10}
          positions={["bottom"]}
          content={
            <>
              <HexColorPicker color={color} onChange={setColor} />
              <HexColorInput color={color} onChange={setColor} prefixed />
            </>
          }
        >
          <button
            className="swatch"
            onClick={() => setIsPickerOpened(!isPickerOpened)}
            style={{ backgroundColor: color }}
          />
        </Popover>
      </div>

      <table id="grid-sheet">
        <tbody>
          {range(rows).map((key) => (
            <tr key={key}>
              {range(cols).map((key) => (
                <td
                  key={key}
                  className="square"
                  onClick={({ currentTarget }) => colorCell(currentTarget)}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
