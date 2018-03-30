class Shape {

	constructor() {
		this.type = get_type();
		this.squares = generate_squares(this.type);
		this.state = 0;
		this.state_num = 4;
	}

	transform(left, right, upper, down, valid_array) {
		let squares = this.squares.sort((a,b)=>{
			let temp = a[0] + a[1] - b[0] - b[1];
			if (temp === 0) {
				temp = a[0] - b[0];
			}
			return temp;
		});

		let x = this.squares[0][0];
		let y = this.squares[0][1];
		if (this.type === 1) {
			if (this.state === 0) {
				if (y === right - 1) {
					y--;
				}
				squares = [[x+1, y], [x+1, y+1], [x, y+2], [x+1, y+2]];
			}
			else if (this.state === 1) {
				if (x === upper + 1) {
					x++;
				}
				squares = [[x-1, y+1], [x, y+1], [x+1, y+1], [x+1, y+2]];
			}
			else if (this.state === 2) {
				if (y === left) {
					y++;
				}
				squares = [[x+1, y-1], [x+1, y], [x+2, y-1], [x+1, y+1]];
			}
			else if (this.state === 3) {
				squares = [[x-1, y], [x-1, y+1], [x, y+1], [x+1, y+1]];
			}

		}
		else if (this.type === 2) {
			if (this.state === 0) {
				if (y === left) {
					y++;
				}
				squares = [[x, y-1], [x, y], [x, y+1], [x+1, y+1]];
			}
			else if (this.state === 1) {
				if (x === down-1) {
					x--;
				}
				squares = [[x, y+1], [x+1, y+1], [x+2, y], [x+2, y+1]];
			}
			else if (this.state === 2) {
				if (y === right) {
					y++;
				}
				squares = [[x+1, y-1], [x+2, y-1], [x+2, y], [x+2, y+1]];
			}
			else if (this.state === 3) {
				squares = [[x-1, y+1], [x-1, y+2], [x, y+1], [x+1, y+1]];
			}
		}
		else if (this.type === 3) {
			if (this.state === 0) {
				if (y === right) {
					y--;
				}
				squares = [[x, y], [x+1, y-1], [x+1, y], [x+1, y+1]];
			}
			else if (this.state === 1) {
				if (x === down-1) {
					x--;
				}
				squares = [[x, y], [x+1, y], [x+1, y+1], [x+2, y]];
			}
			else if (this.state === 2) {
				if (y === left) {
					y++;
				}
				squares = [[x+1, y-1], [x+1, y], [x+1, y+1], [x+2, y]];
			}
			else if (this.state === 3) {
				squares = [[x-1, y+1], [x, y], [x, y+1], [x+1, y+1]];
			}
		}
		else if (this.type === 4) {
			if (this.state % 2 === 0) {
				if (y === right) {
					y--;
				}
				squares = [[x+1, y-1], [x+1, y], [x+2, y], [x+2, y+1]];
			}
			else {
				squares = [[x-1, y+1], [x, y], [x, y+1], [x+1, y]];
			}
		}
		else if (this.type === 5) {
			if (this.state % 2 === 0) {
				if (y === left) {
					y++;
				}
				squares = [[x+1, y], [x+1, y+1], [x+2, y-1], [x+2, y]];
			}
			else {
				squares = [[x-1, y], [x, y], [x, y+1], [x+1, y+1]];
			}
		}

		let can_transform = true;
		for (let square of squares) {
			if (valid_array[square[0]][square[1]] === 1) {
				can_transform = false;
			}
		}
		if (can_transform) {
			this.state = (this.state + 1) % this.state_num;
			this.squares = squares;
		}
	}
}

function get_type() {
	return Math.ceil(Math.random() * 4);
}

function generate_squares(i) {
	let squares = null;
	/*
	 * 0 1 1
	 * 0 1 0
	 * 0 1 0
	 */
	if (i === 1) {
		squares = [[0, 5], [0, 6], [1, 6], [2, 6]]
	}
	/*
   * 1 1 0
   * 0 1 0
   * 0 1 0
   */
	else if (i === 2) {
		squares = [[0, 5], [1, 5], [2, 5], [0, 6]]
	}
	/*
	 * 0 1 0
	 * 1 1 0
	 * 0 1 0
	 */
	else if (i === 3) {
		squares = [[0, 5], [1, 4], [1, 5], [2, 5]]
	}
	/*
	 * 0 0 1
	 * 0 1 1
	 * 0 1 0
	 */
	else if (i === 4) {
		squares = [[0, 6], [1, 5], [1, 6], [2, 5]]
	}
	/*
	 * 1 0 0
	 * 1 1 0
	 * 0 1 0
 */
	else if (i === 5) {
		squares = [[0, 4], [1, 4], [1, 5], [2, 5]]
	}
	else {
		squares = [[0, 5], [0, 6], [1, 6], [2, 6]]
	}
	return squares;
}

export default Shape;



