import React, {Component} from 'react';

import Header from 'Header';
import Grade from 'Grade';

export default class Main extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="row">
                    <div className="column small-centered small-11 medium-6 large-5">
                        <div className="container">
                            <Grade />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
