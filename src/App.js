import React from 'react';
import './style.css';

class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

/*
[0, 1, 2, 3, 4, 5, 6, 7, 8]

3 => [0, 1, 2]
      X
      [4, 5, 6, 7, 8]

      return [0, 1, 2, X, 4, 5, 6, 7, 8]
*/
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

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = { squares: Array(9).fill(null), xIsNext: true };
    this.handleClick = i => {
      this.setState({
        squares: [
          ...this.state.squares.slice(0, i),
          this.state.xIsNext ? 'X' : 'O',
          ...this.state.squares.slice(i + 1, this.state.squares.length)
        ],
        xIsNext: !this.state.xIsNext
      });
    };
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    let status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    if (calculateWinner(this.state.squares)) {
      status = `Winner: ${this.state.xIsNext ? 'O' : 'X'}`;
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

export default function App() {
  return <Game />;
}
