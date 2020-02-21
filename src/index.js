import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Square(props) {
	return (
		<button className="square"
			onClick={props.onClick}>
			{props.value}
		</button>
	);
}

class Board extends React.Component {
	renderSquare(i) {
		return (<Square value={this.props.squares[i]}
						onClick={()=> this.props.onClick(i)}/>
		);
	}

	render() {
		return (
			<div>
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
	constructor(props) {
		super(props);
		this.state = {
			history: [{squares: Array(9).fill(null), xIsNext: true}],
			current_move: 1,
		};
	}

	handleClick(i) {
		let history = [...this.state.history];
		let {squares, xIsNext} = history[history.length-1];
		squares = {...squares};
		if (squares[i] || calculateWinner(squares))
			return;
		squares[i] = xIsNext ? 'X':'O';
		history = this.state.history.concat({squares: squares, xIsNext: !xIsNext})
		this.setState({history: history});
	}

	goBack(i) {
		const current_move = i+1;
		this.setState({history: this.state.history.slice(0, current_move),
					   current_move: current_move})
	}

	render() {
		const history = [...this.state.history];
		const {squares, xIsNext} = history[history.length-1];
		const moves = history.map((e, index)=> {
			let tag = 'restart';
			if(index)
				tag = `go to movement: ${index}`;
			return (
				<li key={index}>
					<button onClick={()=> this.goBack(index)}>
						{tag}
					</button>
				</li>
			);
		})
		let status = `Next player: ${xIsNext ? 'X':'O'}`;
		let winner = calculateWinner(squares)
		if(winner)
			status = `The winner is: ${winner}`;
		return (
			<div className="game">
				<div className="game-board">
					<Board squares={squares}
						   xIsNext={xIsNext}
						   onClick={(i)=> this.handleClick(i)}/>
				</div>
				<div className="game-info">
					<div>{status}</div>
					<ol>{moves}</ol>
				</div>
			</div>
		);
	}
}

// ========================================

ReactDOM.render(
	<Game />,
	document.getElementById('root')
);

