import { Mongo } from 'meteor/mongo';

import {Entity} from '../../lib/spaceSteroids/entity.js';

export const People = new Mongo.Collection('people');

export var PersonEntity = new Entity(People, [
    {fname: "name", ftype: "string"},
    {fname: "ID", ftype: "number"},
    {fname: "city", ftype: "string"},
    {fname: "country", ftype: "string"},
    {fname: "contact", ftype: "string"},
    {fname: "link", ftype: "string"},
],
[ ["name", "asc"]]);

PersonEntity.toShortString = function(ent) {
    return ent.name;
}
