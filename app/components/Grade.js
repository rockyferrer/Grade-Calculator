import React, {Component} from 'react';

import GradeForm from 'GradeForm';
import GradeMessage from 'GradeMessage';

export default class Grade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formSubmitted: false,
            gradeNumber: 0.0,
            gradeString: ''

        };
        this.handleGradeCalculation = this.handleGradeCalculation.bind(this);
    }

    handleGradeCalculation(grades, weights) {
        //running totals of the grades and weights
        var curTotalGrade = 0;
        var curTotalWeight = 0;
        for (var i = 0; i < grades.length; i++) {
            curTotalGrade += grades[i] * (weights[i] * 0.01);
                if (curTotalWeight < 100) {
                    //keep adding to curTotalWeight as long as it is not over 100
                    curTotalWeight += weights[i];
                } else {
                    //Send message to GradeMessage
                }
        }

        //the loop has completed, so we have valid totals for grade and weight
        //calculate
        var finalGradeString = curTotalGrade.toFixed(2) + '/' + curTotalWeight.toFixed(2);
        var finalGrade = ((curTotalGrade / curTotalWeight) * 100).toFixed(2);
        this.setState({
            formSubmitted: true,
            gradeNumber: finalGrade,
            gradeString: finalGradeString
        });
        // return finalGrade;
    }

    render() {
        var {gradeString, gradeNumber, formSubmitted} = this.state;
        return (
            <div>
                <p>Grade Component</p>
                <GradeForm onGradeSubmit={this.handleGradeCalculation} />
                <GradeMessage showGrade={formSubmitted} gradeString={gradeString} gradeNumber={gradeNumber} />
            </div>
        )
    }
}
