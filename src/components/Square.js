import React, {Component} from 'react'


export default class Square extends Component {
    constructor() {
        super();
        this.state = {
            color: 0,
        }
    }
    render() {
        if(this.props.valid === 0) {
            return <div className="tetris-square" >

            </div>
        }
        else {
            return <div className="tetris-square-red"></div>
        }
    }
}