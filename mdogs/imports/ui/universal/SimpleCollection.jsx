import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { EntityComponent } from '../../../lib/spaceSteroids/EntityComponent.jsx';

class LineHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let cells = [];
        this.props.entity.fieldNames.forEach( function (k, index) {
            cells.push (<th key={index}>{k}</th>);
        });

        /*
        if (this.props.item !== undefined) {
            Object.getOwnPropertyNames(this.props.item).forEach( function(k, index) {
                if (k !== '_id') {
                    cells.push (<th key={index}>{k}</th>);
                }
            }
        );
        }*/

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

    // expects entity in props
    constructor(props) {
        super(props);
        this.state = {tableClass: "table table-striped table-hover"};
    }

    renderItems() {
        //console.log(this.props);
        const ent = this.props.entity;
        const depItems = this.props.depItems;
        return this.props.items.map((item) => (
            <EntityComponent key={item._id} item={item} entity={ent} depItems={depItems} />
        ));
    }

    render() {
        const hitem = this.props.items[0];
        if (hitem === undefined) return null;
        const ent = this.props.entity;
        return (
            <div className="container">
                <header>
                    <h1>Todo List</h1>
                </header>

                <table className={this.state.tableClass}>
                    <thead>
                        <LineHeader item={hitem} entity={ent} />
                    </thead>
                    <tbody>
                        <EntityComponent key="newItem" entity={ent} isEdited={true} isNew={true} />
                        {this.renderItems()}
                    </tbody>
                </table>

            </div>
        );
    }
}
