import React, { Component, PropTypes } from 'react';
import { EJSON } from 'meteor/ejson';

import { SelectComponent } from './SelectComponent.jsx';

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
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleDoubleClick = this.handleDoubleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEsc = this.handleEsc.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleEsc(event) {
        if (this.state.isNew === true) {
            this.setState ({item: this.props.entity.createEmptyItem()});
        }
        else {
        // restoring to the original
            this.setState ({isEdited: false, item: this.originalItem});
        }
    }

    handleSave(event) {
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

    handleDelete(event) {
        console.log("deleting");
        this.props.entity.remove(this.state.item);
    }

    handleDoubleClick(event) {
        //console.log("double click");
        // setting row to editable and saving current state of the item to be able to handle rollback
        this.originalItem = {};
        Object.assign(this.originalItem, this.state.item);
        this.setState ({isEdited: true});

    }

    // in reality, this is onKeyUp !!! - otherwise Esc won't work
    handleKeyPress(event) {
        //event.preventDefault();
        const kc = event.keyCode;
        //console.log(kc);
        if (kc === 13) {
            this.handleSave();
        }
        if (kc === 27) {
            this.handleEsc();
        }

    }

    handleSelectChange(event) {
        //this.setState({value: event.target.value});
        console.log(event.target);
        const target = event.target;
        const value = target.value;
        const name = target.name;

        console.log(name + " = " + value + " is " + (typeof value));
        id = new Mongo.ObjectID(value);
        console.log(id);

        // not sure if this copying doesnot trigger update of all item fields???
        let upd = {item: this.state.item};
        upd.item[name] = id;
        this.setState( upd );

        console.log(this.state);
    }

    handleChange(event) {
        //this.setState({value: event.target.value});
        //console.log(event.target);
        const target = event.target;
        const value = target.value;
        const name = target.name;

        //console.log(name + " = " + value + " is " + (typeof value));

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

        if (isEdited === false) cells.push(<td key="buttons"><button type="button" className="btn btn-danger btn-xs" onClick={this.handleDelete}>del</button></td>);
        else cells.push(
            <td key="buttons">
                <button type="button" className="btn btn-warning btn-xs" onClick={this.handleEsc}>esc</button>
                <button type="button" className="btn btn-success btn-xs" onClick={this.handleSave}>save</button>
            </td>);

        this.props.entity.fields.forEach( function (k, index) {
            const value = item[k.fname];
            if (isEdited === false) {
                if (k.ftype === 'entity') {
                    //console.log(k);
                    let ent = k.eclass.findOne({_id: item[k.fname]});
                    //console.log(ent);
                    if (ent) cells.push ( <td key={index}>{k.eclass.toShortString(ent)}</td>);
                    else cells.push ( <td key={index}></td>);
                } else {
                    cells.push ( <td key={index}>{value}</td>);
                }
            }
            else { // item being edited
                switch (k.ftype) {
                    case 'entity':
                        depItems = k.eclass.find({}, {sort: k.eclass.defaultSort}).fetch();
                        //console.log ("Processing display update! value is " + value);
                        //debugger
                        //if (value) value = value.toHexString();
                        cells.push (
                            <td key={index}>
                                <SelectComponent items={depItems} name={k.fname} selectedValue={value} entity={k.eclass}
                                    valueFieldName='_id' displayFieldName='Name' onChange={this.handleSelectChange} />
                            </td>

                        );
                        break;
                    case 'list':
                        let sel = k.list.map( (it) => <option value={it}>{it}</option> );
                        cells.push (
                            <td key={index}>
                                 <select value={value} className="form-control" onChange={this.handleChange} name={k.fname}>
                                     {sel}
                                 </select>
                            </td>
                        );
                        break;
                    default:
                        cells.push ( <td key={index}><input name={k.fname} type="text" value={value} onChange={this.handleChange} className="form-control" /></td>);
                        break;
                }

            }
        },
        this);

        return (
            <tr className="showLine" onDoubleClick={this.handleDoubleClick} onKeyUp={this.handleKeyPress}>
                {cells}
            </tr>
        );
}
}
