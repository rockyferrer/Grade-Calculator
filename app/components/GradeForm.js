import React, {Component} from 'react';

import AddEntry from 'AddEntry';

//TODO: error checking
// make sure entries are numbers
// make sure rows are full
export default class GradeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numRows: 0
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeRows = this.handleChangeRows.bind(this);
        this.clearEntries = this.clearEntries.bind(this);
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

    handleChangeRows(numRows) {
        this.setState({numRows});
    }

    clearEntries(e) {
        e.preventDefault();
        var descriptions = document.getElementsByClassName('description');
        var grades = document.getElementsByClassName('grade');
        var weights = document.getElementsByClassName('weight');
        for (let i = 0; i < descriptions.length; i++) {
            //clear values
            descriptions[i].value = '';
            grades[i].value = '';
            weights[i].value = '';
        }
    }

    render() {
        var renderEntries = () => {
            let allEntries = [];
            for (let i = 0; i < this.state.numRows; i++) {
                allEntries.push(
                    <tr key={i}>
                        <td><input type="text" className="description" placeholder="Enter description..."/></td>
                        <td><input type="number" className="grade" placeholder="Enter grade..."/></td>
                        <td><input type="number" className="weight" placeholder="Enter weight..."/></td>
                    </tr>
                );
            }
            return allEntries;
        }
        return (
            <div className="row">
                <AddEntry onSetRows={this.handleChangeRows}/>
                <form onSubmit={this.handleSubmit}>
                    <table>
                        <thead>
                            <tr>
                                <th width="900" className="table-header">Description</th>
                                <th width="600" className="table-header">Grades</th>
                                <th width="600" className="table-header">Weights</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderEntries()}
                        </tbody>
                    </table>

                    <div className="column small-centered small-7 medium-7 large-7">
                        <button className="button hollow expanded">Submit</button>
                    </div>
                    <div className="column"></div>
                </form>
                <div className="column small-centered small-7 medium-7 large-7">
                    <button className="button hollow expanded" onClick={this.clearEntries}>Clear</button>
                </div>
                <div className="column"></div>
            </div>
        );
    }
}
