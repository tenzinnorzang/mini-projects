import { useState } from 'react';
import './App.css';

function Game2(){
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const isNext = currentMove % 2 ===0;
    const currentSquare = history[currentMove];


    function handlePlay(newSquare){
        const nextHistory = [...history.slice(0, currentMove+1), newSquare];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length-1);
    }

    function jumpTo(move){
        setCurrentMove(move);
    }

    const moves = history.map((squares, move) => {
        let description;
        if(move > 0){
            description = "Go to move #" +move;
        }else{
            description = "Go to game start";
        }

        return(
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    })

    return(
        <div className="game">
            <div className="game-board">
                <Board isNext={isNext} squares={currentSquare} onPlay={handlePlay}/>
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

function Board({isNext, squares, onPlay}){

    function handleSquare(i){
        if(squares[i] || calculateWinner(squares)){
            return;
        }

        const newSquare = squares.slice();
        newSquare[i] = isNext ? "X":"O";
        onPlay(newSquare);
    }

    const winner = calculateWinner(squares);
    let status;
    if(winner){
        status = "Winner: "+ winner;
    }else{
        status = "Next Player: " + (isNext ? "X":"O");
    }

    return(
        <>
            <div>{status}</div>
            {[0, 3, 6].map((start) => (
            <div key={start} className='board-row'>
                {Array(3).fill(null).map((_, index) => (
                    <Square
                    key={start + index}
                    value={squares[start + index]}
                    squareClick={() => handleSquare(start + index)}
                    />
                ))}
            </div>
            ))}
        </>
    );
}

function Square({value, squareClick}){
    return(
        <div className='square' onClick={squareClick}>
            {value}
        </div>
    );
}

function calculateWinner(squares){
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

    for(let i=0; i<lines.length; i++){
        const [a,b,c] = lines[i]
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a];
        }
    }
    return null;
}


export default Game2;