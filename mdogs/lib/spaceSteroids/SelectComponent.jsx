import React, { Component, PropTypes } from 'react';

export class SelectComponent extends Component {
    /*
    props expect items, selectedValue, valueFieldName, displayFieldNames
    */
    constructor(props) {
        super(props);
        //this.state = {value: props.selectedValue};
        //console.log("value inside Select is " + this.state.value + " of " + (typeof this.state.value));
    }

    render() {
        if (this.props.items === undefined) return null;
        const vals = this.props.items.map( (item) => <option value={item[this.props.valueFieldName].toHexString()}>{item[this.props.displayFieldName]}</option>, this );
        return (

          <select value={this.props.selectedValue} className="form-control" onChange={this.props.onChange} name={this.props.name}>
            {vals}
          </select>

        );
    }
}
