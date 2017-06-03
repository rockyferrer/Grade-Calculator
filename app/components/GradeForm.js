import React, {Component} from 'react';

import GradeEntry from 'GradeEntry';

export default class GradeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numEntries: 2
        };
    }

    handleSubmit(e) {
        e.preventDefault();

        var grade = parseInt(this.refs.grade.value);
        var weight = parseInt(this.refs.weight.value);
        if (!isNaN(grade) && !isNaN(weight)) {
            console.log('Grade: ' + grade + ' Weight: ' + weight);
        } else {
            console.log('Invalid inputs')
        }
    }

    render() {
        var renderEntries = () => {
            let allEntries = [];
            for (let i = 0; i < this.state.numEntries; i++) {
                allEntries.push(
                    <div key={i}>
                        <input type="text" ref="grade" placeholder="Enter grade..."/>
                        <input type="text" ref="weight" placeholder="Enter weight..."/>
                    </div>
                );
            }
            return allEntries;
        }
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <p>GradeForm Component</p>
                {renderEntries()}
                <button className="button">Submit</button>
            </form>
        )
    }
}
