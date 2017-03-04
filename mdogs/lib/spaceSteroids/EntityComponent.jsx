import React, { Component, PropTypes } from 'react';

export class EntityComponent extends Component {

    /*
    props expects:
    item: object to display
    isEdited: should the UI be in the editable form now
    isNew: are we creating the new one
    entity: Entity object that we will use for the field names and collection updating etc
    displayType: how to display - table, list, ...
    */
    constructor(props) {
        super(props);
        let isEdited = false;
        let isNew = false;
        let item = props.entity.createEmptyItem();
        if (props.isEdited !== undefined) isEdited = props.isEdited;
        if (props.isNew !== undefined) isNew = props.isNew;
        if (isNew === false) item = props.item;
        this.state = { item: item, isEdited: isEdited, isNew: isNew};

        //console.log (item);

        this.originalItem = {};

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleDoubleClick = this.handleDoubleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(event) {
        console.log("deleting");
        this.props.entity.remove(this.state.item);
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
        //console.log(kc);
        if (kc === 13) {
            // saving item
            //this.props.collection.update({_id: this.state.item._id}, this.state.item);
            //this.props.collection.upsert({_id: this.state.item._id}, this.state.item);
            if (this.state.isNew === true) {
                console.log("Saving new item");
                console.log(this.state.item);
                // entity should handle validation etc
                this.props.entity.create(this.state.item);
                this.setState ({item: this.props.entity.createEmptyItem()});
            }
            else {
                this.props.entity.update(this.state.item);
                this.setState ({isEdited: false});
            }
        }
        if (kc === 27) {
            if (this.state.isNew === true) {
                this.setState ({item: this.props.entity.createEmptyItem()});
            }
            else {
            // restoring to the original
                this.setState ({isEdited: false, item: this.originalItem});
            }
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
        let isNew = this.state.isNew;

        this.props.entity.fieldNames.forEach( function (k, index) {
            let value = item[k].toString();
            if (isEdited === false) cells.push ( <td key={index}>{value}</td>);
            else cells.push ( <td key={index}><input name={k} type="text" value={value} onChange={this.handleChange} /></td>);

        },
        this);

        if (isEdited === false) cells.push(<td><button type="button" className="btn btn-danger btn-xs" onClick={this.handleDelete}>del</button></td>);
        else cells.push(<td></td>);

        return (
            <tr className="showLine" onDoubleClick={this.handleDoubleClick} onKeyUp={this.handleKeyPress}>
                {cells}
            </tr>
        );
}
}
