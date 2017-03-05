export class Entity {

    constructor(collection, fields) {
        this._fields = fields;
        this._collection = collection;
        /*
        fields should be an array of field names and field types - for type checking etc
        [{fname: '...', ftype: '...'}, ...] -- e.g.
        {fname: "ownerID", ftype: "entity", eclass: "Person"},
        */
    }

    toShortString(ent) {
        return ent.toString();
    }

    setFields(fields) {
        this._fields = fields;
    }

    get fields() {
        return this._fields;
    }

    get fieldNames() {
        return this.fields.map( (el) => el.fname );
    }

    get collection() {
        return this._collection;
    }

    createEmptyItem() {
        item = {};
        this.fieldNames.forEach( (k)=>item[k]='' );
        return item;
    }

    update(item) {
        upd = {};
        Object.assign(upd, item);
        delete upd._id;
        //console.log(upd);
        this.collection.update({_id: item._id}, {$set: upd});
    }

    create(item) {
        return this.collection.insert(item);
    }

    remove(item) {
        this.collection.remove({_id: item._id});
    }

    findOne(sel) {
        return this.collection.findOne(sel);
    }

    find(sel) {
        return this.collection.find(sel);
    }
}
