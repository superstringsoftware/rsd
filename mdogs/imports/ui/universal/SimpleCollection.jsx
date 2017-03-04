import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class LineItem extends Component {

    constructor(props) {
        super(props);
        this.state = { item: props.item, isEdited: false};

        this.originalItem = {};

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleDoubleClick = this.handleDoubleClick.bind(this);
    }

    handleDoubleClick(event) {
        console.log("double click");
        // setting row to editable and saving current state of the item to be able to handle rollback
        Object.assign(this.originalItem, this.state.item);
        this.setState ({isEdited: true});

    }

    // in reality, this is onKeyUp !!! - otherwise Esc won't work
    handleKeyPress(event) {
        //event.preventDefault();
        const kc = event.keyCode;
        console.log(kc);
        if (kc === 13) {
            // saving item
            //this.props.collection.update({_id: this.state.item._id}, this.state.item);
            this.props.collection.upsert({_id: this.state.item._id}, this.state.item);
            this.setState ({isEdited: false});
        }
        if (kc === 27) {
            // restoring to the original
            this.setState ({isEdited: false, item: this.originalItem});
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

    render() {
        let cells = [];
        let item = this.state.item;
        let isEdited = this.state.isEdited;

        Object.getOwnPropertyNames(item).forEach( function(k, index) {
            if (k !== '_id') {
                if (isEdited === false) {
                    cells.push ( <td key={index}>{item[k].toString()}</td>);
                } else {
                    cells.push ( <td key={index}>
                        <input name={k} type="text" value={item[k].toString()} onChange={this.handleChange} />
                    </td>);
                }
            }
        }, this);

        return (
            <tr className="showLine" onDoubleClick={this.handleDoubleClick} onKeyUp={this.handleKeyPress}>
                {cells}
            </tr>
        );
}
}

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
            <LineItem key={item._id} item={item} collection={this.props.collection} />
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
