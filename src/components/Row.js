import React, {Component} from 'react'
import Square from './Square'
import '../index.css'

class Row extends Component {

    renderRow() {
        let items = [];
        for (let i=0; i<this.props.length; i++) {
            items.push(<Square key={i}/>)
        }
        return items;
    };

    render() {
        let items = this.renderRow();
        return (
            <div className="tetris-row">
                 {items}
            </div>
        )
    }
}



export default Row;
