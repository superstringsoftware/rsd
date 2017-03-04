import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class LineItem extends Component {
    render() {
        let cells = [];
        let item = this.props.item;
        let isEditable = this.props.isEditable;

        Object.getOwnPropertyNames(item).forEach( function(k, index) {
            if (k !== '_id') {
                cells.push ( <td key={index}>{item[k].toString()}</td>);
            }
        });

        /*
        const cells = Object.getOwnPropertyNames(this.props.item).map((k, index) =>
        // Only do this if items have no stable IDs

        <td key={index}>
        {this.props.item[k].toString()}
    </td>

); */


return (
    <tr className="showLine" data-showID={this.props.item.ID}>
        {cells}
    </tr>
);
}
}

class EditableLineItem extends Component {

    constructor(props) {
        super(props);
        this.state = { item: props.item, isEdited: false};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleDoubleClick = this.handleDoubleClick.bind(this);
    }

    handleDoubleClick(event) {
        console.log("double click");
        this.setState ({isEdited: true});
    }

    // in reality, this is onKeyUp !!! - otherwise Esc won't work
    handleKeyPress(event) {
        //event.preventDefault();
        const kc = event.keyCode;
        console.log(kc);
        if (kc === 13) {
            // saving item
            this.props.collection.update({_id: this.state.item._id}, this.state.item);
            this.setState ({isEdited: false});
        }
        if (kc === 27) {
            // need logic to get back to the state that was there before editing
            this.setState ({isEdited: false});
        }

    }

    handleChange(event) {
        //this.setState({value: event.target.value});
        console.log(event.target);
        const target = event.target;
        const value = target.value;
        const name = target.name;

        // not sure if this copying doesnot trigger update of all item fields???
        let upd = {item: this.state.item};
        upd.item[name] = value;
        this.setState( upd );

        //console.log(this.state);
    }

    handleSubmit(event) {
        //event.preventDefault();
        console.log('Submit clicked');
        //console.log(event.target);
        console.log(this.state);

        this.props.collection.update({_id: this.state.item._id}, this.state.item);

    }

    render() {
        let cells = [];
        let item = this.state.item;
        let isEdited = this.state.isEdited;

        if (isEdited === false) {

            Object.getOwnPropertyNames(item).forEach( function(k, index) {
                if (k !== '_id') {
                    cells.push ( <td key={index}>{item[k].toString()}</td>);
                }
            });
        }
        else {
            Object.getOwnPropertyNames(item).forEach( function(k, index) {
                if (k !== '_id') {
                    cells.push ( <td key={index}>
                        <input name={k} type="text" value={item[k].toString()} onChange={this.handleChange} onKeyUp={this.handleKeyPress} />
                    </td>);
                }
            }, this);
        }



    return (
        <tr className="showLine" onDoubleClick={this.handleDoubleClick}>
            {cells}
        </tr>
    );
}
}

class LineHeader extends Component {
    render() {
        let cells = [];
        if (this.props.item !== undefined) {
            cells = Object.getOwnPropertyNames(this.props.item).map((k, index) =>
            // Only do this if items have no stable IDs
            <th key={index}>
                {k}
            </th>
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
            <EditableLineItem key={item._id} item={item} collection={this.props.collection} />
        ));
    }

    render() {
        const hitem = this.props.items[0];
        //console.log (this.props.items);
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
                        {this.renderItems()}
                    </tbody>
                </table>

            </div>
        );
    }
}
