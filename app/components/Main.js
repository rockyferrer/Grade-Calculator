import React, {Component} from 'react';

import Grade from 'Grade';

export default class Main extends Component {
    render() {
        return (
            <div>
                <h1 className="title">Course Grade Calculator</h1>
                <div className="row">
                    <div className="column small-centered small-11 medium-6 large-6">
                        <div className="container">
                            <Grade />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
