import React, {Component} from 'react'
// import Row from './Row'
import Square from "./Square";
import Shape from "./Shape";

class Board extends Component {

	constructor(props) {
		super();
		const l = props.length;
		const w = props.width;
		let valid_array = [];
		for (let i = 0; i < l; i++) {
			valid_array[i] = [];
			for (let j = 0; j < w; j++) {
				valid_array[i][j] = 0;
			}
		}
		this.state = {
			score: 0,
			valid_array: valid_array,
		};
	}

	renderBoard() {
		const l = this.props.length;
		const w = this.props.width;
		let rows = [];
		for (let i = 0; i < l; i++) {
			let items = [];
			for (let j = 0; j < w; j++) {
				items.push(<Square key={i.toString() + "-" + j.toString()} valid={this.state.valid_array[i][j]}/>)
			}
			rows.push(items);
		}
		return rows;
	};

	componentDidMount() {
		this.setTimer();

		window.addEventListener('keydown', (e)=>{
			this.handleKey(e);
		});
	}


	setTimer = () => {
		this.timeout = setTimeout(this.updateSquare.bind(this), 800);
	};

	componentWillUnmount() {
		if (this.timeout) {
			clearTimeout(this.timeout);
		}
	}

	down(moving) {
		let valid_array = this.state.valid_array;
		let can_move_down = this.can_move_down(moving, valid_array);
		if (can_move_down) {
			return moving.map((one) => {
				return [one[0]+1, one[1]];
			});
		}
		else {
			return null;
		}
	}

	can_move_down(moving, valid_array) {
		let l = this.props.length;
		moving = moving.sort((a, b) => {
			if (a[1] !== b[1]) {
				return a[1] - b[1];
			}
			else {
				return b[0] - a[0];
			}
		});
		let last_y = -1;
		return moving.reduce((result, one) => {
			let x = one[0];
			let y = one[1];
			if (last_y !== y) {
				result = result && x < l - 1 && valid_array[x + 1][y] === 0;
				last_y = y;
			}
			return result;
		}, true);
	}

	can_move_left(moving, valid_array) {
		moving = moving.sort((a, b) => {
			if (a[0] !== b[0]) {
				return a[0] - b[0];
			}
			else {
				return a[1] - b[0];
			}
		});
		let last_x = -1;
		return moving.reduce((result, one) => {
			let x = one[0];
			let y = one[1];
			if (last_x !== x) {
				result = result && y > 0 && valid_array[x][y-1] === 0;
				last_x = x;
			}
			return result;
		}, true);
	}

	left(moving) {
		let valid_array = this.state.valid_array;
		let can_move_left = this.can_move_left(moving, valid_array);
		if (can_move_left) {
			return moving.map((one) => {
				return [one[0], one[1]-1];
			});
		}
		else {
			return null;
		}
	}

	can_move_right(moving, valid_array) {
		let w = this.props.width;
		moving = moving.sort((a, b) => {
			if (a[0] !== b[0]) {
				return a[0] - b[0];
			}
			else {
				return b[1] - a[1];
			}
		});
		let last_x = -1;
		return moving.reduce((result, one) => {
			let x = one[0];
			let y = one[1];
			if (last_x !== x) {
				result = result && y < w - 1 && valid_array[x][y+1] === 0;
				last_x = x;
			}
			return result;
		}, true);
	}

	right(moving) {
		let valid_array = this.state.valid_array;
		let can_move_right = this.can_move_right(moving, valid_array);
		if (can_move_right) {
			let m = moving.map((one) => {
				return [one[0], one[1]+1];
			});
			return m;
		}
		else {
			return null;
		}
	}

	eraseRows = () => {
		let valid_array = this.state.valid_array;
		const l = this.props.length;
		const w = this.props.width;
		let rows = 0;
		for (let i=l-1; i>0; i--) {
			let sum = valid_array[i].reduce((a, b) => {return a + b});
			if (sum === Number(w)) {
				rows++;
				valid_array.splice(i, 1);
			}
		}
		let score = this.state.score;
		for (let i = 1; i <= rows; i++) {
			let temp = [];
			for (let j = 0; j < w; j++) {
				temp[j] = 0;
			}
			valid_array.unshift(temp);
			score += i;
		}
		return [valid_array, score];
	};

	updateSquare = () => {
		let valid_array = this.state.valid_array;
		let shape = this.state.shape;
		let new_moving = null;
		let score = this.state.score;
		if (shape) {
			//下落
			new_moving = this.down(shape.squares);
			if (new_moving) {
				shape.squares.map((one) => {
					valid_array[one[0]][one[1]] = 0;
					return true;
				});
				shape.squares = new_moving;
			}
			else {
				shape = null;
				let result = this.eraseRows();
				valid_array = result[0];
				score = result[1];

			}
		} else {
			shape = new Shape();
			new_moving = shape.squares;
		}
		if (new_moving) {
			new_moving.map((one) => {
				valid_array[one[0]][one[1]] = 1;
				return true;
			});
		}
		this.setState({
			valid_array: valid_array,
			shape: shape,
			score: score,
		}, this.setTimer)
	};

	move = (e) => {
		let valid_array = this.state.valid_array;
		let shape = this.state.shape;
		let new_moving = null;
		if (shape) {
			if (e.keyCode === 40) {
			  //下落
			  new_moving = this.down(shape.squares);
			}
			else if(e.keyCode === 37) {
				//
				new_moving = this.left(shape.squares);
			}
			else if (e.keyCode === 39) {
				new_moving = this.right(shape.squares);
			}
			if (new_moving) {
				shape.squares.map((one) => {
					valid_array[one[0]][one[1]] = 0;
					return true;
				});
				shape.squares = new_moving;
			}
		}
		if (new_moving) {
			new_moving.map((one) => {
				valid_array[one[0]][one[1]] = 1;
				return true;
			});

		  this.setState({
			  valid_array: valid_array,
			  // moving: new_moving,
			  shape: shape,
		  })
		}
	};

	transform = () => {
		const l = this.props.length;
		const w = this.props.width;
		let valid_array = this.state.valid_array;
		let shape = this.state.shape;
		let new_moving = null;
		if (shape) {
			shape.squares.map((one) => {
				valid_array[one[0]][one[1]] = 0;
				return true;
			});

			shape.transform(0, w-1, 0, l-1, valid_array);
			new_moving = shape.squares;
			new_moving.map((one) => {
				valid_array[one[0]][one[1]] = 1;
				return true;
			});

			this.setState({
				valid_array: valid_array,
				// moving: new_moving,
				shape: shape,
			})
		}
	};

	// 按排消除
	// renderBoard() {
	//     let items = [];
	//     for (let i=0; i<9; i++) {
	//         items.push(<Row length="10" key={i}/>)
	//     }
	//     return items;
	// };

	handleKey = (e) => {
		if (e.keyCode === 38) {
			this.transform();
		}
		else {
			this.move(e);
		}
	};

	render() {
		let items = this.renderBoard();
		return (
			<div className="game-board" >
				<div className="score-board">
					SCORE: {this.state.score}
				</div>
				<div className="tetris-board">
					{items}
				</div>
			</div>
		);
	}
}

export default Board;
