import './index.css';
import { useState } from 'react';

function Game(){
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);

    const currentSquares = history[currentMove];
    const isNext = currentMove % 2 ===0;

    function handlePlay(newSquare){
        const nextHistory = [...history.slice(0, currentMove+1), newSquare];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length -1);
    }

    function jumpTo(nextMove){
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) => {
        let description;
        if(move > 0){
            description = 'Go to move # ' +move;
        }else{
            description = 'Go to game start'
        }return(
            <li key={move}>
                <button onClick={()=> jumpTo(move)}>{description}</button>
            </li>
        )
    });

    return(
        <div className='game'>
            <div className='game-board'>
                <Board isNext={isNext} squares={currentSquares} onPlay={handlePlay}/>
            </div>
            <div className='game-info' >
                <ol>{moves}</ol>
            </div>
            
        </div>
    );
}

function Board({isNext, squares, onPlay}){

    function handleSquareClick(i){
        if(squares[i] || calculateWinner(squares)){
            return;
        }

        const newSquare = squares.slice();

        newSquare[i] = isNext ? "X" : "O";
        onPlay(newSquare);
    }

    const winner = calculateWinner(squares);
    let status;
    if(winner){
        status= "Winner: " + winner;
    }else{
        status= "Next player: " + (isNext ? "X" : "O");
    }

    return(
        <>
            <div>{status}</div>
            <div className='board-row'>
                <Square value={squares[0]} onSquare={()=>handleSquareClick(0)}/>
                <Square value={squares[1]} onSquare={()=>handleSquareClick(1)}/>
                <Square value={squares[2]} onSquare={()=>handleSquareClick(2)}/>
            </div>
            <div className='board-row'>
                <Square value={squares[3]} onSquare={()=>handleSquareClick(3)}/>
                <Square value={squares[4]} onSquare={()=>handleSquareClick(4)}/>
                <Square value={squares[5]} onSquare={()=>handleSquareClick(5)}/>
            </div>
            <div className='board-row'>
                <Square value={squares[6]} onSquare={()=>handleSquareClick(6)}/>
                <Square value={squares[7]} onSquare={()=>handleSquareClick(7)}/>
                <Square value={squares[8]} onSquare={()=>handleSquareClick(8)}/>
            </div>
        </>
    );
}

function Square({value, onSquare}){
    return(
        <div className='square' onClick={onSquare}>{value}</div>
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
  

export default Game;