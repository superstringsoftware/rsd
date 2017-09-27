import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { ResultsAdminTable } from './AppOLD.jsx';
import {Results, ResultEntity} from '../api/results';

import SimpleCollection from './SimpleCollection';

//import { EntityComponent } from '../../lib/spaceSteroids/EntityComponent.jsx';

// App component - represents the whole app
export class ResultsShows extends Component {

    // expects entity in props
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {};
    }

    handleChange(event) {
        //this.setState({value: event.target.value});
        //console.log(event.target);

        const target = event.target;
        const value = target.value;
        //const name = target.name;

        let id = "null";
        if (value !== "null") id = new Mongo.ObjectID(value);

        ResultEntity.currentShowID = id;
        let emptyItem = ResultEntity.createEmptyItem();

        //console.log(name + " = " + value + " is " + (typeof value));
        //console.log(this.state);

        this.setState( {showId: id, emptyItem: emptyItem} );

    }

    render() {
        //console.log(this.props);
        //console.log(ResultEntity);

        //console.log(ResultEntity);

        // ugly hacks below
        if (this.props.items === undefined) return null;
        //let val = item[this.props.valueFieldName];
        //if (val && val.toHexString) id=val.toHexString(); else id = val;
        const vals = this.props.items.map( (item) => {
            let id = undefined;
            let val = item["_id"];
            if (val && val.toHexString) id=val.toHexString(); else id = val;
            return <option value={id}>{this.props.entity.toShortString(item)}</option>;
        },
        this );

        return (
            <div className="container">
              <h2>Pick a show:</h2>
              <select value={this.props.selectedValue} className="form-control" onChange={this.handleChange} name="showsSelect">
                {vals}
              </select>
              <ResultsTable entity={ResultEntity} showId={this.state.showId} emptyItem={this.state.emptyItem} />
            </div>

        );
    }
}

const ResultsTable = createContainer(({entity, showId, emptyItem}) => {
    return {
        entity: entity,
        items: Results.find({showID: showId}, {sort: [ ["place", "asc"] ] }).fetch(),
        emptyItem: emptyItem,
        depItems: {
        },
    };
}, SimpleCollection);
