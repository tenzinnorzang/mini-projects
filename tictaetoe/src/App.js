import { useState } from 'react';
import './App.css';

function App(){
  return(
    <div>
      <Board />
    </div>
  );
}

function Board(){
  const [xIsNext, setXIsNext] = useState(true);
  const[squares, setSquares] = useState(Array(9).fill(null));

  function handleSetSquare(i){
    if(squares[i] || calculateWinner(squares)){
      return;
    };

    const newSquares = [...squares];
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if(winner){
    status = "Winner: " + winner;
  }else{
    status = "Next Player: " + (xIsNext ? "X":"O");
  }
  
  return(
    <>
      <div>{status}</div>
      <div className='board-row'>
        <Square value={squares[0]} onSetSquare={() => handleSetSquare(0)}/>
        <Square value={squares[1]} onSetSquare={() => handleSetSquare(1)}/>
        <Square value={squares[2]} onSetSquare={() => handleSetSquare(2)}/>
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSetSquare={() => handleSetSquare(3)}/>
        <Square value={squares[4]} onSetSquare={() => handleSetSquare(4)}/>
        <Square value={squares[5]} onSetSquare={() => handleSetSquare(5)}/>
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSetSquare={() => handleSetSquare(6)}/>
        <Square value={squares[7]} onSetSquare={() => handleSetSquare(7)}/>
        <Square value={squares[8]} onSetSquare={() => handleSetSquare(8)}/>
      </div>
    </>
  );
}

function Square({value, onSetSquare}){

  return(
    <button className='square' onClick={onSetSquare}>{value}</button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


export default App;
