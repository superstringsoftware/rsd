import { Mongo } from 'meteor/mongo';

export var Auth = {};

Auth.checkAdmin = function(uid) {
    user = Meteor.users.findOne(uid);
    //console.log(user);
    let ret = false;
    if (user && user.securityProfile) ret = (user.securityProfile.primaryRole === 'administrator');
    return ret;
}
