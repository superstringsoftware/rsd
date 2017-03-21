import { Mongo } from 'meteor/mongo';

import {Entity} from '../../lib/spaceSteroids/entity.js';
import {PersonEntity} from './people.js';
import {Auth} from '../../lib/spaceSteroids/users/auth.js';

export const Dogs = new Mongo.Collection('dogs', {idGeneration: 'MONGO'});

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

const DogColsOrder = [
    "Name",
    "sex",
    "color",
    "dob",
    "fatherID",
    "motherID",
    "pedigree",
    "pedigreeNo",
    "breederID",
    "cobreederID",
    "ownerID",
    "coOwnerID",
    "tattoo",
    "chip",
    "link"
];

export var DogEntity = new Entity("Dogs", Dogs, {}, [ ["Name", "asc"], ["dob", "desc"] ]);
DogEntity.setFields(
[
    {fname: "Name", ftype: "string"},
    {fname: "sex", ftype: "list", list: ["male", "female"]},
    {fname: "color", ftype: "list", list: ["black", "liver", "yellow"]},
    {fname: "dob", ftype: "date"},
    {fname: "fatherID", ftype: "entity", eclass: DogEntity, search: {sex: 'male'}},
    {fname: "motherID", ftype: "entity", eclass: DogEntity, search: {sex: 'female'}},
    {fname: "pedigree", ftype: "string"},
    {fname: "pedigreeNo", ftype: "string"},
    {fname: "breederID", ftype: "entity", eclass: PersonEntity},
    {fname: "cobreederID", ftype: "entity", eclass: PersonEntity},
    //{fname: "ID", ftype: "number"},
    {fname: "ownerID", ftype: "entity", eclass: PersonEntity},
    {fname: "coOwnerID", ftype: "entity", eclass: PersonEntity},
    {fname: "tattoo", ftype: "string"},
    {fname: "chip", ftype: "string"},
    {fname: "link", ftype: "string"},





]);

//DogEntity.setFieldsOrder(DogColsOrder);

DogEntity.toShortString = function(ent) {
    return (ent.Name ? ent.Name : "[none]") ;
}

//export DogEntity;
