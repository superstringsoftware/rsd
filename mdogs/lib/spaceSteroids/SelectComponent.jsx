import React, { Component, PropTypes } from 'react';

export class SelectComponent extends Component {
    /*
    props expect items, selectedValue, valueFieldName, displayFieldNames
    */
    constructor(props) {
        super(props);
        this.state = {value: props.selectedValue};
    }

    render() {
        if (this.props.items === undefined) return null;
        const vals = this.props.items.map( (item) => <option value={item[this.props.valueFieldName]}>{item[this.props.displayFieldName]}</option>, this );
        return (

          <select value={this.state.value} /*onChange={this.handleChange}*/>
            {vals}
          </select>

        );
    }
}
