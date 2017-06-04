import React, {Component} from 'react';

export default class GradeMessage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var {gradeString, gradeNumber, showGrade} = this.props;
        var renderMessage = () => {
            if (showGrade) {
                return (
                    <p>You currently have a {gradeString} = {gradeNumber}%</p>
                );
            } else {
                return null;
            }
        };
        return (
            <div>
                {renderMessage()}
            </div>
        );
    }

}
