import { Mongo } from 'meteor/mongo';

export const Shows = new Mongo.Collection('shows', {idGeneration: 'MONGO'});

import {Entity} from '../../lib/spaceSteroids/entity.js';
import {PersonEntity} from './people.js';
import {Auth} from '../../lib/spaceSteroids/users/auth.js';

Shows.allow({
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

export var ShowEntity = new Entity("Shows", Shows,
    [
        {fname: "name", ftype: "string"},
        {fname: "organizer", ftype: "string"},
        {fname: "date", ftype: "date"},
        {fname: "place", ftype: "string"},
        {fname: "contact", ftype: "string"},
        {fname: "link", ftype: "string"},
        {fname: "rank", ftype: "string"},
        {fname: "city", ftype: "string"},
        {fname: "country", ftype: "string"},
        {fname: "judgeID", ftype: "entity", eclass: PersonEntity},
        {fname: "entry", ftype: "string"},

    ],
    [ ["name", "asc"], ["date", "desc"] ]);

ShowEntity.toShortString = function(ent) {
    return (ent.name ? ent.name : "[none]") ;
}
