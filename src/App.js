import React, { useState } from 'react';
import './styles.css';

function Row({ NumCol}) {
  const square = [];
  for (let index = 0; index < NumCol; index++) {
    square.push(<td key={index} className='square'></td>)
  }

  return (
   <tr>{square}
  
   
   </tr>
  );
}

export default function App() {
  const [grid, setGrid] = useState([]);

  const addRow = () => {
    let NumCol;
    if (grid[0]) { 
      NumCol = grid[0].props.NumCol;
    } else {
      NumCol = 1;
    }
    const newRow = <Row NumCol={NumCol} />;
    const row = [...grid, newRow]
    setGrid(row);
  };

  const removeRow = () => {
    if (grid.length > 0) {
      setGrid(grid.slice(0, -1));
    }
  };




  return (
    <div>
      <h1>Add Square to Blank Sheet</h1>
      <div className="button-group">
        <button onClick={addRow}>Add Row</button>
        <button onClick={removeRow}>Remove Row</button>
      </div>
      <table id="grid-sheet">
        <tbody>{grid}</tbody>
      </table>
    </div>
  );
}


//s