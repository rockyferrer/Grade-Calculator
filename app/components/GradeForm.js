import React, {Component} from 'react';

//TODO: error checking
// make sure entries are numbers
// make sure rows are full
export default class GradeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numEntries: 3
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    parseGrade(grade) {
        var divideIndex = grade.indexOf('/');
        if (divideIndex > -1) {
            var numerator = parseFloat(grade.substring(0, divideIndex));
            var denominator = parseFloat(grade.substring(divideIndex + 1, grade.length));
            return ((numerator / denominator) * 100).toFixed(2);
        } else {
            return parseFloat(grade);
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        let gradeElements = [].slice.call(document.getElementsByClassName('grade'));
        let weightElements = [].slice.call(document.getElementsByClassName('weight'));
        var grades = gradeElements.map((grade) => this.parseGrade(grade.value));
        var weights = weightElements.map((weight) => parseFloat(weight.value));

        this.props.onGradeSubmit(grades, weights);
    }

    render() {
        var renderEntries = () => {
            let allEntries = [];
            for (let i = 0; i < this.state.numEntries; i++) {
                allEntries.push(
                    <tr>
                        <td><input type="text" placeholder="Enter description..."/></td>
                        <td><input type="text" className="grade" placeholder="Enter grade..."/></td>
                        <td><input type="text" className="weight" placeholder="Enter weight..."/></td>
                    </tr>
                );
            }
            return allEntries;
        }
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <table>
                        <thead>
                            <tr>
                                <th width="900">Description</th>
                                <th width="600">Grades</th>
                                <th width="600">Weights</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderEntries()}
                        </tbody>
                    </table>
                    <button className="button">Submit</button>
                </form>
                <button className="button">Clear</button>
            </div>
        );
    }
}
