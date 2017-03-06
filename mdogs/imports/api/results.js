import { Mongo } from 'meteor/mongo';

export const Results = new Mongo.Collection('results', {idGeneration: 'MONGO'});

import {Entity} from '../../lib/spaceSteroids/entity.js';
import {ShowEntity} from './shows.js';
import {DogEntity} from './dogs.js';
import {Auth} from '../../lib/spaceSteroids/users/auth.js';


Results.allow({
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

export var ResultEntity = new Entity(Results,
    [
        {fname: "dogID", ftype: "entity", eclass: DogEntity},
        {fname: "showID", ftype: "entity", eclass: ShowEntity},
        {fname: "class", ftype: "string"},
        {fname: "mark", ftype: "string"},
        {fname: "place", ftype: "number"},
        {fname: "certificate", ftype: "string"},
        {fname: "critique", ftype: "string"},
        {fname: "ageResult", ftype: "string"},
        {fname: "breedResult", ftype: "string"},
        {fname: "groupResult", ftype: "string"},
        {fname: "bisResult", ftype: "string"},


    ],
    [ ["name", "asc"], ["date", "desc"] ]);

ShowEntity.toShortString = function(ent) {
    return ent.name;
};


