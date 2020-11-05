import { useState } from "react";
import Board from "../Board";

function Game() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setxIsNext] = useState(true);
    const [history, setHistory] = useState([[squares]]);

    function handleClick(i) {
        setHistory([squares, ...history ]);
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        setSquares([
            ...squares.slice(0, i),
            xIsNext ? "X" : "O",
            ...squares.slice(i + 1),
        ]);
        setxIsNext(!xIsNext);
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
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (
                squares[a] &&
                squares[a] === squares[b] &&
                squares[a] === squares[c]
            ) {
                return squares[a];
            }
        }
        return null;
    }

    function getStatus() {
        const winner = calculateWinner(squares);
        if (winner) {
            return "Winner: " + winner;
        } else {
            return "Next player: " + (xIsNext ? "X" : "O");
        }
    }

    function newGame(){
        setSquares(Array(9).fill(null));
        setHistory([[squares]]);
    }

    return (
        <div className="game">
            <button onClick={newGame}>New Game</button>
            <div className="game-board">
                <Board squares={squares} handleClick={handleClick} />
            </div>
            <div className="game-info">
                <div>{getStatus()}</div>
                <ol>{/* TODO */}</ol>
            </div>
        </div>
    );
}

export default Game;