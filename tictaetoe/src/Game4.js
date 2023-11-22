import { useState } from 'react';
import './App.css';

function Game4(){
    const [isNext, setIsNext] = useState(true);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquare = history[currentMove];

    function handleOnPlay(newSquare){
        const nextHistory = [...history.slice(0, currentMove+1), newSquare];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length-1);
        setIsNext(!isNext);
    }

    function jumpTo(move){
        setCurrentMove(move)
    }

    const moves = history.map((_, move) => {
        let description;
        if(move > 0){
            description="You are at move #" +move;
        }else{
            description="Go to Start";
        }

        return(
            <li key={move}>
                {
                    move === currentMove ? ("You are at move #" +move)
                    :
                    <button onClick={() => jumpTo(move)}>{description}</button>
                }
            </li>
        )
    })


    return(
        <div className="game">
            <div className="game-board">
                <Board isNext={isNext} squares={currentSquare} onPlay={handleOnPlay}/>
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>  
    );
}

function Board({isNext, squares, onPlay}){

    function handleClick(i){
        if(squares[i] || calculateWinner(squares)){
            return;
        }

        const newSquare = squares.slice();

        newSquare[i] = isNext ? "X" : "O";
        onPlay(newSquare);
    }

    const winner = calculateWinner(squares);
    let status;

    if(winner?.winner){
        status="Winner: " +winner.winner;
    }else{
        status="Next is: " +(isNext ? "X":"O");
    }

    return(
        <>
            <div>{status}</div>
            {[0,3,6].map((start) => (
                <div className='board-row'>
                    {Array(3).fill(null).map((_, index) => (
                        <Square 
                            value={squares[start+index]} 
                            onClickSquare={() => handleClick(start+index)}
                            winIndex={winner?.inde}
                            start={start} index={index}
                        />
                    ))}
                </div>
            ))}
        </>
        
    );
}

function Square({value, onClickSquare, winIndex, start, index}){
    return(
        <div className='square' onClick={onClickSquare} 
            style={winIndex && winIndex.includes(start+index) ? {backgroundColor: "red"} : {}}>
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
        const [a,b,c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return {winner: squares[a], inde: lines[i]};
        }
    }
    return null;
}

export default Game4;