import React, {Component} from 'react';

import Header from 'Header';
import Grade from 'Grade';

export default class Main extends Component {
    render() {
        return (
            <div>
                <p>Main Component</p>
                <Header />
                <Grade />
            </div>
        )
    }
}
