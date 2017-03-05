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
        // ugly hacks below
        if (this.props.items === undefined) return null;
        //let val = item[this.props.valueFieldName];
        //if (val && val.toHexString) id=val.toHexString(); else id = val;
        const vals = this.props.items.map( (item) => {
            let val = item[this.props.valueFieldName];
            if (val && val.toHexString) id=val.toHexString(); else id = val;
            return <option value={id}>{this.props.entity.toShortString(item)}</option>;
        },
        this );
        return (

          <select value={this.props.selectedValue} className="form-control" onChange={this.props.onChange} name={this.props.name}>
            {vals}
          </select>

        );
    }
}
