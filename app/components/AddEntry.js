import React, {Component} from 'react';

export default class AddEntry extends Component {
    constructor(props) {
        super(props);
        this.changeNumRows = this.changeNumRows.bind(this);
    }

    changeNumRows(e) {
        var numRows = e.target.value;
        this.props.onRowsChange(numRows);
    }

    render() {
        return (
            <form onChange={this.changeNumRows}>
                <label>Number of Rows:
                    <select defaultValue={4}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                    </select>
                </label>
            </form>
        );
    }
}
