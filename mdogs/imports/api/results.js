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

export var ResultEntity = new Entity("Results", Results,
    [
        {fname: "dogID", ftype: "entity", eclass: DogEntity},
        {fname: "showID", ftype: "entity", eclass: ShowEntity},
        {fname: "class", ftype: "list", list: ["baby", "puppy", "junior", "intermediate",
          "open", "winners", "working", "champion", "club champion", "veteran"]},
        {fname: "mark", ftype: "list", list: ["--?--","exc", "vg", "good", "sat", "disq", "cannot be judged", "absent", "vp", "p"]},
        {fname: "place", ftype: "list", list: ["--?--","1", "2", "3", "4"]},
        {fname: "certificate", ftype: "list", list: ["--?--","ЮСС", "ЮКЧК/Candidate to Jun Club CH",
          "ЮПК/Jun Club Winner", "ЮЧК/Jun Club CH", "СС", "КЧК/Candidate to Club CH", "ПК/Club Winner",
          "ЧК/Club CH", "JCAC", "ResJCAC", "CAC", "ResCAC", "CACIB", "ResCACIB", "VCAC", "ResVCAC"]},
        {fname: "critique", ftype: "string"},
        {fname: "ageResult", ftype: "list", list: ["--?--",
          "ЛБК/Best male baby", "ЛБС/Best female baby", "ЛБП/BOB Baby", "ЛЩК/Best male puppy", "ЛЩС/Best female puppy", "ЛЩП/BOB Puppy", "ЛКЮ/Best male junior",
          "ЛСЮ/Best female junior", "ЛЮП/JunBOB", "ЛКВ/Best male veteran", "ЛСВ/Best female veteran", "ЛВП/VetBOB"
        ]},
        {fname: "breedResult", ftype: "list", list: ["--?--",
          "ЛК/Best male", "ЛК-2/BM-2", "ЛК-3/BM-3", "ЛК-4/BM-4", "ЛС/Best bitch", "ЛС-2/BB-2",
           "ЛС-3/BB-3", "ЛС-4/BB-4", "ЛПпп/BOS", "ЛПП/BOB", "ЛПП/BOB(BISS)"
        ]},
        {fname: "groupResult", ftype: "list", list: ["--?--",
          "BIG", "ResBIG", "BIG-3", "BIG-4"
        ]},
        {fname: "bisResult", ftype: "list", list: ["--?--",
          "BIS", "ResBIS", "BIS-3", "BIS-4", "BISS", "ResBISS", "BISS-3", "BISS-4"
        ]},


    ],
    [ ["name", "asc"], ["date", "desc"] ]);

ResultEntity.toShortString = function(ent) {
    return (ent.name ? ent.name : "[none]") ;
};

// using this to pre-select show which we are editing (UGLY)
ResultEntity.currentShowID = null;

ResultEntity.createEmptyItem = function() {
    let item = {};
    this.fieldNames.forEach( (k)=>item[k]='' );
    item["showID"] = this.currentShowID;
    item["class"] = "baby";
    item["mark"] = "--?--";
    item["place"] = "--?--";
    item["certificate"] = "--?--";
    item["ageResult"] = "--?--";
    item["breedResult"] = "--?--";
    item["groupResult"] = "--?--";
    item["bisResult"] = "--?--";
    //console.log("New Item created:");
    //console.log(item);
    return item;
}


//export var ResultWithShowEntity = new ResultEntity();
//export ResultWithShowEntity;
