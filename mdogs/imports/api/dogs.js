import { Mongo } from 'meteor/mongo';

export const Dogs = new Mongo.Collection('dogs', {idGeneration: 'MONGO'});

import {Entity} from '../../lib/spaceSteroids/entity.js';

import {PersonEntity} from './people.js';

import {Auth} from '../../lib/spaceSteroids/users/auth.js';


Dogs.allow({
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

export var DogEntity = new Entity(Dogs, {}, [ ["Name", "asc"], ["dob", "desc"] ]);
DogEntity.setFields(
[
    {fname: "Name", ftype: "string"},
    //{fname: "ID", ftype: "number"},
    {fname: "ownerID", ftype: "entity", eclass: PersonEntity},
    {fname: "coOwnerID", ftype: "entity", eclass: PersonEntity},
    {fname: "sex", ftype: "string"},
    {fname: "pedigree", ftype: "string"},
    {fname: "pedigreeNo", ftype: "string"},
    {fname: "fatherID", ftype: "entity", eclass: DogEntity},
    {fname: "motherID", ftype: "entity", eclass: DogEntity},
    {fname: "link", ftype: "string"},
    {fname: "tattoo", ftype: "string"},
    {fname: "chip", ftype: "string"},

    {fname: "dob", ftype: "date"},

    {fname: "breederID", ftype: "entity", eclass: PersonEntity},
    {fname: "cobreederID", ftype: "entity", eclass: PersonEntity},
    {fname: "color", ftype: "string"},
]);

DogEntity.toShortString = function(ent) {
    return ent.Name;
}

//export DogEntity;
