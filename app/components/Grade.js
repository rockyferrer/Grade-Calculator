import React, {Component} from 'react';

import GradeForm from 'GradeForm';
import GradeMessage from 'GradeMessage';

export default class Grade extends Component {
    render() {
        return (
            <div>
                <p>Grade Component</p>
                <GradeForm />
                <GradeMessage />
            </div>
        )
    }
}
