import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { EntityComponent } from '../../../lib/spaceSteroids/EntityComponent.jsx';

import { PersonEntity } from '../../api/people.js';


class LineHeader extends Component {
    render() {
        let cells = [];
        if (this.props.item !== undefined) {
            Object.getOwnPropertyNames(this.props.item).forEach( function(k, index) {
                if (k !== '_id') {
                    cells.push (<th key={index}>{k}</th>);
                }
            }
        );
        }

    return (
        <tr className="showLine">
            {cells}
        </tr>
    );
}
}

/*LineItem.propTypes = {
// This component gets the task to display through a React prop.
// We can use propTypes to indicate it is required
item: PropTypes.object.isRequired,
};*/


// App component - represents the whole app
export default class SimpleCollection extends Component {

    constructor(props) {
        super(props);
        this.state = {tableClass: "table table-striped table-hover"};
    }

    renderItems() {
        console.log(this.props);
        return this.props.items.map((item) => (
            <EntityComponent key={item._id} item={item} entity={PersonEntity} />
        ));
    }

    render() {
        const hitem = this.props.items[0];
        if (hitem === undefined) return null;
        let nullItem = {};
        Object.getOwnPropertyNames(hitem).forEach( function(k) {
            // if (k !== '_id') nullItem[k] = '';
        });
        //console.log (nullItem);
        return (
            <div className="container">
                <header>
                    <h1>Todo List</h1>
                </header>

                <table className={this.state.tableClass}>
                    <thead>
                        <LineHeader item={hitem} />
                    </thead>
                    <tbody>
                        <EntityComponent key="newItem" entity={PersonEntity} isEdited={true} isNew={true} />
                        {this.renderItems()}
                    </tbody>
                </table>

            </div>
        );
    }
}
