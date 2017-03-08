import { Mongo } from 'meteor/mongo';

import {Entity} from '../../lib/spaceSteroids/entity.js';
import {Auth} from '../../lib/spaceSteroids/users/auth.js';

export const People = new Mongo.Collection('people', {idGeneration: 'MONGO'});

export var PersonEntity = new Entity("People", People, [
    {fname: "name", ftype: "string"},
    {fname: "city", ftype: "string"},
    {fname: "country", ftype: "string"},
    {fname: "contact", ftype: "string"},
    {fname: "link", ftype: "string"},
],
[ ["name", "asc"]]);

PersonEntity.toShortString = function(ent) {
    return ent.name;
}

People.allow({
  insert: function (userId, doc) {
    // the user must be logged in, and the document must be owned by the user
    return Auth.checkAdmin(userId);
  },
  update: function (userId, doc, fields, modifier) {
    // can only change your own documents
    return Auth.checkAdmin(userId);
  },
  remove: function (userId, doc) {
    // can only remove your own documents
    return Auth.checkAdmin(userId);
  },
});
