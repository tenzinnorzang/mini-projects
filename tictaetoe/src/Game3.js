import { useState } from 'react';
import './App.css';

function Game3(){
    const [isNext, setIsNext] = useState(true);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquare = history[currentMove];

    function handleHistory(newSquare){
        const nextHistory = [...history.slice(0, currentMove+1), newSquare]
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length-1);
        setIsNext(!isNext);
    }

    function jumpTo(move){
        setCurrentMove(move);
    }

    const moves=history.map((_, move) => {
        let description;
        if(move > 0){
            description="Go to move #"+move
        }else {
            description="Go to start";
        }

        return(
            <li key={move}>
                {move === currentMove ? 
                    "You are at move #"+move 
                    : 
                    <button onClick={() => jumpTo(move)}>{description}</button>
                }
            </li>
        );
    });

    return(
        <div className="game">
            <div className="game-board">
                <Board isNext={isNext} squares={currentSquare} addHistory={handleHistory}/>
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>   
    );
}

function Board({isNext, squares, addHistory}){

    function handleAddClick(i){

        if(squares[i] || calculateWinner(squares)){
            return;
        }

        const newSquares = squares.slice();
        newSquares[i] = isNext ? "X":"O";
        addHistory(newSquares);
    }

    const winner = calculateWinner(squares);
    let status;

    if(winner?.winner){
        status = "Winner: " +winner.winner;
        console.log(winner.inde);
    }else{
        status = "Next Player: " +(isNext ? "X":"O");
    }
    
    
    return(
        <>
            <div>{status}</div>
            {[0,3,6].map((start) => (
                <div key={start} className='board-row'>
                    
                    {Array(3).fill(null).map((_, index) => (
                        <Square 
                            winnerInde={winner?.inde}
                            key={start+index} 
                            value={squares[index+start]} 
                            squareClick={() => handleAddClick(start+index)}
                            index={index} start={start}
                        />
                    ))}
                </div>
            ))}
        </>
    );
}

function Square({value, squareClick, winnerInde, index, start}){
    return(
        <div className='square' onClick={squareClick} style={winnerInde && winnerInde.includes(index+ start) ? {backgroundColor: "red"} : {}}>
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

export default Game3;