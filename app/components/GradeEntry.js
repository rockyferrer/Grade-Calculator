import React, {Component} from 'react';

export default class GradeEntry extends Component {
    render() {
        return (
            <div>
                <input type="text" ref="grade" placeholder="Enter grade..." onChange={() => {this.props.}}/>
                <input type="text" ref="weight" placeholder="Enter weight..." />
            </div>
        );
    }
}
