import { Mongo } from 'meteor/mongo';

export const Dogs = new Mongo.Collection('dogs');

import {Entity} from '../../lib/spaceSteroids/entity.js';

import {PersonEntity} from './people.js';

export var DogEntity = new Entity(Dogs);
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
