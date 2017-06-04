import React, {Component} from 'react';

import GradeForm from 'GradeForm';
import GradeMessage from 'GradeMessage';

export default class Grade extends Component {
    constructor(props) {
        super(props);
        this.handleGradeCalculation.bind(this);
    }

    handleGradeCalculation(grades, weights) {
        console.log('handleGradeCalculation was reached');
    }

    render() {
        return (
            <div>
                <p>Grade Component</p>
                <GradeForm onGradeSubmit={this.handleGradeCalculation}/>
                <GradeMessage />
            </div>
        )
    }
}
